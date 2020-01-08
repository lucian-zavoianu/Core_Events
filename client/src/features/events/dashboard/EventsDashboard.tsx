import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";
import { observer } from "mobx-react-lite";
import EventStore from "../../../app/stores/eventStore";

const EventsDashboard: React.FC = () => {
  const eventStore = useContext(EventStore);
  const { editMode, event } = eventStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventsDashboard);
