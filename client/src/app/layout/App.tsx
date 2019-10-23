import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IEvent } from "../models/event";
import Navbar from "../../features/nav/Navbar";
import EventsDashboard from "../../features/events/dashboard/EventsDashboard";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.filter(e => e.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedEvent(null);
    setEditMode(true);
  };

  const handleCreateEvent = (event: IEvent) => {
    setEvents([...events, event]);
    setSelectedEvent(event);
    setEditMode(false);
  };

  const handleEditEvent = (event: IEvent) => {
    setEvents([...events.filter(e => e.id !== event.id), event]);
    setSelectedEvent(event);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<IEvent[]>("http://localhost:5000/api/events")
      .then((response: any) => {
        setEvents(response.data);
      });
  }, []); // [] Stops the component from entering a loop, as there is nothing to stop it from running every single time the component will render

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />

      <Container style={{ marginTop: "100px" }}>
        <EventsDashboard
          events={events}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedEvent={setSelectedEvent}
          createEvent={handleCreateEvent}
          editEvent={handleEditEvent}
        />
      </Container>
    </Fragment>
  );
};

export default App;
