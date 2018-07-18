const { db } = require('../helpers/database');
const { errorJson, successJson } = require('../helpers/defaultResponses');

const updateUsageCount2 = (req, callback) => {
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
  updateUsageCount2
};
