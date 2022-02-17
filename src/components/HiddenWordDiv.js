// import React from 'react'

// const HiddenWordDiv = ({ word, wordDefinition, moveToGameRoom }) => {
//     return (
//         <div className="flex flex-column items-center dt dt--fixed w-100">
//             <p className="f6 fw6 center ml2 mr2 underline font-family: monaco">The word you got is</p>
//             <p className="f4 fw6 center ml2 mr2 font-family: monaco">{word.chosenWord.toUpperCase()}</p>
//             {wordDefinition !== undefined ?
//                 <div className=" flex flex-column items-center dt dt--fixed w-100">
//                     <p className="f6 fw6 center ml2 mr2 underline font-family: monaco">The word meaning is</p>
//                     <p className="f6 dt ml2 mr2 font-family: monaco">{wordDefinition}</p>
//                 </div>
//                 : null}
//             <div className=''>
//                 <button className="tc fl mw-50 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
//                     onClick={() => { moveToGameRoom() }}>Start Game</button>
//             </div>
//         </div>
//     )
// }

// export default HiddenWordDiv