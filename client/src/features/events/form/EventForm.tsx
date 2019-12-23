import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";
import { v4 as uuid } from "uuid";
import EventStore from "../../../app/stores/eventStore";
import { observer } from "mobx-react-lite";

interface IProps {
  event: IEvent;
}

const EventForm: React.FC<IProps> = ({
  event: initialFormState
}) => {
  const eventStore = useContext(EventStore);
  const { createEvent, editEvent, submitting, cancelFormOpen } = eventStore;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [event, setEvent] = useState<IEvent>(initializeForm);

  const handleSubmit = () => {
    if (event.id.length === 0) {
      let newEvent = {
        ...event,
        id: uuid()
      };

      createEvent(newEvent);
    } else {
      editEvent(event);
    }
  };

  const handleInputChange = (
    formEvent: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = formEvent.currentTarget;
    setEvent({ ...event, [name]: value });
    // Without Object Destructuring:
    // setEvent({...event, [formEvent.target.name]: formEvent.target.value});
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={event.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={3}
          placeholder="Description"
          style={{ resize: "none" }}
          value={event.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={event.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={event.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={event.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={event.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(EventForm);
