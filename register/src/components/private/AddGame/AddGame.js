import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function AddGame() {
    const history = useHistory();
    const [game, setGame] = useState('')
    const [from, setFrom] = useState(new Date());
    const [till, setTill] = useState(new Date());
    const [venue, setVenue] = useState('');



    // /Declared Game
    const games = [
        { value: '', label: 'Tennis' },
        { value: 'Ping Pong', label: 'Ping Pong' },
        { value: 'Squash', label: 'Squash' },
        { value: 'Badminton', label: 'Badminton' }
        // Add more games as needed
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(game);
        const email = sessionStorage.getItem('email');
        const updatedData = { email, game, from, till, venue };

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
                        {/* <Form.Group controlId="game" style={{ margin: '5px' }}>
                            <Form.Label>Choose Game</Form.Label>
                            <Form.Select
                                gamevalue={game}
                                onChange={(e1) => setGame(e1.target.gamevalue)}
                                placeholder="Select game"
                            >
                                <option gamevalue="">Select game</option>
                                {games.map((gameOption) => (
                                    <option key={gameOption.gamevalue} value={gameOption.gamevalue}>
                                        {gameOption.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group> */}


                        <Form.Group controlId="game" style={{ margin: '5px' }}>
                            <Form.Label>Choose Game</Form.Label>
                            <Form.Select
                                value={game}
                                onChange={(e) => setGame(e.target.value)}
                                placeholder="Select game"
                            >
                                {games.map((gameOption) => (
                                    <option key={gameOption.value} value={gameOption.value}>
                                        {gameOption.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Col style={{ margin: '5px' }}>
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
                        <Form.Group controlId="venue" style={{ margin: '5px' }}>
                            <Form.Label>Venue</Form.Label>
                            <Form.Control
                                type="text"
                                venuevalue={venue}
                                onChange={(e) => setVenue(e.target.venuevalue)}
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
