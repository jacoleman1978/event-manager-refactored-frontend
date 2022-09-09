import axios from "axios";

class EventDataService {
    static GetTasks() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/event/tasks')
    }

    static AddEvent(data) {
        axios.defaults.withCredentials = true;
        return axios.post('http://localhost:3100/event/new', data)
    }

    static UpdateEvent(data, eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/event/${eventId}/update/info`, data)
    }

    static AddGroupToEvent(data, eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/event/${eventId}/update/addgroup`, data)
    }

    static RemoveGroupFromEvent(data, eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/event/${eventId}/update/removegroup`, data)
    }

    static DeleteEvent(eventId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`http://localhost:3100/event/${eventId}`)
    }

    static GetEvents() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/event/all')
    }

    static GetEventById(eventId) {
        axios.defaults.withCredentials = true;
        return axios.get(`http://localhost:3100/event/${eventId}`)
    }  

    static GetUserGroupEvents() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/event/userGroupEvents')
    }

    static GetCompletedTasks() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/event/tasks/completed')
    }

    static CompleteTask(eventId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/event/${eventId}/complete`)
    }
}

export default EventDataService;