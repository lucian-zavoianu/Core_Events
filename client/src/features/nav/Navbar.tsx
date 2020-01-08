import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import EventStore from "../../app/stores/eventStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const eventStore = useContext(EventStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as = { NavLink } exact to = '/'>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Core Events
        </Menu.Item>
        <Menu.Item name="events" as = { NavLink } to = '/events' />
        <Menu.Item>
          <Button as = { NavLink } to = '/createEvent' positive content="Create Event" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
