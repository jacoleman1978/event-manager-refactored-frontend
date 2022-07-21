import axios from "axios";

class TagDataService {
    static NewTag(data) {
        axios.defaults.withCredentials = true;
        return axios.post('http://localhost:3100/tag/new', data)
    }

    static GetEventsByTagId(data, tagId) {
        axios.defaults.withCredentials = true;
        return axios.get(`http://localhost:3100/tag/${tagId}`, data)
    }
}

export default TagDataService;