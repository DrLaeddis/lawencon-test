import axios from "axios"
import { apiKey, url } from "../../baseUrl"

export const SearchFilm = async(value, page = 1) => {
    try {
        const response = await axios(url + apiKey + "&s=" + value + "&page=" + page);
        if (response.data && response.data.Error) {
            return { error: response.data.Error };
        } else {
            return response.data.Search || [];
        }
    } catch (error) {
        throw error;
    }
}