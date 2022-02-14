import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { get_user_from_DB_async } from '../api/api';
import { UserContext } from '../UsersContest';
async function onSubmit(navigate, setUser) {
    const email = document.getElementById('email-address-signin').value;
    const password = document.getElementById('password-signin').value;
    // const server_post_address = process.env.REACT_APP_SERVER_DOMAIN + process.env.REACT_APP_SERVER_PORT;
    const body = {
        email: email,
        password: password
    };
    try {
        const userFromDB = await get_user_from_DB_async(body) // using api middleware to call server api
        if (userFromDB.status !== 200) {
            navigate('/signin');
            alert(userFromDB.data);
        }
        //TODO - setup session.
        console.log(userFromDB);
        const userName = userFromDB.data.userName;
        const userContext = { userName: userName, email: email };
        setUser(userContext);
        // navigate(to = "/");
    }
    catch (err) {
        // alert(err.userFromDB.data)
        console.log(err);
    }
    console.log("Done")
}

function Signin() {
    const [user, setUser] = useContext(UserContext);

    const navigate = useNavigate();
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <button onClick={() => {
                try {
                    setUser("Sheker");
                    console.log(user)
                }
                catch (err) {
                    console.log(err);
                }
            }}>Sheker</button>
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
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password-signin">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-dark-green hover-white w-100"
                                type="password"
                                name="password"
                                id="password-signin"
                            />
                        </div>
                    </fieldset>
                    <div className="flex justify-center">
                        <p className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                            onClick={() => onSubmit({ navigate: navigate, setUser: setUser })}>
                            Sign in
                        </p>
                        <p className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
                            onClick={() => navigate("/signup")}>
                            Register
                        </p>
                    </div>



                    {/* <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            onClick={() => onSubmit(navigate)}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => navigate("/signup")}
                            className="f6 link dim black db pointer"
                        >Register</p>
                    </div> */}
                </div>
            </main>
        </article>
    )
}

export default Signin