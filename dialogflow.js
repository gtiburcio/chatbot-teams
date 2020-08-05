const dialogflow = require('dialogflow');
const { project_id } = require('./gcpKey.json');

exports.getFulfillment = async (sessionId, text) => {
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(project_id, sessionId);
  const fulfillmentRequest = getFulfillmentRequest(sessionPath, text);
  const fulfillmentResponse = await sessionClient.detectIntent(fulfillmentRequest);
  return fulfillmentResponse[0].queryResult.fulfillmentText;
}

const getFulfillmentRequest = (session, text) => {
  return {
    session,
    queryInput: {
      text: {
        text,
        languageCode: 'pt-BR',
      }
    }
  };
};