const Clarifai = require('clarifai');
const { updateUsageCount } = require('./usage');
const { errorJson, successJson } = require('../../helpers/defaultResponses');

const detectFaces = (req, res) => {
  const { imageUrl, id } = req.body;
  if (!imageUrl || !id) {
    res.status(errorJson.statusCode).json({
      ...errorJson,
      message: 'Unable to process the image.'
    });
  }

  // eslint-disable-next-line no-new
  const clarifaiApp = new Clarifai.App({
    apiKey: process.env.NODE_ENV_CLARIFAI_API_KEY
  });

  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
    .then(data => {
      updateUsageCount(id)
        .then(result => {
          res.status(successJson.statusCode).json({
            ...successJson,
            data: data,
            message: 'Image successfully processed.'
          });
        })
        .catch(error => {
          res.status(errorJson.statusCode).json({
            ...errorJson,
            message: 'Image successfully processed. But unable to process the image.'
          });
        });
    })
    .catch(error => {
      res.status(errorJson.statusCode).json({
        ...errorJson,
        message: 'Unable to process the image.'
      });
    });
};

module.exports = {
  detectFaces
};
