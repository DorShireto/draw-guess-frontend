import React, { useRef, useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { UserContext } from '../UsersContest'
// components
import { GuessTurnFooterView, DrawTurnFooterView, GameRoomHeader } from '../components/GameComponents'
import Canvas from '../components/Canvas'
import { checkForCanvas, getRoomStatus, updateServerForRoundWinAsync, checkIfRoundOverAsync } from '../utils/gameUtils'

/**
 * Method will be triggerd if user(role: guesser) was guessing write!
 * 1. Update users about the good guess!
 * 2. Update server on winning round
 * 3. Show the user a word picking menu
 * 4. Update server about new word -> will return new game struct
 * 5. Update clients view according to what will be getting from the server
 */

const GamePage = () => {
    //METHODS
    const switchTurns = async () => { //SOMETHING HERE SEEMS TO NOT WORK
        const updateServerAboutWin = await updateServerForRoundWinAsync() // update scores in server
        const newGameStruct = await getRoomStatus()
        let score = newGameStruct.gameScore
        // setShowChildComponent(false)
        console.log(newGameStruct)
        setGameScore(score)
        setWhosTurn(newGameStruct.whosTurn)
        setUserIsTheDrawerState(true)
        // setRoundEnded(prev => !prev)
        // navigate('/gamePage', { state: newGameStruct });
    }

    const switchFromDrawToGuess = async () => { //NOT WORKING IDK WHY
        const response = await checkIfRoundOverAsync()
        if (response === false) return
        /// ROUND IS OVER - CHANGE STATES:
        // response hold game_struct
        setGameScore(response.gameScore)
        setWhosTurn(response.whosTurn)
        setUserIsTheDrawerState(false)
        userIsTheDrawer.current = false
        // setRoundEnded(prev => !prev)

    }



    console.log("First line in Game page")
    // import state passed by navigate method:
    const { state } = useLocation()
    // Canvas props
    const width = (window.innerWidth * 100) / 100
    const height = (window.innerHeight * 75) / 100
    // current user context
    const { user, setUser } = useContext(UserContext);  // session user
    // users details
    const [user1State, setUser1State] = useState(state.user1)
    const [user2State, setUser2State] = useState(state.user2)
    const [currentWordState, setCurrentWord] = useState(state.currentWord)
    const [wordLevelState, setWordLevelState] = useState(state.wordLevel)
    const [whosTurnState, setWhosTurn] = useState(state.whosTurn)
    const [gameScoreState, setGameScore] = useState(state.gameScore)
    // const [canvasFromServerState, setCanvasFromServer] = useState(state.canvas)
    // game mode
    const [showChildComponent, setShowChildComponent] = useState(false)
    const [userIsTheDrawerState, setUserIsTheDrawerState] = useState(false)
    const [showWordState, setShowWordState] = useState(false)
    const [roundEnded, setRoundEnded] = useState(false)
    const userIsTheDrawer = useRef(false)
    // const showWord = useRef(false)
    const headerProps = useRef('')
    var canvasProps = { width: width, height: height, allowDrawing: userIsTheDrawer.current };


    useEffect(() => {
        if (user2State === '' && state.user2 !== '') {
            setUser2State(state.user2)
        }
        console.log("use effect")
        var showWord = false;
        // set turn
        if ((user.userName === user1State && whosTurnState === 1) ||
            (user.userName === user2State && whosTurnState === 2)) {
            userIsTheDrawer.current = true;
            setUserIsTheDrawerState(true)
            showWord = true;
            setShowWordState(true)
            // showWord.current = true
        }
        headerProps.current = {
            user1: user1State,
            user2: user2State,
            currentWord: currentWordState,
            wordLevel: wordLevelState,
            // showWord: showWord.current,
            showWord: showWord,
            gameScore: gameScoreState
        }
        setShowChildComponent(true)
    }, [gameScoreState, whosTurnState, userIsTheDrawerState, user2State, roundEnded])

    /**
     * Interval will be called ever 5 seconds.
     * When user is the guesser: 
     *      Check if new canvas was received in the server
     *      If new canvas was received - fetch it and update canvas view
     * When user is the drawer:
     *      Check with the server if turns were changed (due to correct guess)
     *      If yes - set new states and render components
     */
    setInterval(async () => {
        if (userIsTheDrawer.current === false) {
            console.log("Checking for canvas")
            await checkForCanvas()
        }
        else if (roundEnded) {
            await switchFromDrawToGuess()
        }
    }, 5000)


    return (
        <div className="vh-100 flex flex-column items-center bg-washed-green">
            {/* <button onClick={() => updateScore(gameScoreState, setGameScore)}>Count</button> */}
            <div className="outline w-100 " style={{ height: 10 + 'em' }}>
                {/* using style because can't set height to anything but 25/50/75/100 using tachyons vh */}
                {showChildComponent && <GameRoomHeader props={headerProps.current} score={gameScoreState, gameScoreState} />}
            </div>
            <div className="outline w-100 vh-75">
                {showChildComponent && <Canvas props={canvasProps} />}
            </div>
            <div className="outline w-100" style={{ height: 10 + 'em' }} >
                {/* using style because can't set height to anything but 25/50/75/100 using tachyons vh */}
                {showChildComponent && userIsTheDrawerState ? <DrawTurnFooterView /> : <GuessTurnFooterView correctGuess={switchTurns} />
                }
            </div>
        </div>
    )
}

export default GamePage
