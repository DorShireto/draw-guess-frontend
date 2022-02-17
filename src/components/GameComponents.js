import React, { useRef } from "react";
import { userGuessing } from "../utils/gameUtils";
// import UsersData from './UsersData';

export const GuessTurnFooterView = () => {
    const userGuessRef = useRef('');
    return (
        // <div className="flex flex-column item-center">
        <div className="">
            <h4 className="f6 ma0 pb1 fw6 lh-title">Hey! it is your turn to guess! You got it</h4>
            <dl className="f6 ma0 pa0 lh-title">
                <dt className="dib pr1 b">Word is:</dt>
                <dd className="dib ml0 gray">
                    <input
                        className="pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                        type="text"
                        id="email-address-signin"
                        ref={userGuessRef}
                    />
                </dd>
            </dl>
            <dl className="f6 ma0 ml0 lh-title">
                <p className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                    onClick={() => userGuessing(userGuessRef.current.value)}>
                    Send Guess
                </p>
            </dl>
        </div>
    )
}

export const DrawTurnFooterView = () => (
    <div className='flex items-center'>
        <p className="fw1 f5 mt0 mb3">Hey! it is your turn to draw!</p>
    </div>
)

export const GameRoomHeader = ({ props }) => {
    // const { user, setUser } = useContext(UserContext); // hooks to update user state
    let user = "User 2" //for mocking use
    const WordHiddenDiv = ({ word }) => (
        <div className="">
            <dl className="f6 ma1 ml0 lh-title">
                <dt className="dib pr1 b">Word:</dt>
                <dd className="dib ml0 gray">{word}</dd>
            </dl>
        </div>
    )

    console.log(props);
    const { user1, user2, currentWord, wordLevel, whosTurn, showWord } = props;
    // const user1 = props.user1;
    console.log("user 1:", user1)
    // const user2 = props.user2;
    console.log("user 2:", user2)
    // const currentWord = props.currentWord;
    // const wordLevel = props.wordLevel;
    // const whosTurn = props.whosTurn;

    return (
        <div className="flex justify-around">
            <div className="w-45 mr2">
                <UsersData props={{ user1, user2 }} />
                {showWord ? <WordHiddenDiv word={currentWord} />
                    : //Do not show word when user is on guesser role!
                    null
                }
            </div>
            <div className="w-45 flex flex-column">
                <p className="f6 b underline center ma2 fw6">Total Score</p>
                <p className="dib ma0 b center">5</p>
                <p className="f6 b underline center ma2 fw6">Current word worth</p>
                <p className="dib ma0 b center">{wordLevel}</p>
            </div>
        </div>
    );
}

export const UsersData = ({ props }) => {
    console.log(props)
    const { user1, user2 } = props;
    return (
        <div className="flex flex-column item-center">
            <h4 className="f6 ma2 fw6">Users in game</h4>
            <dl className="f6 ma1 ml0 lh-title">
                <dt className="dib pr1 b">User 1:</dt>
                <dd className="dib ml0 gray">{user1}</dd>
            </dl>
            <dl className="f6 ma1 ml0 lh-title">
                <dt className="dib pr1 b">User 2:</dt>
                <dd className="dib ml0 gray">{user2}</dd>
            </dl>
        </div>
    );
}