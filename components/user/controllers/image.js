const Clarifai = require('clarifai');
const { db } = require('../../helpers/database');
const { errorJson, successJson } = require('../../helpers/defaultResponses');

const detectFaces = (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    // return Error
    return;
  }

  // eslint-disable-next-line no-new
  const clarifaiApp = new Clarifai.App({
    apiKey: process.env.NODE_ENV_CLARIFAI_API_KEY
  });
  clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then(
    response => {
      console.log('response', response);
    },
    error => {
      console.log('error', error);
    }
  );
};

const updateUsageCount = (req, callback) => {
  const { email } = req.body;

  if (!email) {
    return callback({ ...errorJson, message: 'Missing emai. Unable to process.' });
  }

  db('users')
    .where('email', '=', email)
    .increment('usagecount', 1)
    .returning('usagecount')
    .then(usagecount => {
      if (usagecount[0]) {
        return callback({
          ...successJson,
          data: { usagecount: usagecount[0] },
          message: 'Entries successfully updated.'
        });
      } else {
        return callback({ ...errorJson, message: 'Unable to update entries.' });
      }
    })
    .catch(error => {
      return callback({ ...errorJson, message: 'Unable to update entries.' });
    });
};

module.exports = {
  updateUsageCount
};
