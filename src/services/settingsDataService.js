import axios from "axios";

class SettingsDataService {
    static GetSettings(settingsId) {
        axios.defaults.withCredentials = true;
        return axios.get(`http://localhost:3100/settings/${settingsId}`)
    }

    static UpdateSettings(data, settingsId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/settings/${settingsId}`, data)
    }
}

export default SettingsDataService;