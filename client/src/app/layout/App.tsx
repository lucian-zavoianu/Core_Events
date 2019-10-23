import React, { useState, useEffect, Fragment } from "react";
import { List, Container } from "semantic-ui-react";
import axios from "axios";
import { IEvent } from "../models/event";
import Navbar from "../../features/nav/Navbar";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios
      .get<IEvent[]>("http://localhost:5000/api/events")
      .then((response: any) => {
        setEvents(response.data);
      });
  }, []); // [] Stops the component from entering a loop, as there is nothing to stop it from running every single time the component will render

  return (
    <Fragment>
      <Navbar />

      <Container style={{ marginTop: '100px' }}>
        <List>
          {events.map(event => (
            <List.Item key={event.id}>{event.title}</List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default App;
