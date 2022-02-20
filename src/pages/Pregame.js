import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWordByLevel } from '../utils/wordsUtil'
import { create_game_room_async } from '../api/api';
import { UserContext } from '../UsersContest';
import HiddenWordDiv from '../components/HiddenWordDiv';




function Pregame() {
    // CONSTANTS
    const { user, setUser } = useContext(UserContext);
    const [word, setWord] = useState('');
    const [wordDefinition, setWordDefinition] = useState('');
    const [showDiv, setShowDiv] = useState('');
    const navigate = useNavigate(); // programming routing
    ////////////
    // const HiddenDiv = ({ word, wordDefinition }) => (
    //     <div className="flex flex-column items-center dt dt--fixed w-100">
    //         <p className="f6 fw6 center ml2 mr2 underline font-family: monaco">The word you got is</p>
    //         <p className="f4 fw6 center ml2 mr2 font-family: monaco">{word.chosenWord.toUpperCase()}</p>
    //         {wordDefinition !== undefined ?
    //             <div className=" flex flex-column items-center dt dt--fixed w-100">
    //                 <p className="f6 fw6 center ml2 mr2 underline font-family: monaco">The word meaning is</p>
    //                 <p className="f6 dt ml2 mr2 font-family: monaco">{wordDefinition}</p>
    //             </div>
    //             : null}
    //         <div className=''>
    //             <button className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
    //                 onClick={() => { moveToGameRoom() }}>Start Game</button>
    //         </div>
    //     </div>
    // )
    // methods

    /**
     * @param { String } level - Easy / Medium / Hard
     * Async method - using getWordByLevel method from utils/wordsUtils
     * method sets the word and the word definition (if one was found)
     * method will trigger hidden div that will present the word and definition (if one was found)
     */
    async function getWord(level) {
        try {
            const { chosenWord, definition } = await getWordByLevel(level) // get word (and definition if exists)
            setWord({ chosenWord: chosenWord, level: level });
            console.log("word: ", word)
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
    /**
     * Async method - calling to server to create a game room
     * if room was created -> will reroute to the gamePage
     */
    async function moveToGameRoom() {
        const body = { chosenWord: word.chosenWord, level: word.level, userName: user.userName };
        try {
            const response = await create_game_room_async(body);
            console.log(response);
            /////////////////////FOR TEST
            // navigate('/test', { state: response.data });

            navigate('/gamePage', { state: response.data });
        }
        catch (err) {
            console.log("Error at moveToGameRoom - Pregame", err);
            alert("Could not create a room due to an error");
        }
    }
    return (
        <div className='bg-washed-green vh-100'>

            <article className="br3 ba b--black-10 mb4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80 bg-washed-green dark-green">
                    <div className="measure">
                        <legend className="f2 fw6 ph0 mh0 center">Choose Level</legend>
                        <div className="flex flex-column items-center dt dt--fixed w-100 pa3">
                            <div className="">
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
                        <legend className=" f5 fw6 ph0 mh0 center mb2 font-family: monaco ">Points</legend>
                        <div className="flex justify-content: center">
                            <p className="f6 fw6 ph0 mh0 center ml2 mr2 font-family: monaco">Easy - 1pt</p>
                            <p className="f6 fw6 ph0 mh0 center ml2 font-family: monaco">Medium - 2pt</p>
                            <p className="f6 fw6 ph0 mh0 center ml2 font-family: monaco">Hard - 3pt</p>
                        </div>
                        {showDiv === true ?
                            <div className="flex flex-column items-center dt dt--fixed w-100 pa3">
                                <HiddenWordDiv word={word} wordDefinition={wordDefinition} moveToGameRoom={moveToGameRoom} />
                                {/* <HiddenDiv word={word} wordDefinition={wordDefinition}  /> */}
                            </div>
                            : null}
                    </div>
                </main>
            </article>
        </div>

    );
}
export default Pregame


