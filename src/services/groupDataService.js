import axios from "axios";

class GroupDataService {
    static NewGroup(data) {
        axios.defaults.withCredentials = true;
        return axios.post('http://localhost:3100/group/new', data)
    }

    static InviteGroupMember(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/invite`, data)
    }

    static RemoveGroupMember(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/removemember`, data)
    }

    static AcceptGroupInvite(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/acceptinvite`, data)
    }

    static ChangeEditPrivilege(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/membertype`, data)
    }

    static ChangeGroupName(data) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:3100/group/name`, data)
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