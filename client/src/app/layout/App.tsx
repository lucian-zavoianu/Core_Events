import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IEvent } from "../models/event";
import Navbar from "../../features/nav/Navbar";
import EventsDashboard from "../../features/events/dashboard/EventsDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.filter(e => e.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedEvent(null);
    setEditMode(true);
  };

  const handleCreateEvent = (event: IEvent) => {
    setSubmitting(true);

    agent.Events.create(event)
      .then(() => {
        setEvents([...events, event]);
        setSelectedEvent(event);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditEvent = (event: IEvent) => {
    setSubmitting(true);

    agent.Events.update(event)
      .then(() => {
        setEvents([...events.filter(e => e.id !== event.id), event]);
        setSelectedEvent(event);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteEvent = (id: string) => {
    setSubmitting(true);

    agent.Events.delete(id)
      .then(() => {
        setEvents([...events.filter(e => e.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Events.list()
      .then(response => {
        let events: IEvent[] = [];
        response.forEach(event => {
          event.date = event.date.split(".")[0];
          events.push(event);
        });

        setEvents(events);
      })
      .then(() => setLoading(false));
  }, []); // [] Stops the component from entering a loop, as there is nothing to stop it from running every single time the component will render

  if (loading) return <LoadingComponent content="Loading Events..." />;

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
          deleteEvent={handleDeleteEvent}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
};

export default App;
