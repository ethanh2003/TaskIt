
const BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`);
    return response.json();
};


