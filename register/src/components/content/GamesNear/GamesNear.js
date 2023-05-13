import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GameSchedule() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9002/games')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Games Scheduled and Open for Viewers</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>From</th>
            <th>Till</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id}>
              <td>{game.player1}</td>
              <td>{game.player2}</td>
              <td>{game.from}</td>
              <td>{game.till}</td>
              <td>{game.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
