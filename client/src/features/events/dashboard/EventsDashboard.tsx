import React from "react";
import { Grid } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

interface IProps {
    events: IEvent[]
}

const EventsDashboard: React.FC<IProps> = ({events}) => {
  return (
    <Grid>
      <Grid.Column width = { 10 }>
        <EventList events = { events } />
      </Grid.Column>

      <Grid.Column width = { 6 }>
        <EventDetails />
        <EventForm />
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;
