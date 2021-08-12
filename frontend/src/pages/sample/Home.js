import React from "react";
import { useHistory } from "react-router-dom";


const Home = props => {
    const [list, setList] = React.useState([{ id: 1, title: "", description: "", image: "" }]);

    React.useEffect(() => {
        const _list = [{ id: 1, title: "t", description: "d", image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" }, { title: "t", description: "d", image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" }]
        setList(_list);
    }, []);

    const history = useHistory();

    return (
        <div>
            <button onClick={() => {history.push('/sample/create/new')}}>Create New Post</button>
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