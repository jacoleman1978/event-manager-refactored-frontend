import axios from "axios";

class EventDataService {
    static GetTasks() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/event/tasks')
    }

    static AddEvent(data) {
        axios.defaults.withCredentials = true;
        return axios.post('https://event-manager-colmartason.herokuapp.com/event/new', data)
    }

    static UpdateEvent(data, eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/event/${eventId}/update/info`, data)
    }

    static AddGroupToEvent(data, eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/event/${eventId}/update/addgroup`, data)
    }

    static RemoveGroupFromEvent(data, eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/event/${eventId}/update/removegroup`, data)
    }

    static DeleteEvent(eventId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`https://event-manager-colmartason.herokuapp.com/event/${eventId}`)
    }

    static GetEvents() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/event/all')
    }

    static GetEventById(eventId) {
        axios.defaults.withCredentials = true;
        return axios.get(`https://event-manager-colmartason.herokuapp.com/event/${eventId}`)
    }  

    static GetUserGroupEvents() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/event/userGroupEvents')
    }

    static GetCompletedTasks() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/event/tasks/completed')
    }

    static CompleteTask(eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/event/${eventId}/complete`)
    }
}

export default EventDataService;