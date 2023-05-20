const mongoose = require('mongoose');

function retrieveData(callback) {
  // Use the existing database connection
  const db = mongoose.connection;

  // Access the database and perform operations
  db.collection('slots').find({}).toArray((error, data) => {
    if (error) {
      console.log(err)
    } else {
      callback(data);
    }
  });

}

module.exports = {
  retrieveData
};
