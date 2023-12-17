import axios from "axios";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

class AuthService {
    constructor() {
        this.state = {
            accessToken: null,
        };
        }

        setAccessToken = (accessToken) => {
        this.state = {
            accessToken,
        };
        };

getAccessToken = async () => {
    try {
    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        }
    );

    this.setAccessToken(response.data.access_token);
    } catch (error) {
    console.error('Error fetching access token:', error);
    }
};
}

export default new AuthService();
