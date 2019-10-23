import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IEvent } from "../../../app/models/event";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  event: IEvent;
}

const EventForm: React.FC<IProps> = ({
  setEditMode,
  event: initialFormState
}) => {
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
    console.log(event);
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
          type="date"
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default EventForm;
