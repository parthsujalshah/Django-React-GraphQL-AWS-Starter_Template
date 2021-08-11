import React from "react";


const Home = props => {
    const [list, setList] = React.useState([{title: "", description: "", image: ""}]);

    React.useEffect(() => {
        const _list = [{title: "t", description: "d", image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}, {title: "t", description: "d", image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}]
        setList(_list);
    }, []);

    return (
        <div>
            {list.map((listItem, index) => (
                <div style={{backgroundColor: "c9c9c9", marginBottom: 20}}>
                    <p>Title: {listItem.title}</p>
                    <p>Description: {listItem.description}</p>
                    <img height={40} src={listItem.image} />
                </div>
            ))}
        </div>
    );
};

export default Home;