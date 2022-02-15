import React, { useState } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from "react";
import { getWordByLevel } from '../utils/wordsUtil'
// var randomWords = require('random-words');
// var chosenWord = '';
// var definition = '';

// async function getWord(level) {
//     try {
//         const { randomWord, definition } = await getWordByLevel(level)
//         console.log("Word is ", randomWord, "\nDefinition is ", definition)
//     }
//     catch (err) {
//         console.log("Error at getWord - Pregame", err)
//     }
// console.log("In get words");
// let allWords = randomWords.wordList;
// let easyWords, mediumWords, hardWords;
// if (level === "Easy") {
//     easyWords = allWords.filter((word) => word.length < 5); //filet all words with less then 5 chars - Easy word
//     chosenWord = easyWords[Math.floor(Math.random() * easyWords.length)]; // get random word out of words list
//     console.log(chosenWord);
// }
// else if (level === "Medium") {
//     mediumWords = allWords.filter((word) => word.length > 4 && word.length < 9);
//     chosenWord = mediumWords[Math.floor(Math.random() * mediumWords.length)] // get random word out of words list
//     console.log(chosenWord);
// }
// else {
//     hardWords = allWords.filter((word) => word.length >= 9);
//     chosenWord = hardWords[Math.floor(Math.random() * hardWords.length)] // get random word out of words list
//     console.log(chosenWord);
// }
// let definitionAPI_ADDR = "https://api.dictionaryapi.dev/api/v1/entries/en"; // API to get word definition
// let result = await axios.get(definitionAPI_ADDR + "/" + chosenWord); // API call to dictionaryAPI
// if (result.data.length > 0 && result.data[0].meaning.noun.length > 0) {
//     definition = result.data[0].meaning.noun[0].definition;
// }
// console.log(definition);
// }

function Pregame() {
    // CONSTANTS
    const [word, setWord] = useState('');
    const [wordDefinition, setWordDefinition] = useState('');
    const [showDiv, setShowDiv] = useState('');
    // methods

    async function getWord(level) {
        try {
            const { chosenWord, definition } = await getWordByLevel(level) // get word (and definition if exists)
            setWord(chosenWord);
            if (definition !== '' && definition !== undefined) {
                setWordDefinition(definition)
            }
            setShowDiv(true); // trigger to open hidden div
            console.log("Word is ", chosenWord, "\nDefinition is ", definition)
        }
        catch (err) {
            console.log("Error at getWord - Pregame", err)
        }
    }
    // let navigate = useNavigate();
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80 bg-washed-green dark-green">
                <div className="measure">
                    <legend className="f2 fw6 ph0 mh0 center">Chose Level</legend>
                    <div className="flex flex-column items-center dt dt--fixed w-100 pa3 pt4">
                        <div className="dtc">
                            <p className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                                onClick={() => { getWord("Easy") }} >Easy</p>
                        </div>
                        <div className="">
                            <p className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                                onClick={() => { getWord("Medium") }}>Medium</p>
                        </div>
                        <div className="">
                            <p className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                                onClick={() => { getWord("Hard") }}>Hard</p>
                        </div>
                    </div>
                    <legend className="f5 fw6 ph0 mh0 center mb2 font-family: monaco ">Points</legend>
                    <div className="flex justify-content: center">
                        <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">Easy - 1pt</p>
                        <p className="f6 fw6 ph0 mh0 center ml2 font-family: monaco">Medium - 2pt</p>
                        <p className="f6 fw6 ph0 mh0 center ml2 font-family: monaco">Hard - 3pt</p>
                    </div>
                    {showDiv === true ? <HiddenDiv word={word} wordDefinition={wordDefinition} /> : null}
                </div>
            </main>
        </article>
    );
}

const HiddenDiv = ({ word, wordDefinition }) => (
    <div>

        <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">The word you got is: {word}</p>
        {wordDefinition !== undefined ?
            <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">The word meaning is: {wordDefinition} </p>
            : null}
    </div>
)

// const Results = () => (
//     <div id="results" className="search-results">
//       Some Results
//     </div>
//   )


export default Pregame