import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"

export default function GameSchedule() {
  const [games, setGames] = useState([]);
  const [searchGame, setSearchGame] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState('');
  const history = useHistory();

  function ViewScorecard(game_id, result) {
    console.log("scorecard updated");
  }


  function ViewScorecard(game_id, result) {
    setSelectedGameId(game_id);
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
    setSelectedGameId('');
  }



  const handleViewScorecard = () => {
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

  const filteredGames = games.filter(game =>
    game.game.toLowerCase().includes(searchGame.toLowerCase())
  );

  return (
    <div className="container">
      <div className='card'>
        <h5 className="card-header">All Games Scheduled</h5>
        <Form>
          <Form.Group controlId="searchGame">
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
                      onClick={() => ViewScorecard(game._id)}
                    >
                      View Scorecard
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
          <Modal.Title>View Scorecard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Place your form elements for adding scorecard here */}
          {/* You can access the selectedGameId in this modal */}
          <p>Game ID: {selectedGameId}</p>
          {/* Add your form fields for scorecard input */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleViewScorecard}>
            Add Scorecard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
