import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedEvent: (event: IEvent | null) => void;
}

const EventDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedEvent
}) => {
  const eventStore = useContext(EventStore);
  const { selectedEvent: event } = eventStore;
  
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${event!.category}.jpg`}
        wrapped
        ui={false}
      />

      <Card.Content>
        <Card.Header>{event!.title}</Card.Header>
        <Card.Meta>
          <span>{event!.date}</span>
        </Card.Meta>
        <Card.Description>{event!.description}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedEvent(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(EventDetails);
