const crypto = require('crypto');
const { BASE_64 } = require('./constants')
const { TEAMS_KEY } = process.env
const bufferSecret = Buffer.from(TEAMS_KEY, BASE_64);

exports.isAuthenticated = event => {
    const { body } = event;
    if(body === null) return false;
    const { Authorization } = event.headers
    return Authorization === hashMessage(event);
}

const hashMessage = body => {
    const bufferMessage = Buffer.from(body, 'utf8');
    return 'HMAC ' + crypto.createHmac('sha256', bufferSecret).update(bufferMessage).digest(BASE_64);
}
