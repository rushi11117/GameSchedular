const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://<rushimhetre>:<Rm11117>@<cluster0>.mongodb.net/<database-name>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
