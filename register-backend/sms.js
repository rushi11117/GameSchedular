import twilio from 'twilio';

const accountSid = 'ACCOUNT_SID';
const authToken = 'AUTHENTICATION_TOKEN';
const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: 'AMAN THE DON!',
     from: '+13204007883', 
     to: '+919766123075' 
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));
