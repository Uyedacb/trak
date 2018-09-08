const Alexa = require('ask-sdk');

// launch skill without an intent
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Trak, you can modify, look at, and add time to your activities. Try saying, add one minute to learning!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Trak', speechText)
      .getResponse();
  }
}

const addTimeIntentHandler = {
  canHandle(canHandle) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'addTimeIntent';
  },
  handle(handlerInput) {
    // insert code to update dynamoDB for user here
    const activity = handlerInput.requestEnvelope.request.intent.slots.activity.value;
    const time = handlerInput.requestEnvelope.request.intent.slots.time.value;
    const speechText = `${time} has been added to ${activity}`
    // probably do an if statement to check if activity exists or if time is valid
    // and return some type of speechText error that reprompts the user to fix their mistake
    // return speechText that shows intent was handled
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Trak', speechText)
      .getResponse();
  }
}

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    addTimeIntentHandler) // errorhandler does not exist
  .lambda();
