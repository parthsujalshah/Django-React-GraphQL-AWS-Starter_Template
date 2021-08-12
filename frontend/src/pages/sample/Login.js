import React from "react";
import { useHistory } from "react-router-dom";


const Login = props => {

    const history = useHistory();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <div>
            <button onClick={() => history.push('/sample/register')}>Register</button>
            <form onSubmit={event => {
                event.preventDefault();
                console.log(username, password);
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