import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from "react";
import { Container } from "semantic-ui-react";
import { IEvent } from "../models/event";
import Navbar from "../../features/nav/Navbar";
import EventsDashboard from "../../features/events/dashboard/EventsDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import EventStore from "../stores/eventStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const eventStore = useContext(EventStore);

  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

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

  const handleDeleteEvent = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);

    agent.Events.delete(id)
      .then(() => {
        setEvents([...events.filter(e => e.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]); // [] Stops the component from entering a loop, as there is nothing to stop it from running every single time the component will render

  if (eventStore.loadingInitial) return <LoadingComponent content="Loading Events..." />;

  return (
    <Fragment>
      <Navbar />

      <Container style={{ marginTop: "100px" }}>
        <EventsDashboard
          setEditMode={setEditMode}
          setSelectedEvent={setSelectedEvent}
          editEvent={handleEditEvent}
          deleteEvent={handleDeleteEvent}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
