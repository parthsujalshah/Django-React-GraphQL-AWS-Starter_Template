import React from "react";
import { useHistory } from "react-router-dom";
import { loginMutation } from "../../api/queries";
import { newApolloClient } from "../../api/apollo-client";
import { loginAllowed, isLoggedIn } from "../../api/auth";


const Login = props => {

    const history = useHistory();

    if (isLoggedIn()) {
        history.push('/sample');
    }

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div>
            <button onClick={() => history.push('/sample/register')}>Register</button>
            <form onSubmit={async event => {
                event.preventDefault();
                console.log(username, password);
                const client = newApolloClient();
                const loginMutationResponse = await client.mutate({
                    mutation: loginMutation,
                    variables: {
                        username,
                        password
                    }
                });
                if (loginAllowed(loginMutationResponse.data.tokenAuth.token)) {
                    localStorage.setItem('token', loginMutationResponse.data.tokenAuth.token);
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
                    Password:
                    <input type="password" value={password} onChange={event => {
                        setPassword(event.target.value);
                    }} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Login;