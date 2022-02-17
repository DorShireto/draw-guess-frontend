import {
    guess_word_async,
    send_canvas_object_to_server_async,
    get_canvas_object_from_server_async
} from "../api/api";
let currentCanvas = null; // holding the up-to-date canvas that was received from server 


/**
 * Sending the user's guessed word to server
 * using private method send_guess_async
 * @param {String} word 
 * @returns true - word was guessed right
 *          false - word was guessed wrong
 */
export const userGuessing = async (guessedWord) => {
    try {
        console.log("Sending ", guessedWord, " to server...")
        const guessedRight = await send_guess_async(guessedWord);
        if (guessedRight) { // on good guess
            console.log("Good guess - starting switching turns useCase")
            alert("Good guess - starting switching turns useCase");
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

/**
 * PRIVATE METHODS BELOW
 */

/**
 * private method 
 * Will called only if the canvas was fetched - still not working.
 */
const updateCanvas = () => {
    const newCanvasDataURL = currentCanvas;
    let userCanvas = document.getElementById('canvas');
    var ctx = userCanvas.getContext('2d');
    var img = new Image;
    img.src = newCanvasDataURL;
    ctx.drawImage(img, 0, 0);
}

/**
 * Private method - calling guess_word_async method from "./api"
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
        console.log("Error at sendGuess - api", error)
    }
}