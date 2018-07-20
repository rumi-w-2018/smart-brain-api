const { db } = require('../../helpers/database');

const updateUsageCount = id => {
  return new Promise((resolve, reject) => {
    db('users')
      .where('id', '=', id)
      .increment('usagecount', 1)
      .returning('usagecount')
      .then(usagecount => {
        if (usagecount[0]) {
          resolve(true);
        } else {
          reject(new Error('unable to update the usage count'));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  updateUsageCount
};
