import React from "react";


const Register = props => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault();
                console.log(username, password, confirmPassword);
            }}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={event => {
                        setUsername(event.target.value);
                    }}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => {
                        setPassword(event.target.value);
                    }}/>
                </label>
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={event => {
                        setConfirmPassword(event.target.value);
                    }}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Register;