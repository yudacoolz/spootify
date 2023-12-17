import axios from "axios";
import AuthService from "./auth.service";

const baseUrl = process.env.REACT_APP_SPOTIFY_API_URL;

class Categories {

getCategories = async () => {
    await AuthService.getAccessToken();
    const accessToken = AuthService.state.accessToken; 
    console.log("token", accessToken);
    try {
    const response = await axios.get(
        `${baseUrl}/browse/categories`,
        {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        }
    );

    return response.data;
    } catch (error) {
    console.error('Error fetching categories:', error);
    }
};
}

export default new Categories();
