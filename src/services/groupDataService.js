import axios from "axios";

class GroupDataService {
    static NewGroup(data) {
        axios.defaults.withCredentials = true;
        return axios.post('https://event-manager-colmartason.herokuapp.com/group/new', data)
    }

    static InviteGroupMember(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/group/invite`, data)
    }

    static RemoveGroupMember(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/group/removemember`, data)
    }

    static AcceptGroupInvite(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/group/acceptinvite`, data)
    }

    static ChangeEditPrivilege(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/group/membertype`, data)
    }

    static ChangeGroupName(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://event-manager-colmartason.herokuapp.com/group/name`, data)
    }

    static DeleteGroup(groupId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`https://event-manager-colmartason.herokuapp.com/group/${groupId}`)
    }

    static GetGroupById(groupId) {
        axios.defaults.withCredentials = true;
        return axios.get(`https://event-manager-colmartason.herokuapp.com/group/${groupId}`)
    }

    static GetOwnedGroups() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/group/owner')
    }

    static GetGroupMemberships() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/group/memberships')
    }

    static GetGroupInvitations() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/group/invitations')
    }

    static GetGroupsCanEdit() {
        axios.defaults.withCredentials = true;
        return axios.get('https://event-manager-colmartason.herokuapp.com/group/canedit')
    }
}

export default GroupDataService;