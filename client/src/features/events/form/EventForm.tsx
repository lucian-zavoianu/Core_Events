import React, { useState } from "react";
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

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={event.title} />
        <Form.TextArea
          rows={3}
          placeholder="Description"
          style={{ resize: "none" }}
          value={event.description}
        />
        <Form.Input placeholder="Category" value={event.category} />
        <Form.Input type="date" placeholder="Date" value={event.date} />
        <Form.Input placeholder="City" value={event.city} />
        <Form.Input placeholder="Venue" value={event.venue} />
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
