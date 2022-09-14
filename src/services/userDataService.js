import axios from "axios";

class UserDataService {
    static Login(data) {  
        axios.defaults.withCredentials = true
        return axios.post('https://event-manager-colmartason.herokuapp.com/auth/login', data)
    }

    static Signup(data) {
        axios.defaults.withCredentials = true
        return axios.post('https://event-manager-colmartason.herokuapp.com/auth/signup', data)
    }

    static IsSignupInfoUnique(data) {
        axios.defaults.withCredentials = true
        return axios.post('https://event-manager-colmartason.herokuapp.com/auth/signup/verify', data)
    }

    static CheckSessionUser() {
        axios.defaults.withCredentials = true
        return axios.get('https://event-manager-colmartason.herokuapp.com/auth/session')
    }

    static Logout() {
        axios.defaults.withCredentials = true
        return axios.get('https://event-manager-colmartason.herokuapp.com/auth/logout')
    }   

    static SearchUser(data) {
        axios.defaults.withCredentials = true
        return axios.post('https://event-manager-colmartason.herokuapp.com/auth/search', data)
    }

    static ChangePassword(data) {
        axios.defaults.withCredentials = true
        return axios.put('https://event-manager-colmartason.herokuapp.com/auth/changepassword', data)
    }
}

export default UserDataService;