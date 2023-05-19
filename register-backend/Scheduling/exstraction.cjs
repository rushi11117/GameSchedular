const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/mydatabase';

/*

code with uresolved promises

*/


// async function getSlots(url) {
//   MongoClient.connect(url, function (err, client) {
//     if (err) throw err;

//     const db = client.db('playersDB');

//     db.collection('freetimes').find({}, { projection: { _id: 0, email: 1, slot: 1 } }).toArray(function (err, result) {
//       if (err) throw err;

//       const output = [];

//       result.forEach(function (doc) {
//         const email = doc.email;

//         doc.slot.forEach(function (slot) {
//           const obj = {
//             from: slot.from,
//             till: slot.till,
//             location: slot.venuefr,
//             player: email
//           };

//           output.push(obj);
//         });
//       });

//       // return output
//       console.log(output);
//       client.close();
//     });
//   });
// }


/*
   
  code with resolved promises

*/


const getSlots = async () => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db('mydb');
    const collection = db.collection('booking');
    const cursor = collection.find({}, { projection: { email: 1, slot: 1, _id: 0 } });
    const result = await cursor.toArray();
    return result.map(({ email, slot }) => ({
      email,
      ...slot.map(({ from, till, venuefr }) => ({ from, till, venuefr })),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};


module.exports = getSlots;