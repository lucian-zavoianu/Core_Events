import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import EventsDashboard from "../../features/events/dashboard/EventsDashboard";
import LoadingComponent from "./LoadingComponent";
import EventStore from "../stores/eventStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";

const App = () => {
  const eventStore = useContext(EventStore);

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]); // [] Stops the component from entering a loop, as there is nothing to stop it from running every single time the component will render

  if (eventStore.loadingInitial) return <LoadingComponent content="Loading Events..." />;

  return (
    <Fragment>
      <Navbar />

      <Container style={{ marginTop: "100px" }}>
        <Route exact path='/' component = { HomePage } />
        <Route exact path='/events' component = { EventsDashboard } />
        <Route path='/events/:id' component = { EventDetails } />
        <Route path='/createEvent' component = { EventForm } />
      </Container>
    </Fragment>
  );
};

export default observer(App);
