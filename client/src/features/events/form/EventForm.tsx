import React from "react";
import { Segment, Form } from "semantic-ui-react";

const EventForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea
          rows={3}
          placeholder="Description"
          style={{ resize: "none" }}
        />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
      </Form>
    </Segment>
  );
};

export default EventForm;
