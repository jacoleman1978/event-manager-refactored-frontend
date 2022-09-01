/*
-onChange handler of checkboxes
-Adds the userId to addId if a user's remove box is checked.
-Adds the userId to removeId if a user's box is unchecked.
-Returns the checkboxAction object.
*/
const handleCheckboxChange = (userId, e) => {
    let checkboxAction = {
        addId: "",
        removeId: ""
    }

    if (e.target.checked === true) {
        checkboxAction.addId = userId;

    } else if (e.target.checked === false) {
        checkboxAction.removeId = userId;
    }

    return checkboxAction
}

export default handleCheckboxChange;