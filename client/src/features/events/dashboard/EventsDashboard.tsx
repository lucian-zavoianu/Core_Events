import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";
import { observer } from "mobx-react-lite";
import EventStore from "../../../app/stores/eventStore";

interface IProps {
  deleteEvent: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const EventsDashboard: React.FC<IProps> = ({
  deleteEvent,
  submitting,
  target
}) => {
  const eventStore = useContext(EventStore);
  const { editMode, selectedEvent } = eventStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          deleteEvent={deleteEvent}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        {selectedEvent && !editMode && (
          <EventDetails />
        )}
        {editMode && (
          <EventForm
            key={(selectedEvent && selectedEvent.id) || 0}
            event={selectedEvent!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventsDashboard);
