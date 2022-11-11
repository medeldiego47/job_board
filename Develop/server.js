const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');


const sequelize = require('./config/connection');
const { env } = require('process');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;




const sess = {
  secret: process.env.DB_Secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create();
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post('/send', (req, res) => {
  const output = `
  <p> Hello! We have recieved your request! below is the start of your message:</p>

  <h3>Message</h3>
  <p>${req.body.message}</p>
  
  <p> You will have a response from us in the next hour, thank you for contacting support!</p>
  <p> Thank you, The Grab-A-Job Team </p>
      `

  const transporter = nodeMailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, 
    auth: {
      user: 'jobsearchhelper123@outlook.com', 
      pass: 'Coding123', 
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  let info = {
    from: '"Grab-a-job Team" <jobsearchhelper123@outlook.com>', 
    to: `${req.body.email}`, 
    subject: "My first NodeMailer Request", 
    text: "Hello world?", 
    html: output , 
  }

  transporter.sendMail(info, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('message sent')
  })
  console.log("Message sent", info.messageId);
  console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
