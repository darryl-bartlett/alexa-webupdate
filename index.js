/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
var Firebase = require("firebase");

//Firebase Configuration
 var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>"
  };  // <---Important!!! In lambda, it will cause double initialization.
  Firebase.initializeApp(config);
//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'welcome to web update');
    },
    'ContentUpdate': function() {
    //Get user input
    var categoryType = this.event.request.intent.slots.category.value;

    if (Firebase.apps.length === 0) {
      Firebase.initializeApp(config);
    }

    //Post response to firebase
    Firebase.database().ref('/').set({
        preference: categoryType
    }).then((data)=>{
        Firebase.app().delete().then()
    }).catch((err) => {
        console.log(err);
    })

    this.emit(':ask', 'you updated to ' + categoryType);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'you can ask for any news category');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'bye bye, have a nice day');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'have a nice day');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'The session ended');
    },
    'Unhandled': function () {
        this.emit(':tell', 'Something went wrong. Please try again.');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
