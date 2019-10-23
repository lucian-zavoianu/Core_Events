import React from "react";
import { Grid } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

interface IProps {
  events: IEvent[];
  selectEvent: (id: string) => void;
  selectedEvent: IEvent | null;
}

const EventsDashboard: React.FC<IProps> = ({
  events,
  selectEvent,
  selectedEvent
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} />
      </Grid.Column>

      <Grid.Column width={6}>
        {selectedEvent && <EventDetails event={selectedEvent} />}
        <EventForm />
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;
