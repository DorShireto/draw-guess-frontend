import axios from 'axios';
// backend api server address
const server_post_address = process.env.REACT_APP_SERVER_DOMAIN + process.env.REACT_APP_SERVER_PORT;
const definitionAPI_ADDR = "https://api.dictionaryapi.dev/api/v2/entries/en"


export const get_user_from_DB_async = async (body) => {
    try {
        const response = await axios.post(server_post_address + '/signin', body);
        return response;
    }
    catch (err) {
        console.log("Error at get_user_from_DB_async - api", err)
        return err
        // alert(err.response.data)
        // console.log(err.response);
    }
}

export const add_user_to_DB_async = async (body) => {
    try {
        const response = await axios.post(server_post_address + '/register', body);
        return response;
    }
    catch (err) {
        console.log("Error at add_user_to_DB_async - api", err)
        return err;
    }
}

export const get_word_definition_async = async (word) => {
    try {
        console.log("inside get_word_definition_async");
        const result = await axios.get(definitionAPI_ADDR + "/" + word); // API call to dictionaryAPI
        console.log(result);
        console.log(result.data.length, result.data[0].meanings.length, result.data[0].meanings[0].definitions.length);
        if (result.data.length > 0 && result.data[0].meanings.length > 0 && result.data[0].meanings[0].definitions.length > 0) {
            return result.data[0].meanings[0].definitions[0].definition;
        }
        return '';
    }
    catch (err) {
        console.log(err);
        return err;
    }
}