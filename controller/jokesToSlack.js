const axios = require('axios');
const { WebClient } = require('@slack/web-api');

let joke;

// Get jokes API
const getJokes = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://daddyjokes.p.rapidapi.com/random',
      headers: {
        'X-RapidAPI-Key': 'INSERT API KEY HERE',
        'X-RapidAPI-Host': 'daddyjokes.p.rapidapi.com',
      },
    };

    const res = await axios.request(options);
    joke = res.data.joke;
  } catch (err) {
    console.error(err);
  }
};

// Send Slack message
const sendSlack = async (message) => {
  const web = new WebClient('INSERT SLACK TOKEN HERE');
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: 'INSERT SLACK CHANNEL NAME HERE',
      text: `${message}`,
    });
  } catch (err) {
    console.error(err);
  }
};

const scheduledTask = async () => {
  await getJokes();
  sendSlack(`Good day! Here's your daily dose of LOL.
${joke}`);
};

module.exports = scheduledTask;
