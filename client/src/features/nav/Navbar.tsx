import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
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
          <Button onClick={openCreateForm} positive content="Create Event" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
