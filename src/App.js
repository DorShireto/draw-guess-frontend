import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'tachyons'; // Design pack

// import pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Pregame from './pages/Pregame';
import Sheker from './pages/Sheker';
import { UserContext } from './UsersContest';

// import contexts 


function App() {
    const [user, setUser] = useState();
    return (
        <Router>
            <UserContext.Provider value={[user, setUser]}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sheker" element={<Sheker />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pregame" element={<Pregame />} />
                    {/* {This will route any unexists paths to error page} */}
                    <Route path="*" element={<Error />} />
                </Routes>
            </UserContext.Provider>

        </Router>
    );


}


export default App