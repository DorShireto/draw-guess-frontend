import { get_word_definition_async } from '../api/api'

const randomWords = require('random-words');
const allWords = randomWords.wordList;
export const getWordByLevel = async (level) => {
    let chosenWord = ''
    try {
        console.log("words utils");
        let easyWords, mediumWords, hardWords;
        while (chosenWord.length < 2) { // avoid cases of getting empty word
            if (level === "Easy") {
                easyWords = allWords.filter((word) => word.length < 5); //filet all words with less then 5 chars - Easy word
                chosenWord = easyWords[Math.floor(Math.random() * easyWords.length)]; // get random word out of words list
                console.log(chosenWord);
            }
            else if (level === "Medium") {
                mediumWords = allWords.filter((word) => word.length > 4 && word.length < 9);
                chosenWord = mediumWords[Math.floor(Math.random() * mediumWords.length)] // get random word out of words list
                console.log(chosenWord);
            }
            else {
                hardWords = allWords.filter((word) => word.length >= 9);
                chosenWord = hardWords[Math.floor(Math.random() * hardWords.length)] // get random word out of words list
                console.log(chosenWord);
            }
        }
        const definition = await get_word_definition_async(chosenWord) // using dictionary api to get the word meaning
        return { chosenWord, definition };
    }
    catch (err) {
        console.log("Error at getWordsByLevel - wordsUtils", err)
    }
}