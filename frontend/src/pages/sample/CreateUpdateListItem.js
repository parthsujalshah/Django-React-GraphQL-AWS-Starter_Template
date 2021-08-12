import React from "react";


const CreateUpdateListItem = props => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");

    React.useEffect(() => {
        if (props.match.params.listItemId) {
            const itemDetails = {
                title: "t",
                description: "d",
                image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
            setTitle(itemDetails.title);
            setDescription(itemDetails.description);
            setImage(itemDetails.image);
        }
    }, []);

    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault();
                console.log(title, description, image);
            }}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={event => {
                        setTitle(event.target.value);
                    }} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={event => {
                        setDescription(event.target.value);
                    }} />
                </label>
                <label>
                    Image:
                    <img height={20} src={image} />
                    <input type="file" onChange={event => setImage(event.target.files[0])} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreateUpdateListItem