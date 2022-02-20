import React, { useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'tachyons'; // Design pack

// import pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Pregame from './pages/Pregame';
import GamePage from './pages/GamePage';
import TooLate from './pages/Test';
import { UserContext } from './UsersContest';

// import contexts 


function App() {
    const [user, setUser] = useState();
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);
    return (
        <Router>
            <UserContext.Provider value={value}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pregame" element={<Pregame />} />
                    <Route path="/gamePage" element={<GamePage />} />
                    <Route path="/tooLate" element={<TooLate />} />
                    {/* {This will route any unexists paths to error page} */}
                    <Route path="*" element={<Error />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );


}


export default App