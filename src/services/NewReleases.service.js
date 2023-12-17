import axios from "axios";
import AuthService from "./auth.service";

const baseUrl = process.env.REACT_APP_SPOTIFY_API_URL;

class NewReleases {

getNewReleases = async () => {
    await AuthService.getAccessToken();
    const accessToken = AuthService.state.accessToken; 
    console.log("token", accessToken);
    try {
    const response = await axios.get(
        `${baseUrl}/browse/new-releases`,
        {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        }
    );

    return response.data;
    } catch (error) {
    console.error('Error fetching new releases:', error);
    }
};
}

export default new NewReleases();
