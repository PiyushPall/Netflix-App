import axios from "axios";

const API_URL = "http://localhost:3000/api/home";

export const getProfiles = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};