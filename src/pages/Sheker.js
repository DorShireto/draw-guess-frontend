import React, { useContext } from 'react'
import { UserContext } from '../UsersContest';
import { useNavigate } from 'react-router-dom'


function Sheker() {
    const [user, setUser] = useContext(UserContext);
    let navigate = useNavigate();

    return (
        <div>
            <button onClick={() => setUser("Sheker")}>Sheker</button>
            <button onClick={() => navigate("/")}>Go Back</button>
        </div>
    )
}

export default Sheker