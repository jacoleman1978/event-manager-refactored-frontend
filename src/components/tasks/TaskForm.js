import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import EventDataService from "../../services/eventDataService";
import GroupDataService from "../../services/groupDataService";
import getDefaultDate from "../../helpers/getDefaultDate";
import getDefaultTime from "../../helpers/getDefaultTime";
import getDefaultViewPath from "../../helpers/getDefaultViewPath";
import Title from "../form/Title";
import Priority from "../form/Priority";
import AllDaySwitch from "../form/AllDaySwitch";
import DateRange from "../form/DateRange";
import TimeRange from "../form/TimeRange";
import Groups from "../form/Groups";
import Notes from "../form/Notes";

const TaskForm = (props) => {
    const { eventId } = useParams();

    const navigate = useNavigate();

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

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = async (e) => {
        e.preventDefault()
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
            notes: formNotes,
            lastUpdated: new Date()
        }

        if (isEdit) {
            EventDataService.UpdateEvent(data, eventId);

            let navPath = await getDefaultViewPath()
            
            navigate(navPath);
        } else {
            EventDataService.AddEvent(data);
            
            let navPath = await getDefaultViewPath();
            
            navigate(navPath);
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
                    setAllDay(task.allDay.isIt);
                    setStartDate(task.allDay.startDate);
                    setEndDate(task.allDay.endDate);
                    setStartTime(task.allDay.startTime);
                    setEndTime(task.allDay.endTime);
                    setNotes(task.notes);
                    setGroups(task.groupIds);
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

    return (
        <div>
            {isEdit ? <p className="title">Edit Task</p> : <p className="title">New Task</p>}
            <Form onSubmit={handleSubmit} className="new-doc-container">
                <Form.Group controlId="formTask" className="flex-left-center-wrap">
                    <Title formTitle={formTitle} setTitle={setTitle} label={"Task Title: "}/>
    
                    <Priority formPriority={formPriority} setPriority={setPriority} label={"Priority: "} />

                </Form.Group>

                <Form.Group controlId="formDueDate" className="flex-col-center-left">
                    <AllDaySwitch formAllDay={formAllDay} setAllDay={setAllDay} />

                    <DateRange formStartDate={formStartDate} setStartDate={setStartDate} formEndDate={formEndDate} setEndDate={setEndDate} />

                    {formAllDay === false ?  <TimeRange formStartTime={formStartTime} setStartTime={setStartTime} formEndTime={formEndTime} setEndTime={setEndTime} /> : ""}
                </Form.Group>

                <Groups groupEditList={groupEditList} formGroups={formGroups} setGroups={setGroups} label={"Groups to Add to Task: "} />
                    
                <Notes formNotes={formNotes} setNotes={setNotes} />

                <Button variant="primary" type="submit">
                    {isEdit ? "Save Edits" : "Create New Task"}
                </Button>
            </Form>
        </div>
        
    )
}

export default TaskForm;