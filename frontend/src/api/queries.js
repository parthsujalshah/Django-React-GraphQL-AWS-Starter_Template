import { gql } from "@apollo/client";


export const registrationMutation = gql`
mutation($email: String! $username: String! $password1: String! $password2: String!){
    register(email: $email username: $username password1: $password1 password2: $password2) {
        token
        refreshToken
        success
        errors
    }
}
`;

export const loginMutation = gql`
mutation($username: String! $password: String!){
    tokenAuth(username: $username password: $password){
        token
        success
        errors
        refreshToken
    }
}
`;

export const allItemsByUser = gql`
query{
    allItemsByUser{
        id
        title
        description
        image
    }
}
`;

export const itemDetails = gql`
query($id: Int!){
    authorPosts(id: $id){
        id
        title
        description
        image
    }
}
`;

export const createItem = gql`
mutation($title: String! $description: String!){
    createItem(title: $title description: $description){
        listItem{
            id
            title
            description
        }
    }
}
`;

export const updateItem = gql`
mutation($title: String! $description: String!){
    updateItem(title: $title description: $description){
        listItem{
            id
            title
            description
        }
    }
}
`;

export const deleteItem = gql`
mutation($id: Int1){
    deleteItem(id: $id){
        listItem{
            id
        }
    }
}
`;

export const pictureUpload = gql`
mutation($id: Int! $image: Upload!){
    pictureUpload(id: $Int image: $image){
        listItem{
            image
        }
    }
}
`;