import React, { createContext, useRef, useEffect } from 'react'
import { UserContext } from '../UsersContest'
// components
import { GuessTurnFooterView, DrawTurnFooterView, GameRoomHeader } from '../components/GameComponents'
import Canvas from '../components/Canvas'


function GamePage() {
    console.log("First line in Game page")
    // contexts and const
    // const userGuessRef = useRef('');
    const width = (window.innerWidth * 100) / 100
    const height = (window.innerHeight * 75) / 100
    const userIsTheDrawer = useRef(false);
    const GameContext = createContext();
    // const { user, setUser } = useContext(UserContext);


    // Mocking data
    const user = "User 1";
    let fakeProps = {
        user1: "User 1",
        user2: "User 2",
        currentWord: "Fake word",
        wordLevel: "1",
        whosTurn: 1,
        showWord: false
    }
    if ((user === fakeProps.user1 && fakeProps.whosTurn === 1) ||
        (user === fakeProps.user2 && fakeProps.whosTurn === 2)) {
        userIsTheDrawer.current = true;
        fakeProps.showWord = true;
    }
    // Mocking data



    const canvasProps = { width: width, height: height, allowDrawing: userIsTheDrawer.current }

    useEffect(() => {
        // set role:
        console.log("Rendering Game Page")
    }, []) // similar to onComponentMount()




    return (
        <div className="vh-100 flex flex-column items-center bg-washed-green">
            <div className="outline w-100 " style={{ height: 10 + 'em' }}>
                {/* using style because can't set height to anything but 25/50/75/100 using tachyons vh */}
                <GameRoomHeader props={fakeProps} />
            </div>
            <div className="outline w-100 vh-75">
                <Canvas props={canvasProps} />
            </div>
            <div className="outline w-100" style={{ height: 10 + 'em' }} >
                {/* using style because can't set height to anything but 25/50/75/100 using tachyons vh */}
                {userIsTheDrawer.current // custom footer by role.
                    ? <DrawTurnFooterView />
                    : <GuessTurnFooterView />}
            </div>
        </div>
    )
}

export default GamePage