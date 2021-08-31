import React from "react";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../../api/auth";
import { newApolloClient, newApolloImageClient } from "../../api/apollo-client";
import { createItem, updateItem, pictureUpload, itemDetails } from "../../api/queries";
import { apiUrl } from "../../api/urls";


const CreateUpdateListItem = props => {

    const history = useHistory();

    if (!isLoggedIn()) {
        history.push('/sample/login');
    }

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState();
    const [itemId, setItemId] = React.useState(-1);
    const [imageUrl, setImageUrl] = React.useState("");
    const [imageObject, setImageObject] = React.useState(-1);

    React.useEffect(async () => {
        if (props.match.params.listItemId) {
            setItemId(parseInt(props.match.params.listItemId));
            if (imageObject === -1) {
                console.log('errror');
            }
            const client = newApolloClient();
            try {
                const itemDetailsResponse = await client.query({
                    query: itemDetails,
                    variables: {
                        id: parseInt(props.match.params.listItemId)
                    }
                });
                setTitle(itemDetailsResponse.data.itemDetails.title);
                setDescription(itemDetailsResponse.data.itemDetails.description);
                setImage(itemDetailsResponse.image);
            } catch {
                localStorage.removeItem('token');
                history.push('/sample/login');
            }
        }
    }, []);

    return (
        <div>
            <button onClick={() => { history.push('/sample/') }}>Home</button>
            <form onSubmit={async event => {
                event.preventDefault();
                console.log(title, description);
                const client = newApolloClient();
                var response;
                try {
                    if (props.match.params.listItemId) {
                        console.log('here');
                        response = await client.mutate({
                            mutation: updateItem,
                            variables: {
                                id: props.match.params.listItemId,
                                title,
                                description
                            }
                        });
                        setTitle(response.data.updateItem.listItem.title);
                        setDescription(response.data.updateItem.listItem.description);
                        history.push('/sample');
                        setTitle(response.data.updateItem.listItem.title);
                        setDescription(response.data.updateItem.listItem.description);
                    } else {
                        response = await client.mutate({
                            mutation: createItem,
                            variables: {
                                title,
                                description
                            }
                        });
                        setTitle(response.data.createItem.listItem.title);
                        setDescription(response.data.createItem.listItem.description);
                    }
                    history.push('/sample');
                } catch {
                    localStorage.removeItem('token');
                    history.push('/sample/login');
                }
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
                <input type="submit" value="Submit" />
            </form>
            {
                itemId === -1
                    ?
                    <div>Picture upload in update Item</div>
                    :
                    <form onSubmit={async event => {
                        event.preventDefault();
                        const imageClient = newApolloImageClient();
                        try {
                            const pictureUploadResponse = await imageClient.mutate({
                                mutation: pictureUpload,
                                variables: {
                                    id: parseInt(props.match.params.listItemId),
                                    image: imageObject
                                }
                            });
                            console.log(pictureUploadResponse.data);
                            setImage(pictureUploadResponse.data.image)
                        } catch {
                            localStorage.removeItem('token');
                            history.push('/sample/login');
                        }
                    }}>
                        <label>
                            Image:
                            <img height={200} src={imageUrl} />
                            <input type="file" onChange={event => setImageObject(event.target.files[0])} />
                        </label>
                        <input type="submit" value="Upload" />
                    </form>
            }
        </div >
    );
};

export default CreateUpdateListItem