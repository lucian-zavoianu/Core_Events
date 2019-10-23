import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";

interface IProps {
  event: IEvent;
}

const EventDetails: React.FC<IProps> = ({ event }) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${event.category}.jpg`}
        wrapped
        ui={false}
      />

      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>
          <span>{event.date}</span>
        </Card.Meta>
        <Card.Description>{event.description}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default EventDetails;
