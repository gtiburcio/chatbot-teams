exports.proxyResponse = (statusCode, body) =>{
    return {
        statusCode,
        body: JSON.stringify(body),
    };
}

exports.teamsBody = (text) => {
    return { type: 'message', text };
}

