import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import { observer } from "mobx-react-lite";

interface IProps {
  events: IEvent[];
  selectEvent: (id: string) => void;
  deleteEvent: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const EventList: React.FC<IProps> = ({
  events,
  selectEvent,
  deleteEvent,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map(event => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div>
                  {event.city}, {event.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectEvent(event.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>

                <Button
                  name={event.id}
                  loading={target === event.id && submitting}
                  onClick={(e: SyntheticEvent<HTMLButtonElement>) =>
                    deleteEvent(e, event.id)
                  }
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={event.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
