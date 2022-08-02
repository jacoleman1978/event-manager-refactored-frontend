import axios from "axios";

class SettingsDataService {
    static GetSettings() {
        axios.defaults.withCredentials = true;
        return axios.get(`http://localhost:3100/settings/`)
    }

    static UpdateSettings(data) {
        console.log(data)
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/settings/`, data)
    }
}

export default SettingsDataService;