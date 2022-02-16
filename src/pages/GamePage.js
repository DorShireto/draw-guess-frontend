import React from 'react'
import GameRoomHeader from '../components/GameRoomHeaderComponent'
import Canvas from '../components/Canvas'
function GamePage() {
    let fakeProps = {
        user1: "User 1",
        user2: "User2",
        currentWord: "Fake word",
        wordLevel: "1",
        whosTurn: 1
    }

    const width = (window.innerWidth * 100) / 100
    const height = (window.innerHeight * 75) / 100
    const canvasProps = { width: width, height: height }


    return (
        <div className="vh-100 flex flex-column items-center bg-washed-green">
            <div className='v-inherit'>
                <div className="outline vh-15 w-100 pa3">
                    <GameRoomHeader props={fakeProps} />
                </div>
                <div className="outline vh-75 w-100 pb3 pr3">
                    <Canvas props={canvasProps} />
                </div>
                <div className="outline vh-10 w-100">
                    <p>Buttom here</p>
                </div>
            </div>
        </div>
    )
}

export default GamePage