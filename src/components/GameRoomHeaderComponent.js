// import React, { useContext } from 'react'
// import UsersData from './UsersData';
// import header_img from '../resources/game_header_img.png'
// import { UserContext } from '../UsersContest';
// const GameRoomHeader = ({ props }) => {
//   // const { user, setUser } = useContext(UserContext); // hooks to update user state
//   let user = "User 2" //for mocking use
//   const WordHiddenDiv = ({ word }) => (
//     <div className="">
//       <dl className="f6 ma1 ml0 lh-title">
//         <dt className="dib pr1 b">Word:</dt>
//         <dd className="dib ml0 gray">{word}</dd>
//       </dl>
//     </div>
//   )

//   console.log(props);
//   const { user1, user2, currentWord, wordLevel, whosTurn } = props;
//   // const user1 = props.user1;
//   console.log("user 1:", user1)
//   // const user2 = props.user2;
//   console.log("user 2:", user2)
//   // const currentWord = props.currentWord;
//   // const wordLevel = props.wordLevel;
//   // const whosTurn = props.whosTurn;

//   return (
//     <div className="flex justify-around">
//       <div className="w-45 mr2">
//         <UsersData props={{ user1, user2 }} />
//         {(user1 === user && whosTurn === 1) || (user2 === user && whosTurn === 2) ? <WordHiddenDiv word={currentWord} /> : null}
//       </div>
//       <div className="w-45 flex flex-column">
//         <p className="f6 b underline center ma2 fw6">Total Score</p>
//         <p className="dib ma0 b center">5</p>
//         <p className="f6 b underline center ma2 fw6">Current word worth</p>
//         <p className="dib ma0 b center">{wordLevel}</p>
//       </div>
//     </div>
//   );
// }

// export default GameRoomHeader