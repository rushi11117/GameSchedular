import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"
import { formatDateTime } from "../../../resources/FormatDateTime"


export default function GameSchedule() {
  const [games, setGames] = useState([]);
  const [searchGame, setSearchGame] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [playersModel, setPlayersModel] = useState([]);
  const [gameResults, setGameResults] = useState([]);
  const [showScorecard, setShowScorecard] = useState(false);




  function ViewScorecard(game_id) {
    console.log("fetching result...");
    setShowModal(true);
    const fetchGameResults = async () => {
      try {
        const response = await axios.get(`http://localhost:9002/game-results/${game_id}`);
        setPlayersModel([response.data.result[0].player1, response.data.result[0].player2]);
        // console.log("game between ",response.data.result[0].player1)
        setGameResults(response.data.result[0].result);
        console.log("required", response.data.result[0].result)
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameResults()

    setShowScorecard(!showScorecard);
  }

  function handleModalClose() {
    setShowModal(false);
    setSelectedGameId('');
  }


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

  function isCompleatedCheckBox() {

    const handleCheckboxChange = (event) => {
      // setIsCompleateActive(event.target.checked);
    };
  }

  const filteredGames = games.filter(game =>
    game.game.toLowerCase().includes(searchGame.toLowerCase())
  );

  return (
    <div className="container">
      <div className='card'>
        <h5 className="card-header">All Games Scheduled</h5>
        <Form>
          <Form.Group controlId="searchGame" style={{ margin: '5px' }}>
            <Form.Control
              type="text"
              placeholder="Search by game"
              value={searchGame}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
        <table className="table table-striped">
          <thead style={{ margin: '10px' }}>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Start Time</th>
              <th>Game</th>
              <th>Status</th>
              <th>Actions</th>
              {/* <th>Venue</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredGames.map(game => (
              <tr key={game._id}>
                <td>{game.player1}</td>
                <td>{game.player2}</td>
                <td>{formatDateTime(game.startTime)}</td>
                <td>{game.game}</td>
                <td>

                  <label>
                    <input
                      type="checkbox"
                      checked={game.isCompleated}
                      onChange={isCompleatedCheckBox}
                    />
                  </label>
                </td>
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
      {/* Modal for showing scorecard */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Scorecard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <h4 className="mt-4">Game Results</h4>
            {showScorecard && (
              <ul className="list-group">
                {gameResults.map((set, index) => (
                  <li key={index} className="list-group-item">
                    <p className="mb-1">Set Number: {set.setNumber}</p>
                    <p className="mb-1">{playersModel[0]}: {set.player1Score}</p>
                    <p className="mb-1">{playersModel[1]}: {set.player2Score}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}