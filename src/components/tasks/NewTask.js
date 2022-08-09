import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import EventDataService from "../../services/eventDataService";
import GroupDataService from "../../services/groupDataService";
import getDefaultDate from "../../helpers/getDefaultDate";
import getDefaultTime from "../../helpers/getDefaultTime";

const NewTask = (props) => {
    const { eventId } = useParams();

    // Get props
    let {settings, isEdit} = props;

    // Use state to keep track of info entered into the form
    let [formTitle, setTitle] = useState("");
    let [formPriority, setPriority] = useState("");
    let [formAllDay, setAllDay] = useState(true);
    let [formStartDate, setStartDate] = useState("");
    let [formEndDate, setEndDate] = useState("");
    let [formStartTime, setStartTime] = useState("");
    let [formEndTime, setEndTime] = useState("");
    let [formGroups, setGroups] = useState([]);
    let [formNotes, setNotes] = useState("");
    let [groupEditList, setGroupEditList] = useState([]);
    let [checkedGroupIds, setCheckedGroupIds] = useState([]);

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

        console.log(data)

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
                        defaultValue={formStartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <div className="flex-left-center-no-gap">
                    <Form.Label className="form-label">End Time: </Form.Label>
                    <Form.Control 
                        type="time" 
                        required 
                        className="dropdown-width"
                        defaultValue={formEndTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
            </div>
        )
    }

    const handleGroupCheck = (e) => {
        if (e.target.checked === true) {
            setGroups(formGroups => [...formGroups, e.target.id]);
            setCheckedGroupIds(checkedGroupIds => [...checkedGroupIds, e.target.id])
        } else {
            setGroups(formGroups => formGroups.filter((group) => {
                return group !== e.target.id
            }))
            setCheckedGroupIds(checkedGroupIds => checkedGroupIds.filter((group) => {
                return group !== e.target.id
            }))
        }
    }

    useEffect(() => {
        GroupDataService.GetGroupsCanEdit().then(res => {
            setGroupEditList(res.data.groupsCanEdit)

            if (isEdit) {
                EventDataService.GetEventById(eventId).then(res => {
                    let task = res.data.eventDoc
                    setTitle(task.title);
                    setPriority(task.task.priority);
                    setAllDay(task.allDay);
                    setStartDate(task.allDay.startDate);
                    setEndDate(task.allDay.endDate);
                    setStartTime(task.allDay.startTime);
                    setEndTime(task.allDay.endTime);
                    setNotes(task.notes);
                    setCheckedGroupIds(task.groupIds);
                })
            } else {
                setPriority(settings.task.priority);
                setAllDay(settings.allDay.isIt);
                setStartDate(getDefaultDate(settings.allDay.startDate));
                setEndDate(getDefaultDate(settings.allDay.endDate));
                setStartTime(getDefaultTime(settings.allDay.startTime));
                setEndTime(getDefaultTime(settings.allDay.endTime));
            }
        });
    }, [])

    let groupList = groupEditList.map((group) => {
        let isChecked = false;

        if (checkedGroupIds.indexOf(group._id) > -1) {
            isChecked = true;
        }
        return (
            <Form.Check
                key={group._id}
                type="checkbox"
                label={group.name}
                name="groups-can-edit"
                checked={isChecked}
                id={group._id}
                onChange={(e) => handleGroupCheck(e)}
            />
        )
    })

    return (
        <div>
            {isEdit ? <p className="title">Edit Task</p> : <p className="title">New Task</p>}
            <Form onSubmit={handleSubmit} className="new-doc-container">
                <Form.Group controlId="formTask" className="flex-left-center-wrap">
                    <div className="flex-left-center-no-gap">
                        <Form.Label>Task Title: </Form.Label>
                        <Form.Control
                            className="input-width"
                            required
                            type="text"
                            defaultValue={formTitle}
                            aria-describedby="Enter task title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
    
                    <div className="flex-left-center-no-gap">
                        <Form.Label>Priority: </Form.Label>
                        <Form.Select 
                            aria-label="Select a priority" 
                            required 
                            className="dropdown-width"
                            value={formPriority}
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
                                defaultValue={formStartDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="flex-left-center-no-gap">
                            <Form.Label className="form-label">End Date: </Form.Label>
                            <Form.Control 
                                type="date" 
                                required 
                                className="dropdown-width"
                                defaultValue={formEndDate}
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
                        defaultValue={formNotes}
                        onChange={(e) => setNotes(e.target.value)}
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