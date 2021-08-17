import React from "react";
import { useHistory } from "react-router-dom";
import { newApolloClient } from "../../api/apollo-client";
import { registrationMutation } from "../../api/queries";
import { loginAllowed, isLoggedIn } from "../../api/auth";


const Register = props => {

    const history = useHistory();

    if (isLoggedIn()) {
        history.push('/sample');
    }

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    return (
        <div>
            <button onClick={() => history.push('/sample/login')}>Login</button>
            <form onSubmit={async event => {
                event.preventDefault();
                console.log(username, password, confirmPassword);
                const client = newApolloClient();
                const registrationMutationResponse = await client.mutate({
                    mutation: registrationMutation,
                    variables: {
                        username: username,
                        email: email,
                        password1: password,
                        password2: confirmPassword,
                    }
                });
                console.log(registrationMutationResponse.data.register.token);
                console.log(loginAllowed(registrationMutationResponse.data.register.token));
                if (loginAllowed(registrationMutationResponse.data.register.token)) {
                    localStorage.setItem('token', registrationMutationResponse.data.register.token);
                    history.push('/sample');
                }
            }}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={event => {
                        setUsername(event.target.value);
                    }} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={event => {
                        setEmail(event.target.value);
                    }} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => {
                        setPassword(event.target.value);
                    }} />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={event => {
                        setConfirmPassword(event.target.value);
                    }} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Register;