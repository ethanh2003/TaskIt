
const BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
};


