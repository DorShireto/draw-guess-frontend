import React from 'react'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from "react";
var randomWords = require('random-words');
var chosenWord = '';
var definition = '';

async function getWord(level) {
    console.log("In get words");
    let allWords = randomWords.wordList;
    let easyWords, mediumWords, hardWords;
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
    let definitionAPI_ADDR = "https://api.dictionaryapi.dev/api/v1/entries/en"; // API to get word definition
    let result = await axios.get(definitionAPI_ADDR + "/" + chosenWord); // API call to dictionaryAPI
    if (result.data.length > 0 && result.data[0].meaning.noun.length > 0) {
        definition = result.data[0].meaning.noun[0].definition;
    }
    console.log(definition);
}

function Pregame() {
    let choseWord = false;
    // let navigate = useNavigate();
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80 bg-washed-green dark-green">
                <div className="measure">
                    <legend className="f2 fw6 ph0 mh0 center">Chose Level</legend>
                    <div className="flex flex-column items-center dt dt--fixed w-100 pa3 pt4">
                        <div className="dtc">
                            <p className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                                onClick={() => {
                                    choseWord = true
                                    getWord("Easy");
                                }} >Easy</p>
                        </div>
                        <div className="">
                            <p className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                                onClick={() => {
                                    getWord("Medium")
                                    choseWord = true
                                }}>Medium</p>
                        </div>
                        <div className="">
                            <p className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                                onClick={() => {
                                    choseWord = true
                                    getWord("Hard")
                                }}>Hard</p>
                        </div>
                    </div>
                    <legend className="f5 fw6 ph0 mh0 center mb2 font-family: monaco ">Points</legend>
                    <div className="flex justify-content: center">
                        <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">Easy - 1pt</p>
                        <p className="f6 fw6 ph0 mh0 center ml2 font-family: monaco">Medium - 2pt</p>
                        <p className="f6 fw6 ph0 mh0 center ml2 font-family: monaco">Hard - 3pt</p>
                    </div>
                    {choseWord ?
                        <div>
                            <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">The word you go is: ${chosenWord} </p>
                            <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">The meaning is: ${definition} </p>
                        </div>
                        : <div>
                        </div>}
                </div>
            </main>
        </article>
    );
}

export default Pregame