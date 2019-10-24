import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";
import { observer } from "mobx-react-lite";

interface IProps {
  events: IEvent[];
  selectEvent: (id: string) => void;
  selectedEvent: IEvent | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedEvent: (event: IEvent | null) => void;
  createEvent: (event: IEvent) => void;
  editEvent: (event: IEvent) => void;
  deleteEvent: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const EventsDashboard: React.FC<IProps> = ({
  events,
  selectEvent,
  selectedEvent,
  editMode,
  setEditMode,
  setSelectedEvent,
  createEvent,
  editEvent,
  deleteEvent,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        {selectedEvent && !editMode && (
          <EventDetails
            event={selectedEvent}
            setEditMode={setEditMode}
            setSelectedEvent={setSelectedEvent}
          />
        )}
        {editMode && (
          <EventForm
            key={(selectedEvent && selectedEvent.id) || 0}
            setEditMode={setEditMode}
            event={selectedEvent!}
            createEvent={createEvent}
            editEvent={editEvent}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventsDashboard);
