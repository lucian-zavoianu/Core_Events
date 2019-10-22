import React, { Component } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";

class App extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/events").then((response: any) => {
      // console.log(response);
      this.setState({
        events: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Core Events</Header.Content>
        </Header>

        <List>
          {this.state.events.map((event: any) => (
            <List.Item key = { event.id } >{ event.title }</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
