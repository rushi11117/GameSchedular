import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function QueryInput() {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`User query: ${query}`);
    // add code to handle the user query here
  };

  return (
    <div className="container">
      <h1>Add Text Field to ask queries from user</h1>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Enter your query here"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mr-sm-2"
        />
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
