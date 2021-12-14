const models = require('../../models');

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let update_user = await models.users.update({ ...req.body }, {
          where: {
            id: req.params.id,
          }
        });

      return resolve(update_user)

    } catch (err) {
      return reject(err)
    }
  })
}