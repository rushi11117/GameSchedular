import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function AddGame() {
    const history = useHistory();
    const [from, setFrom] = useState(new Date());
    const [till, setTill] = useState(new Date());
    const [venue, setVenue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = { from, till, venue };

        fetch('http://localhost:9002/addfreetime', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                console.log(res.body);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header">Register</h5>
                        <div className="card-body"></div>
                        <Row>
                            <Col>
                                <Form.Group controlId="from">
                                    <Form.Label>Free from</Form.Label>
                                    <DatePicker
                                        selected={from}
                                        onChange={(date) => setFrom(date || '')}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="till">
                                    <Form.Label>Free till</Form.Label>
                                    <DatePicker
                                        selected={till}
                                        onChange={(date) => setTill(date || '')}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="venue">
                            <Form.Label>Venue</Form.Label>
                            <Form.Control
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                placeholder="Enter venue"
                            />
                        </Form.Group>
                        <Button 
                        variant="secondary"
                        type="button"
                        onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
