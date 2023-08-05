// api.js
const BASE_URL = "http://localhost:8080"; // Update this URL with your Spring Boot backend URL

export const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`);
    return response.json();
};

// Add other API calls as needed
