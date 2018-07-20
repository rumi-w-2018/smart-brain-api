const Clarifai = require('clarifai');
const { updateUsageCount } = require('./usage');
const { errorJson, successJson } = require('../../helpers/defaultResponses');

const detectFaces = (req, res) => {
  console.log('req', req);

  const { imageUrl, id } = req.body;
  if (!imageUrl || !id) {
    res.status(errorJson.statusCode).json({
      ...errorJson,
      message: 'Unable to process the image.'
    });
  }

  console.log('imageUrl', imageUrl);

  // eslint-disable-next-line no-new
  const clarifaiApp = new Clarifai.App({
    apiKey: process.env.NODE_ENV_CLARIFAI_API_KEY
  });
  console.log('api', process.env.NODE_ENV_CLARIFAI_API_KEY);
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
    .then(data => {
      console.log('here success', data);

      updateUsageCount(id)
        .then(result => {
          console.log('image success');
          res.status(successJson.statusCode).json({
            ...successJson,
            data: data,
            message: 'Image successfully processed.'
          });
        })
        .catch(error => {
          console.log('some error');
          res.status(errorJson.statusCode).json({
            ...errorJson,
            message: 'Image successfully processed. But unable to process the image.'
          });
        });
    })
    .catch(error => {
      console.log('image error');
      res.status(errorJson.statusCode).json({
        ...errorJson,
        message: 'Unable to process the image.'
      });
    });
};

module.exports = {
  detectFaces
};
