import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SettingsDataService from "../../services/settingsDataService";
import DefaultAllDayRadio from "./DefaultAllDayRadio";
import DefaultStartDateSelector from "./DefaultStartDateSelector";
import DefaultEndDateSelector from "./DefaultEndDateSelector";
import DefaultStartTimeSelector from "./DefaultStartTimeSelector";
import DefaultEndTimeSelector from "./DefaultEndTimeSelector";
import DefaultTaskPriority from "./DefaultTaskPriority";

// Called from Settings.js
// Display container for event settings, maintaining event settings state
const EventSettings = ({ settings, setSettings }) => {
    let [formIsAllDay, setAllDay] = useState(false);
    let [formStartDate, setStartDate] = useState("");
    let [formEndDate, setEndDate] = useState("");
    let [formStartTime, setStartTime] = useState("");
    let [formEndTime, setEndTime] = useState("");
    let [formTaskPriority, setPriority] = useState("");

    // Set settings state once the settings document has been loaded
    useEffect(() => {
        if (settings !== "undefined" && settings !== null) {
            setAllDay(settings.allDay.isIt);
            setStartDate(settings.allDay.startDate);
            setEndDate(settings.allDay.endDate);
            setStartTime(settings.allDay.startTime);
            setEndTime(settings.allDay.endTime);
            setPriority(settings.task.priority);
        }
    }, [settings])

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            task: {
                priority: formTaskPriority
            },
            allDay: {
                isIt: formIsAllDay,
                startDate: formStartDate,
                endDate: formEndDate,
                startTime: formStartTime,
                endTime: formEndTime
            }
        }
        
        SettingsDataService.UpdateSettings(data).then(res => setSettings(res.data.settings));
    }
    return (
        <div className="group-container-no-set-width">
            <Form onSubmit={handleSubmit}>

                <DefaultAllDayRadio setAllDay={setAllDay} formIsAllDay={formIsAllDay} />

                <DefaultStartDateSelector setStartDate={setStartDate} formStartDate={formStartDate} />

                <DefaultEndDateSelector setEndDate={setEndDate} formEndDate={formEndDate} />

                <DefaultStartTimeSelector setStartTime={setStartTime} formStartTime={formStartTime} />

                <DefaultEndTimeSelector setEndTime={setEndTime} formEndTime={formEndTime} />

                <DefaultTaskPriority setPriority={setPriority} formTaskPriority={formTaskPriority} />

                <Button variant="primary" type="submit">
                    Save Event Defaults
                </Button>

            </Form>
        </div>
    )
}

export default EventSettings;