import axios from 'axios';
// backend api server address
const server_post_address = process.env.REACT_APP_SERVER_DOMAIN + process.env.REACT_APP_SERVER_PORT;


export const get_user_from_DB_async = async (body) => {
    try {
        const response = await axios.post(server_post_address + '/signin', body);
        return response;
    }
    catch (err) {
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
        return err;
    }

}