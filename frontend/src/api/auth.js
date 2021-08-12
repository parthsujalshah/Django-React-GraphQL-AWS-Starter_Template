export const isLoggedIn = () => {
    const authToken = localStorage.getItem('token')
    if (authToken !== null && authToken !== undefined && authToken !== "") {
        return true;
    }
    return false;
};

export const loginAllowed = authToken => {
    if (authToken !== null && authToken !== undefined && authToken !== "") {
        return true;
    }
    return false;
};