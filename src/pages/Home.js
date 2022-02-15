import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../UsersContest';
import { game_created_question_async } from '../api/api';

// Global fields
let gameRoomCreated = false;
let gameStruct = {};
// state management
// const [gameRoomCreated, setGameRoomCreated] = useEffect('');
// const [gameStruct, setGameStruct] = useEffect('');


const Home = () => {
    // state management
    const { user, setUser } = useContext(UserContext);
    /**
     * useEffect as componentDidMount life-cycle by passing [] as parameter.
     * going to check with server if game room was already create
     * if room was created: 
     *      present Join Game button
     * else:
     *      present Create  Game button
     */

    useEffect(() => {
        //API call to server to get game created status
        game_created_question_async()
            .then(gameCreatedFromServer => {
                console.log(gameCreatedFromServer)
                if (gameCreatedFromServer.status === 204) {
                    gameRoomCreated = false;
                }
                else {
                    gameRoomCreated = true;
                    gameStruct = gameCreatedFromServer.data;
                }
            })
            .catch(err => {
                console.log("Error at useEffect - Home\n", err);
            })
    }, [])

    // const [gameRoomCreated, setGameRoomCreated] = useEffect(false);
    // const [gameStruct, setGameStruct] = useEffect('');

    let navigate = useNavigate();
    return (
        <div>
            {user === undefined ?
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <article className="center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green">
                        <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
                            Welcome to Draw and Guess
                        </h1>
                        <h2 className="fw2 f4 lh-copy mt0 mb3">
                            In this game, you and your friend will compete with each other to see who can draw the best, and who can guess.
                        </h2>
                        <p className="fw1 f5 mt0 mb3">
                            Sign up or Log in now to access the game.
                        </p>
                        <div>
                            <p className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                                onClick={() => navigate("/signup")}>
                                Sign Up
                            </p>
                            <p className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
                                onClick={() => navigate("/signin")}>
                                Log in
                            </p>
                        </div>
                    </article>
                </article>
                :
                //////////////////////////////// USER LOGGED IN //////////////////////////
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <article className="center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green">
                        <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
                            Welcome to Draw and Guess
                        </h1>
                        <h2 className="fw2 f4 lh-copy mt0 mb3">
                            Hey {user.userName} it's great to see you!
                        </h2>
                        <div className='tc'>
                            {!gameRoomCreated ? // checking if game room was created, 
                                <p className="tc f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                                    onClick={() => navigate("/pregame")}>
                                    Create Game
                                </p>
                                :
                                <p className="tc f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
                                    onClick={alert("Still in work")}>
                                    Join Game
                                </p>}
                        </div>
                    </article>
                </article>
            }
        </div>




    )
}

export default Home;
