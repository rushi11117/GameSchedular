import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

export default function MyGames() {
    const [games, setGames] = useState([]);
    const [searchGame, setSearchGame] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState('');

    const [sets, setSets] = useState([]);
    const [currentSet, setCurrentSet] = useState({ setNumber: 1, result: "" });

    const [editSetIndex, setEditSetIndex] = useState(-1);

    const handlePlayer1ScoreChange = (index, event) => {
        const updatedSets = [...sets];
        updatedSets[index].player1Score = event.target.value;
        setSets(updatedSets);
    };

    const handlePlayer2ScoreChange = (index, event) => {
        const updatedSets = [...sets];
        updatedSets[index].player2Score = event.target.value;
        setSets(updatedSets);
    };


    const addSet = () => {
        setSets([...sets, currentSet]);
        setCurrentSet({ setNumber: currentSet.setNumber + 1, player1Score: "", player2Score: "" });
        setEditSetIndex(-1);
    };

    const deleteSet = (index) => {
        const updatedSets = sets.filter((_, i) => i !== index);
        setSets(updatedSets);
    };

    const editSet = (index) => {
        const setToEdit = sets[index];
        setCurrentSet(setToEdit);
        setEditSetIndex(index);
    };

    const updateSet = () => {
        const updatedSets = [...sets];
        updatedSets[editSetIndex] = currentSet;
        setSets(updatedSets);
        setCurrentSet({ setNumber: currentSet.setNumber + 1, player1Score: "", player2Score: "" });
        setEditSetIndex(-1);
    };

    const handleSubmit  = async (e) => {
        console.log("choosen game id",selectedGameId);
        
        // e.preventDefault();
        // You can perform any necessary actions with the collected game results here
        try {
            await axios.put(`http://localhost:9002/addscorecard/${selectedGameId}`, sets);
            // Handle success or perform any additional actions
        } catch (error) {
            console.log(error)
        }
        console.log(sets);
        
        // sessionStorage.removeItem('choosenGameId')
    };

    function addScorecard(game_id, result) {
        setSelectedGameId(game_id);
        setShowModal(true);
    }

    function handleModalClose() {
        setShowModal(false);
        setSelectedGameId('');
    }



    const handleAddScorecard = () => {
        // Perform the scorecard submission logic here
        // You can use the selectedGameId to identify the game being scored
        // Once the scorecard is added, you can close the modal and perform any additional actions
        console.log(`Scorecard added for game ID: ${selectedGameId}`);
        setShowModal(false);
        setSelectedGameId('');
        // Additional logic or API calls can be performed here
    };

    useEffect(() => {
        axios.get('http://localhost:9002/gamesnear')
            .then(response => {
                setGames(response.data);
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchGame(e.target.value);
    };

    const currentUser = sessionStorage.getItem('email')
    const filteredGames = games.filter(game =>
        game.game.toLowerCase().includes(searchGame.toLowerCase()) &&
        (game.player1 === currentUser || game.player2 === currentUser)
    );


    return (
        <div className="container">
            <div className='card'>
                <h5 className="card-header">Your Games Scheduled</h5>
                <Form>
                    <Form.Group style={{ margin: '5px' }} controlId="searchGame">
                        <Form.Control
                            type="text"
                            placeholder="Search by game"
                            value={searchGame}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Start Time</th>
                            <th>Game</th>
                            <th>Actions</th>
                            {/* <th>Venue</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGames.map(game => (
                            <tr key={game._id}>
                                <td>{game.player1}</td>
                                <td>{game.player2}</td>
                                <td>{game.startTime}</td>
                                <td>{game.game}</td>
                                <td>
                                    {/* <Link to="/addscorecard" className="nav-link"> */}
                                    {/* <Button variant="btn-secondry" style={{ color: 'brown' }} onClick={() => addScorecard(game._id)}>
                      Scorecard
                    </Button> */}
                                    <Button
                                        variant="primary"
                                        // style={{ color: '' }}
                                        onClick={() => addScorecard(game._id)}
                                    >
                                        Add Scorecard
                                    </Button>
                                    {/* </Link> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal for adding scorecard */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        <p style={{ fontSize: '20px' }}>
                            Game ID: {selectedGameId}
                        </p>
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Place your form elements for adding scorecard here */}
                    {/* You can access the selectedGameId in this modal */}
                    {/* <p>Game ID: {selectedGameId}</p> */}
                    {/* Add your form fields for scorecard input */}


                    <div>
                        <h5>Add Game Result</h5>
                        <Form onSubmit={handleSubmit(selectedGameId)}>
                            {sets.map((set, index) => (
                                <div key={index}>
                                    <Form.Group>
                                        <Form.Label>Set {set.setNumber}:</Form.Label>
                                        <Form.Control
                                            style={{ margin: '5px' }}
                                            type="text"
                                            value={set.player1Score}
                                            onChange={(event) => handlePlayer1ScoreChange(index, event)}
                                            placeholder="Player 1 Score"
                                            required
                                        />
                                        <Form.Control
                                            style={{ margin: '5px' }}
                                            type="text"
                                            value={set.player2Score}
                                            onChange={(event) => handlePlayer2ScoreChange(index, event)}
                                            placeholder="Player 2 Score"
                                            required
                                        />

                                        <Button variant="danger" style={{ margin: '5px' }} onClick={() => deleteSet(index)}>Delete</Button>
                                        <Button variant="primary" style={{ margin: '5px' }} onClick={() => editSet(index)}>Edit</Button>
                                    </Form.Group>
                                </div>
                            ))}
                            {editSetIndex === -1 ? (
                                <Button variant="primary" style={{ margin: '5px' }} onClick={addSet}>
                                    Add Set
                                </Button>
                            ) : (
                                <Button variant="primary" style={{ margin: '5px' }} onClick={updateSet}>
                                    Update Set
                                </Button>
                            )}
                            <Button variant="primary" style={{ margin: '5px' }} type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddScorecard}>
                        Add Scorecard
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
