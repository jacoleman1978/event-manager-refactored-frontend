import axios from "axios";

class TagDataService {
    static NewTag(data) {
        axios.defaults.withCredentials = true;
        return axios.post('https://event-manager-colmartason.herokuapp.com/tag/new', data)
    }

    static GetEventsByTagId(data, tagId) {
        axios.defaults.withCredentials = true;
        return axios.get(`https://event-manager-colmartason.herokuapp.com/tag/${tagId}`, data)
    }
}

export default TagDataService;