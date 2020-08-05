const { getFulfillment } = require('./dialogflow');
const { isAuthenticated } = require('./auth');
const { proxyResponse, teamsBody } = require('./responses');
const { BOT_NAME } = process.env

exports.handler = async event => {
  try {
    if (!isAuthenticated(event)) return proxyResponse(401, { message: 'Não foi possível autenticar' });
    const { from, text } = JSON.parse(event.body);
    const dialogflowFulfillment = await getFulfillment(from.name, textWithouBotMention(text));
    return proxyResponse(200, teamsBody(dialogflowFulfillment));
  } catch (e) {
    console.error(e);
    return proxyResponse(200, teamsBody('Bip bip bip, algo inesperado aconteceu... Tenta de novo ou chama alguém pra me ajudar!'));
  }
}

const textWithouBotMention = text => {
  return text.replace('<at>' + BOT_NAME + '</at>', '').trim();
}
