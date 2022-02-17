import { guess_word_async } from "../api/api";

export const send_guess_async = async (word) => {
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