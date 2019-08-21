const {  dialogflow  } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const app = dialogflow({debug:true});

app.intent('Default Welcome Intent', conv => {
  conv.ask('Hello Judith, Welcome to Appointment Checker. You can say things such as Make an appointment or Check an appointment.')
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});

app.intent('PreBookImplement', conv => {
    let zip = conv.parameters['number'];
    let provider = conv.parameters['providerType'];
    if(zip!==""&&provider!==""){
        conv.ask(`There is one PCP in your area named Dr Smith located at 23 South Clinton Avenue. Would you like to hear available appointment times`);
    }
    else if (zip==="" && provider===""){
        conv.ask(`Wat kind of provider you would like to book an appointment for, you can say things like PCP or dentist.`);
    }
    else if(zip===""&&provider!==""){
        conv.ask('what zip code would you like to search the provider in');
    }
    
  });

  app.intent('GoodByeIntent', conv => {
    conv.ask(`Good Bye`)
  });
  
  app.intent('BookingTimeIntent', conv => {
    let appointmentTime = conv.parameters['date-period'];
    if(appointmentTime===""){
        conv.ask(`When would you like to schedule the appointment`);
    }
    else{
        conv.ask(`There is an available appointment on July 10th at 9am. Would you like to book this appointment or hear more times`);
    }
  });

const expressApp = express().use(bodyParser.json())
expressApp.post('/fulfillment', app)
var port=process.env.PORT||3000;
expressApp.listen(port);