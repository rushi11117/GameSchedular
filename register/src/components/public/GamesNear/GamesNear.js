// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function GameSchedule() {
//   const [games, setGames] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:9002/games')
//       .then(response => {
//         setGames(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Games Scheduled and Open for Viewers</h1>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Player 1</th>
//             <th>Player 2</th>
//             <th>From</th>
//             <th>Till</th>
//             <th>Venue</th>
//           </tr>
//         </thead>
//         <tbody>
//           {games.map(game => (
//             <tr key={game.id}>
//               <td>{game.player1}</td>
//               <td>{game.player2}</td>
//               <td>{game.from}</td>
//               <td>{game.till}</td>
//               <td>{game.venue}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function GameSchedule() {
  const [games, setGames] = useState([]);
  const [name, setName] = useState('Name Not Found');

  function getName() {
    axios.get('http://localhost:9002/gamiltoname',email)
    .then(response => {
      setName(response.data);
    })
    .catch(error => {
      console.log("error finding name:",error)
    })
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

  return (
    <div className="container">
      <div className='card'>
        <h5 className="card-header">Games Scheduled and Open for Viewers</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Start Time</th>
              {/* <th>Till</th>
            <th>Venue</th> */}
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <td>{game.player1}</td>
                <td>{game.player2}</td>
                <td>{game.startTime}</td>
                {/* <td>{game.till}</td>
              <td>{game.venue}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
