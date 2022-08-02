import axios from "axios";

class UserDataService {
    static Login(data) {  
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/login', data)
    }

    static Signup(data) {
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/signup', data)
    }

    static IsSignupInfoUnique(data) {
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/signup/verify', data)
    }

    static CheckSessionUser() {
        axios.defaults.withCredentials = true
        return axios.get('http://localhost:3100/auth/session')
    }

    static Logout() {
        axios.defaults.withCredentials = true
        return axios.get('http://localhost:3100/auth/logout')
    }   

    static SearchUser(data) {
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/search', data)
    }

    static ChangePassword(data) {
        axios.defaults.withCredentials = true
        return axios.put('http://localhost:3100/auth/changepassword', data)
    }
}

export default UserDataService;