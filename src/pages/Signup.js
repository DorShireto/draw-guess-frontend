import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { add_user_to_DB_async } from '../api/api';


async function onSubmit(navigate) {
    const userName = document.getElementById('userName-register').value;
    const email = document.getElementById('email-address-register').value;
    const password = document.getElementById('password-register').value;
    const body = {
        userName: userName,
        email: email,
        password: password
    }
    try {
        const response = await add_user_to_DB_async(body)
        console.log(response.status);
        if (response.status !== 200) {
            navigate('/signup');
            alert(response.data);
        }
        navigate('/', { userName: userName });
        //TODO
    }
    catch (err) {
        alert(err.response);
        // console.log(err.response);
    }
}


function Signup() {
    let navigate = useNavigate();
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
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address-register"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                type="password"
                                name="password"
                                id="password-register"
                            />
                        </div>
                    </fieldset>
                    <div class="flex justify-center">
                        <p class="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                            onClick={() => onSubmit(navigate)}>
                            Sign up
                        </p>
                        <p class="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
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