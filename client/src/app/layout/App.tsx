import React, { useState, useEffect } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from 'axios';
import { IEvent } from "../models/event";
import Navbar from "../../features/nav/Navbar";

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
      <Navbar />

      <List>
        {events.map(event => (
          <List.Item key={event.id}>{event.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
