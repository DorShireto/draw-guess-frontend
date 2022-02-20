import {
    guess_word_async,
    send_canvas_object_to_server_async,
    get_canvas_object_from_server_async,
    get_room_struct_async,
    post_server_round_win_async,
    check_if_round_ended_async
} from "../api/api";
let currentCanvas = null; // holding the up-to-date canvas that was received from server 



/**
 * Sending the user's guessed word to server
 * using private method send_guess_async
 * @param {String} word 
 * @returns if guessed write -> call correctGuess method
 *          else alert for wrong guess
 */
export const userGuessing = async (guessedWord, correctGuess) => {
    // const { navigate, switchTurns, setGameScore, setShowChildComponent } = correctGuess
    try {
        console.log("Sending ", guessedWord, " to server...")
        const guessedRight = await send_guess_async(guessedWord);
        if (guessedRight) { // on good guess
            console.log("Good guess - starting switching turns useCase")
            alert("Good guess - starting switching turns useCase");
            // switchTurns(navigate, setGameScore, setShowChildComponent)
            correctGuess()
        }
        else {
            alert("You guessed wrong.. no worry, try again.")
        }
    } catch (error) {
        console.log("Error at userGuessing - GamePage", error);
    }
}

/**
 * Sending canvas object to user
 * canvas will be transfer into a dataURL object
 */
export const sendCanvasToGuesser = async () => {
    try {
        const canvas = document.getElementById('canvas');
        const canvasAsDataURL = canvas.toDataURL()
        console.log(canvasAsDataURL)
        const response = await send_canvas_object_to_server_async(canvasAsDataURL);
        console.log(response)
    } catch (error) {
        console.log("Error atsendCanvasToGuesser - GamePage", error);

    }
}

/**
 * Check with server for new canvas layout
 * Method for the guessing user
 */
export const checkForCanvas = async () => {
    try {
        console.log("Checking for canvas is server...")
        const response = await get_canvas_object_from_server_async();
        console.log("Response: ", response);
        if (response.status === 200) {
            if (currentCanvas !== response.data) { // check if canvas need to be updated!
                console.log("Updating canvas...")
                currentCanvas = response.data;
                updateCanvas();
            }
        }
        else return
    } catch (error) {
        console.log("Error checkForCanvas - GamePage", error);

    }
}

/** Updating server about win round event
 * using private method update_server_on_round_win_async
 * @returns true - update worked
 *          false - update failed
 */
export const updateServerForRoundWinAsync = async () => {
    try {
        const response = await update_server_on_round_win_async()
        if (response) {// update worked
            console.log("Update for win round worked - updateServerForRoundWinAsync")
            return true
        }
        else {
            console.log("Update for win round failed - updateServerForRoundWinAsync")
            return false
        }
    } catch (error) {
        console.log("Error updateServerForRoundWinAsync - GamePage", error);
    }
}

/** Check if round was over
 * using private method check_if_round_ended
 * @returns true - update worked
 *          false - update failed
 */
export const checkIfRoundOverAsync = async () => {
    try {
        const response = await p_check_if_round_ended_async()
        if (response.status === 200) {
            return response.data;
        }
        else return false;
    } catch (error) {
        console.log("Error checkIfRoundOverAsync - GamePage", error);
    }
}

/** Get room struct from server
 * @returns game struct
 */
export const getRoomStatus = async () => {
    try {
        console.log("getRoomStatus called")
        const gameStruct = await get_room_struct_async();
        console.log("Got game struct, ", gameStruct)
        return gameStruct.data
    } catch (error) {
        console.log("Error at getRoomStatus - GamePage", error);

    }
}


/**
 * PRIVATE METHODS BELOW
 */

/** Private method - update user's canvas (only for user who's guessing)
 * Will called only if the canvas was fetched
 */
const updateCanvas = () => {
    const newCanvasDataURL = currentCanvas;
    let userCanvas = document.getElementById('canvas');
    var ctx = userCanvas.getContext('2d');
    var img = new Image;
    img.onload = () => {
        ctx.drawImage(img, 0, 0)
    }
    img.src = newCanvasDataURL;
}

/** Private method - calling guess_word_async method from "./api"
 * @param {String} word 
 * @returns true - if was guessed right
 *          false - if was guessed wrong
 */
const send_guess_async = async (word) => {
    console.log("Got word from guessing user, sending to server...");
    try {
        const response = await guess_word_async(word);
        if (response.status === 200) {
            console.log("User guessed right!");
            return true
        }
        console.log("User guessed wrong")
        return false;

    } catch (error) {
        console.log("Error at send_guess_async - api", error)
    }
}

/** Private method - calling post_server_round_win_async method from "./api"
 * @returns true - if was update success
 *          false - if update failed
 */
const update_server_on_round_win_async = async () => {
    console.log("Updating server about round win - game utils")
    try {
        const response = await post_server_round_win_async()
        if (response.status === 200) {
            console.log("Update successfully")
            return true
        }
        console.log("Update failed..", response.data)
        return false
    } catch (error) {
        console.log("Error at update_server_on_round_win_async - api", error)
    }
}

/** Private method - calling check_if_round_ended_async method from "./api"
 * @returns true - need to change states
 *          false - round not over
 */
const p_check_if_round_ended_async = async () => {
    try {
        const response = await check_if_round_ended_async()
        return response

    } catch (error) {
        console.log("Error at check_if_round_ended - api", error)
    }
}
