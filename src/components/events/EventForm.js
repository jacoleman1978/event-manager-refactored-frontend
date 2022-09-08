import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import EventDataService from "../../services/eventDataService";
import GroupDataService from "../../services/groupDataService";
import getDefaultDate from "../../helpers/getDefaultDate";
import getDefaultTime from "../../helpers/getDefaultTime";
import getDefaultViewPath from "../../helpers/getDefaultViewPath";
import Title from "../form/Title";
import AllDaySwitch from "../form/AllDaySwitch";
import DateRange from "../form/DateRange";
import TimeRange from "../form/TimeRange";
import Groups from "../form/Groups";
import Notes from "../form/Notes";

const EventForm = ({settings, isEdit}) => {
    const { eventId } = useParams();

    const navigate = useNavigate();

    // Use state to keep track of info entered into the form
    let [formTitle, setTitle] = useState("");
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
                isIt: false,
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
            
            //navigate(navPath);
        }
    }

    useEffect(() => {
        GroupDataService.GetGroupsCanEdit().then(res => {
            setGroupEditList(res.data.groupsCanEdit)

            if (isEdit) {
                EventDataService.GetEventById(eventId).then(res => {
                    let event = res.data.eventDoc
                    setTitle(event.title);
                    setAllDay(event.allDay.isIt);
                    setStartDate(event.allDay.startDate);
                    setEndDate(event.allDay.endDate);
                    setStartTime(event.allDay.startTime);
                    setEndTime(event.allDay.endTime);
                    setNotes(event.notes);
                    setGroups(event.groupIds);
                })
            } else {
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
            {isEdit ? <p className="title">Edit Event</p> : <p className="title">New Event</p>}
            <Form onSubmit={handleSubmit} className="outline small-top-margin">
                <Form.Group controlId="formEvent" className="week-wrapper">
                    <Title formTitle={formTitle} setTitle={setTitle} label={"Event Title: "}/>

                </Form.Group>

                <Form.Group controlId="formDueDate" className="week-wrapper">
                    <AllDaySwitch formAllDay={formAllDay} setAllDay={setAllDay} />

                    <DateRange formStartDate={formStartDate} setStartDate={setStartDate} formEndDate={formEndDate} setEndDate={setEndDate} formAllDay={formAllDay} />

                    {formAllDay === false ?  <TimeRange formStartTime={formStartTime} setStartTime={setStartTime} formEndTime={formEndTime} setEndTime={setEndTime} /> : ""}
                </Form.Group>

                <div className="week-wrapper">
                    <Groups groupEditList={groupEditList} formGroups={formGroups} setGroups={setGroups} label={"Groups to Add to Event: "} />
                </div>
                
                <div className="week-wrapper">
                    <Notes formNotes={formNotes} setNotes={setNotes} />
                </div>
                
                <Button variant="primary" type="submit" className="align-self bottom-margin">
                    {isEdit ? "Save Edits" : "Create New Event"}
                </Button>
            </Form>
        </div>
        
    )
}

export default EventForm;