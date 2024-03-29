const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let deleted_user = await models.users.update(
        {
          disabled: 1,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve(deleted_user);
    } catch (error) {
      return reject(error);
    }
  });
};
