import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" />
            Core Events
        </Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item>
            <Button positive content='Create Activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
