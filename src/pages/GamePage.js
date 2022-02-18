import React, { useRef, useEffect, useState, useContext } from 'react'
import { UserContext } from '../UsersContest'
// components
import { GuessTurnFooterView, DrawTurnFooterView, GameRoomHeader } from '../components/GameComponents'
import Canvas from '../components/Canvas'
import { checkForCanvas, getRoomStatus } from '../utils/gameUtils'


const GamePage = () => {
    console.log("First line in Game page")
    // Canvas props
    const width = (window.innerWidth * 100) / 100
    const height = (window.innerHeight * 75) / 100
    // users details
    const [user1State, setUser1State] = useState('')
    const [user2State, setUser2State] = useState('')
    const [currentWordState, setCurrentWord] = useState('')
    const [wordLevelState, setWordLevelState] = useState('')
    const [whosTurnState, setWhosTurn] = useState('')
    const [gameScoreState, setGameScore] = useState(0)
    const [canvasFromServerState, setCanvasFromServer] = useState('')
    // game mode
    const [showChildComponent, setShowChildComponent] = useState(false)
    const [userIsTheDrawerState, setUserIsTheDrawerState] = useState(false)
    const userIsTheDrawer = useRef(false)
    const showWord = useRef(false)
    const headerProps = useRef('')
    const { user, setUser } = useContext(UserContext);  // session user
    const canvasProps = { width: width, height: height, allowDrawing: userIsTheDrawer.current }

    useEffect(() => {
        getRoomStatus().then(gameProps => {
            console.log("Got game props: ", gameProps)
            setUser1State(gameProps.user1)
            setUser2State(gameProps.user2)
            setCurrentWord(gameProps.currentWord)
            setWordLevelState(gameProps.wordLevel)
            setWhosTurn(gameProps.whosTurn)
            setGameScore(gameProps.gameScore)
            setCanvasFromServer(gameProps.canvas)
            // set turn
            if ((user.userName === user1State && whosTurnState === 1) ||
                (user.userName === user2State && whosTurnState === 2)) {
                userIsTheDrawer.current = true;
                setUserIsTheDrawerState(true)
                showWord.current = true
            }
            headerProps.current = {
                user1: user1State,
                user2: user2State,
                currentWord: currentWordState,
                wordLevel: whosTurnState,
                showWord: showWord.current
            }
            console.log("Done loading, can present...")
            setShowChildComponent(true)
        }).catch(err => {
            console.log("Error ", err)
        })
        console.log("asdasd")
        // set role:
        console.log("Rendering Game Page")
    }, []) // similar to onComponentMount()

    // setInterval(async () => {
    //     if (userIsTheDrawerState === false) {
    //         console.log("Checking for canvas")
    //         await checkForCanvas()
    //     }
    // }, 20000)


    return (
        <div className="vh-100 flex flex-column items-center bg-washed-green">
            <div className="outline w-100 " style={{ height: 10 + 'em' }}>
                {/* using style because can't set height to anything but 25/50/75/100 using tachyons vh */}
                {showChildComponent && <GameRoomHeader props={headerProps.current} />}
                {/* <GameRoomHeader props={headerProps.current} /> */}
            </div>
            <div className="outline w-100 vh-75">
                {showChildComponent && <Canvas props={canvasProps} />}
            </div>
            <div className="outline w-100" style={{ height: 10 + 'em' }} >
                {/* using style because can't set height to anything but 25/50/75/100 using tachyons vh */}
                {showChildComponent && userIsTheDrawer.current ? <DrawTurnFooterView /> : <GuessTurnFooterView />
                }
                {/* {userIsTheDrawer.current // custom footer by role.
                    ? <DrawTurnFooterView />
                    : <GuessTurnFooterView />} */}
            </div>
        </div>
    )
}

export default GamePage