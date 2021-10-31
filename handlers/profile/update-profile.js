const models = require('../../models');

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let update_profile = await models.profiles.update({ ...req.body }, {
          where: {
            id: req.params.id,
          }
        });

      return resolve(update_profile)

    } catch (err) {
      return reject(err)
    }
  })
}