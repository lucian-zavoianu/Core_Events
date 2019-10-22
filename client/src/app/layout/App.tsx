import React, { useState, useEffect } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from 'axios';
import { IEvent } from "../models/event";

const App = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios
      .get<IEvent[]>('http://localhost:5000/api/events')
      .then((response: any) => {
        setEvents(response.data);
      });
  }, []); // [] Stops the component from entering a loop, as there is nothing to stop it from running every single time the component will render

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Core Events</Header.Content>
      </Header>

      <List>
        {events.map(event => (
          <List.Item key={event.id}>{event.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
