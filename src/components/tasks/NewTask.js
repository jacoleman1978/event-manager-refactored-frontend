import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EventDataService from "../../services/eventDataService";
import GroupDataService from "../../services/groupDataService";

const NewTask = (props) => {
    // Get props
    let {settings} = props;

    // Use state to keep track of info entered into the form
    let [formTitle, setTitle] = useState("");
    let [formPriority, setPriority] = useState(settings.task.priority);
    let [formAllDay, setAllDay] = useState(settings.allDay.isIt);
    let [formStartDate, setStartDate] = useState(new Date());
    let [formEndDate, setEndDate] = useState(new Date());
    let [formStartTime, setStartTime] = useState(null);
    let [formEndTime, setEndTime] = useState(null);
    let [formGroups, setGroups] = useState([]);
    let [formNotes, setNotes] = useState("");
    let [groupEditList, setGroupEditList] = useState([]);

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        let data = {
            title: formTitle,
            task: {
                isIt: true,
                priority: formPriority
            },
            allDay: {
                isIt: formAllDay,
                startDate: formStartDate,
                endDate: formEndDate,
                startTime: formStartTime,
                endTime: formEndTime
            },
            recurring: {
                isIt: false
            },
            groupIds: formGroups,
            notes: formNotes
        }

        EventDataService.AddEvent(data);
    }

    const timeRangeTask = () => {
        return (
            <div className="flex-left-center-wrap">
                <div className="flex-left-center-no-gap">
                    <Form.Label className="form-label">Start Time: </Form.Label>
                    <Form.Control 
                        type="time" 
                        required 
                        className="dropdown-width"
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <div className="flex-left-center-no-gap">
                    <Form.Label className="form-label">End Time: </Form.Label>
                    <Form.Control 
                        type="time" 
                        required 
                        className="dropdown-width"
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
            </div>
        )
    }

    const handleGroupCheck = (e) => {
        if (e.target.checked === true) {
            setGroups(formGroups => [...formGroups, e.target.id]);
        } else {
            setGroups(formGroups => formGroups.filter((group) => {
                return group !== e.target.id
            }))
        }
    }

    GroupDataService.GetGroupsCanEdit().then(res => setGroupEditList(res.data.groupsCanEdit));

    let groupList = groupEditList.map((group) => {
        return (
            <Form.Check
                key={group._id}
                type="checkbox"
                label={group.name}
                name="groups-can-edit"
                id={group._id}
                onChange={(e) => handleGroupCheck(e)}
            />
        )
    })

    return (
        <div>
            <p className="title">New Task</p>
            <Form onSubmit={handleSubmit} className="new-doc-container">
                <Form.Group controlId="formTask" className="flex-left-center-wrap">
                    <div className="flex-left-center-no-gap">
                        <Form.Label>Task Title: </Form.Label>
                        <Form.Control
                            className="input-width"
                            required
                            type="text"
                            aria-describedby="Enter task title"
                            placeholder="Enter task title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
    
                    <div className="flex-left-center-no-gap">
                        <Form.Label>Priority: </Form.Label>
                        <Form.Select 
                            aria-label="Select a priority" 
                            required 
                            className="dropdown-width"
                            defaultValue={formPriority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="" disabled>Select a priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </Form.Select>
                    </div>

                </Form.Group>

                <Form.Group controlId="formDueDate" className="flex-col-center-left">
                    <div className="flex-left-center-wrap">
                        <Form.Check 
                            type="switch"
                            id="is-all-day"
                            label="All Day"
                            checked={formAllDay}
                            onChange={() => setAllDay(!formAllDay)}
                        />
                    </div>

                    <div className="flex-left-center-wrap">
                        <div className="flex-left-center-no-gap">
                            <Form.Label className="form-label">Start Date: </Form.Label>
                            <Form.Control 
                                type="date" 
                                required 
                                className="dropdown-width"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="flex-left-center-no-gap">
                            <Form.Label className="form-label">End Date: </Form.Label>
                            <Form.Control 
                                type="date" 
                                required 
                                className="dropdown-width"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {formAllDay === false ? timeRangeTask() : ""}
                </Form.Group>

                <Form.Group controlId="formTask" >
                    <Form.Label>Groups to Add to Task: </Form.Label>
                    <div className="checkbox-list">
                        
                        {groupList}
                    </div>
                </Form.Group>
                    
                <Form.Group controlId="formNotes" className="flex-left-center-wrap">
                    <Form.Label className="form-label">Notes: </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        aria-describedby="Enter more details about task"
                        className="input-width"
                        placeholder="(Optional) Enter details about the task" 
                        onChange={(e) => setNotes(e.target.value)}
                        value={formNotes}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create New Task
                </Button>
            </Form>
        </div>
        
    )
}

export default NewTask;