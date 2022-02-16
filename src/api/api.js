import axios from 'axios';
// backend api server address
const server_post_address = process.env.REACT_APP_SERVER_DOMAIN + process.env.REACT_APP_SERVER_PORT;
// dictionary-api address
const definitionAPI_ADDR = "https://api.dictionaryapi.dev/api/v2/entries/en"


/**
 * Async calling to server to log in user
 * @param {email, password} body 
 * @returns: response/err from server -> would be checked at calling method
 */
export const get_user_from_DB_async = async (body) => {
    try {
        const response = await axios.post(server_post_address + '/signin', body);
        return response;
    }
    catch (err) {
        console.log("Error at get_user_from_DB_async - api", err)
        return err
    }
}
/**
 * Async calling to server to register a new user
 * @param {userName,password,email} body 
 * @returns response/err from server -> would be checked at calling method
 */
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

/**
 * Async call to server - check if game was created
 * @returns response/err from server -> would be checked at calling method
 */
export const game_created_question_async = async () => {
    try {
        const response = await axios.get(server_post_address + '/did-game-created');
        console.log("game_created_question_async response:\n", response)
        return response;
    }
    catch (err) {
        console.log("Error at game_created_question_async - api", err)
        return err;
    }
}

/**
 * Async post to server to create room with user as creator
 * @param {chosenWord,userName} body 
 * @returns response/err from server -> would be checked at calling method
 */
export const create_game_room_async = async (body) => {
    if (body.level === "Easy") body.level = 1;
    else if (body.level === "Medium") body.level = 2;
    else body.level = 3;
    try {
        const response = await axios.post(server_post_address + '/create-room', body);
        return response;
    }
    catch (err) {
        console.log("Error at create_game_room_async - api", err)
        return err;
    }
}


/**
 * Async call to dictionary-api
 * @param {string} word 
 * @returns the givin words definition if could find one, 
 *          if could not find one - return empty string ''
 *          err - if call to dictionary-api failed
 */
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