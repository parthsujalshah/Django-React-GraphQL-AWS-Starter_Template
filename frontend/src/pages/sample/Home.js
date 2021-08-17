import React from "react";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../../api/auth";
import { allItemsByUser } from "../../api/queries";
import { newApolloClient } from "../../api/apollo-client";


const Home = props => {

    const history = useHistory();

    if (!isLoggedIn()) {
        history.push('/sample/login');
    }

    const [list, setList] = React.useState([{ id: 1, title: "", description: "", image: "" }]);

    React.useEffect(async () => {
        const client = newApolloClient();
        try {
            const allItemsByUserResponse = await client.query({
                query: allItemsByUser,
            });
            setList(allItemsByUserResponse.data.allItemsByUser);
        } catch {
            localStorage.removeItem('token');
            history.push('/sample/login');
        }
    }, []);

    return (
        <div>
            <button onClick={() => {
                localStorage.removeItem('token');
                history.push('/sample/login');
            }}>Logout</button>
            <button onClick={() => { history.push('/sample/create/new') }}>Create New Post</button>
            {list.map((listItem, index) => (
                <div style={{ backgroundColor: "c9c9c9", marginBottom: 20 }}>
                    <p>Title: {listItem.title}</p>
                    <p>Description: {listItem.description}</p>
                    <img height={40} src={listItem.image} />
                    <br />
                    <button onClick={() => { history.push(`/sample/update/${listItem.id}`) }}>Edit</button>
                    <button onClick={() => {
                        
                        console.log('deleted');
                    }}>Delete</button>
                    <br />
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Home;