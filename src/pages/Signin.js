import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { get_user_from_DB_async } from '../api/api';
import { UserContext } from '../UsersContest';


function Signin() {
    const { user, setUser } = useContext(UserContext); // hooks to update user state
    const navigate = useNavigate(); // programming routing
    // logging fields hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // METHODS
    async function onSubmit() {
        const body = {
            email: email,
            password: password
        };
        try {
            const userFromDB = await get_user_from_DB_async(body) // using api middleware to call server api
            /** 3 Status options:
             *      200: Login successfully, user object will be attached
             *      304: No place in room
             *      403: Wrong input - email or password are wrong.
             */
            if (userFromDB.status === 304) {
                alert("Room is full..");
                navigate('/tooLate');
            }
            else if (userFromDB.status === 403) {
                alert("Email or password not matching...");
                // navigate('/signin');
            }
            else {
                console.log(userFromDB);
                const userName = userFromDB.data.userName;
                const highestScore = userFromDB.data.highestScore;
                const updatedAt = userFromDB.data.updatedAt;
                const userContext = { userName: userName, email: email, highestScore: highestScore, updatedAt: updatedAt };
                setUser(userContext); // update user who is currently logged in
                navigate('/'); // return to home menu
            }
        }
        catch (err) {
            console.log(err);
        }
        console.log("Done")
    }
    // rendering
    return (
        <div className='bg-washed-green vh-100'>
            <div className='pt6'>
                <article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw6 shadow-5 center"  >
                    <main className="center pa4 black-80 bg-washed-green dark-green">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-signin">Email</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address-signin"
                                        value={email}
                                        onInput={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password-signin">Password</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password-signin"
                                        value={password}
                                        onInput={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </fieldset>
                            <div className="flex justify-center">
                                <p className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                                    onClick={() => onSubmit()}>
                                    Sign in
                                </p>
                                <p className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
                                    onClick={() => navigate("/signup")}>
                                    Register
                                </p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        </div>
    )
}

export default Signin