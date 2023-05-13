import twilio from 'twilio';

const accountSid = 'ACa0b92e651c1311b0a84c8e9ae6733a1d';
const authToken = 'd09bf30a253dd142063c2769c3cb04c5';
const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: 'AMAN THE DON!',
     from: '+13204007883', 
     to: '+919766123075' 
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));
