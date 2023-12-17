import axios from "axios";
import AuthService from "./auth.service";

const baseUrl = process.env.REACT_APP_SPOTIFY_API_URL;

class FeaturedPlaylist {

getFeaturedPlaylist = async () => {
    await AuthService.getAccessToken();
    const accessToken = AuthService.state.accessToken; 
    console.log("token", accessToken);
    try {
    const response = await axios.get(
        `${baseUrl}/browse/featured-playlists`,
        {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        }
    );

    return response.data;
    } catch (error) {
    console.error('Error fetching featured playlist:', error);
    }
};
}

export default new FeaturedPlaylist();
