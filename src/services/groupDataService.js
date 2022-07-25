import axios from "axios";

class GroupDataService {
    static NewGroup(data) {
        axios.defaults.withCredentials = true;
        return axios.post('http://localhost:3100/group/new', data)
    }

    static InviteGroupMember(data, groupId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/${groupId}/invite`, data)
    }

    static RemoveGroupMember(data, groupId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/${groupId}/removemember`, data)
    }

    static AcceptGroupInvite(data, groupId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/${groupId}/acceptinvite`, data)
    }

    static ChangeEditPrivilege(data, groupId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/${groupId}/membertype`, data)
    }

    static ChangeGroupName(data, groupId) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/${groupId}/name`, data)
    }

    static DeleteGroup(data, groupId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`http://localhost:3100/group/${groupId}`, data)
    }

    static GetOwnedGroups() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/group/owner')
    }

    static GetGroupMemberships() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/group/memberships')
    }

    static GetGroupInvitations() {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/group/invitations')
    }
}

export default GroupDataService;