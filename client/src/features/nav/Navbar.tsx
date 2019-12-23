import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import EventStore from "../../app/stores/eventStore";
import { observer } from "mobx-react-lite";

const Navbar: React.FC = () => {
  const eventStore = useContext(EventStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Core Events
        </Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item>
          <Button onClick={eventStore.openCreateForm} positive content="Create Event" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
