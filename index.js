const cron = require('node-cron');
const scheduledTask = require('./controller/jokesToSlack');

cron.schedule('0 9 * * *', () => {
  scheduledTask();
});
