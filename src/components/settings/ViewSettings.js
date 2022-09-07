import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SettingsDataService from "../../services/settingsDataService";
import DefaultEventsSelector from "./DefaultEventsSelector";
import DefaultTasksSelector from "./DefaultTasksSelector";
import DefaultLoginSelector from "./DefaultLoginSelector";

// Called from Settings.js
const ViewSettings = ({settings, setSettings}) => {
    let [formEventsView, setEventsView] = useState("");
    let [formTasksView, setTasksView] = useState("");
    let [formLoginView, setLoginView] = useState("");
    let [formStartWeek, setStartWeek] = useState("")

    useEffect(() => {
        if (settings !== "undefined" && settings !== null) {
            setEventsView(settings.views.events);
            setTasksView(settings.views.tasks);
            setLoginView(settings.views.login);
            setStartWeek(settings.views.startOfWeek);
        }
    }, [settings])

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            views: {
                events: formEventsView,
                tasks: formTasksView,
                login: formLoginView,
                startOfWeek: formStartWeek
            }
        }

        SettingsDataService.UpdateSettings(data).then(res => setSettings(res.data.settings));
    }
    return (
        <div className="group-container-no-set-width">
            <Form onSubmit={handleSubmit}>
                <DefaultEventsSelector setEventsView={setEventsView} formEventsView={formEventsView} />

                <DefaultTasksSelector setTasksView={setTasksView} formTasksView={formTasksView} />

                <DefaultLoginSelector setLoginView={setLoginView} formLoginView={formLoginView} />

                <Button variant="primary" type="submit">
                    Save View Defaults
                </Button>

            </Form>
        </div>
    )
}

export default ViewSettings;