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
        return axios.put(`http://localhost:3100/geoup/${groupId/acceptinvite}`, data)
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

    static GetOwnedGroups(data) {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:3100/group/owner', data)
    }
}

export default GroupDataService;