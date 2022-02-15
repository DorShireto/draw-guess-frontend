import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UsersContest';
import { add_user_to_DB_async } from '../api/api';


function Signup() {
    const { user, setUser } = useContext(UserContext); // hooks to update user state
    const navigate = useNavigate(); // programming routing
    // registration fields hook
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Methods

    async function onSubmit(navigate) {

        const body = {
            userName: userName,
            email: email,
            password: password
        }
        try {
            const response = await add_user_to_DB_async(body) // using api middleware to call server api
            console.log(response.status);
            if (response.status !== 200) {
                navigate('/signup');
                alert(response.data);
            }
            const userContext = { userName: userName, email: email }
            setUser(userContext); // update user who is currently logged in
            navigate('/'); // return to home menu
            //TODO
        }
        catch (err) {
            alert(err.response);
        }
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80 bg-washed-green dark-green">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="text">User Name</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                type="text"
                                name="userName"
                                id="userName-register"
                                value={userName}
                                onInput={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address-register"
                                value={email}
                                onInput={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                type="password"
                                name="password"
                                id="password-register"
                                value={password}
                                onInput={e => setPassword(e.target.value)}
                            />
                        </div>
                    </fieldset>
                    <div className="flex justify-center">
                        <p className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                            onClick={() => onSubmit(navigate)}>
                            Sign up
                        </p>
                        <p className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
                            onClick={() => navigate("/signin")}>
                            Login
                        </p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Signup