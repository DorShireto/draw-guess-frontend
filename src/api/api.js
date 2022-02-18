import axios from 'axios';
// backend api server address
const server_backend_address = process.env.REACT_APP_SERVER_DOMAIN + process.env.REACT_APP_SERVER_PORT;
// dictionary-api address
const definitionAPI_ADDR = "https://api.dictionaryapi.dev/api/v2/entries/en"


/**
 * Async calling to server to log in user
 * @param {email, password} body 
 * @returns: response/err from server -> would be checked at calling method
 */
export const get_user_from_DB_async = async (body) => {
    try {
        const response = await axios.post(server_backend_address + '/signin', body);
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
        const response = await axios.post(server_backend_address + '/register', body);
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
        const response = await axios.get(server_backend_address + '/did-game-created');
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
        const response = await axios.post(server_backend_address + '/create-room', body);
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


/**
 * Async call to dictionary-api
 * @param {string} word 
 * @returns Status: 200, Data: Good guess, change turns -> on guessing right
 *          Status: 409, Data: Wrong guess, try again -> on wrong guess
 *          err - if call to backend server failed
 */
export const guess_word_async = async (word) => {
    try {
        console.log("inside guess_word_async");
        const result = await axios.get(server_backend_address + "/guess-word/" + word);
        console.log(result);
        return result
    }
    catch (err) {
        console.log("Error at guess_word_async - api", err)
        return err;
    }
}

/**
 * Async calling to server send canvas object
 * @param {Object} canvasObject 
 * @returns response/err from server -> would be checked at calling method
 *          200 - canvas found and updated
 *          404 - no canvas was found
 */
export const send_canvas_object_to_server_async = async (canvasObject) => {
    try {
        const body = {
            type: "canvas object",
            canvas: canvasObject
        }
        const response = await axios.post(server_backend_address + '/post-canvas', body);
        return response;
    }
    catch (err) {
        console.log("Error at send_canvas_object_to_server - api", err)
        return err;
    }
}

/**
 * Async calling to server to get canvas object
 * @param {Object} canvasObject 
 * @returns response/err from server -> would be checked at calling method
 *          200 - got canvas
 *          404 - no canvas was found
 */
export const get_canvas_object_from_server_async = async () => {
    try {
        console.log("in get_canvas_object_from_server_async... ")
        const response = await axios.get(server_backend_address + '/get-canvas');
        console.log("Got response from server at ....")
        return response
    } catch (error) {
        console.log("Error at get_canvas_object_from_server_async - api", error)
        return error;
    }
}


export const get_room_status_async = async () => {
    try {
        console.log("get_room_status_async called")
        const response = await axios.get(server_backend_address + '/room-status')
        console.log("Got room status")
        return response
    } catch (error) {
        console.log("Error at get_canvas_object_from_server_async - api", error)
        return error;
    }
}