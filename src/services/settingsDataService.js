import axios from "axios";

class SettingsDataService {
    static GetSettings() {
        axios.defaults.withCredentials = true;
        return axios.get(`https://event-manager-colmartason.herokuapp.com/settings/`)
    }

    static UpdateSettings(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/settings/`, data)
    }
}

export default SettingsDataService;