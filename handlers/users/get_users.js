const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await models.users.findAll({
      });

      users = users.map((userData) => {
        delete userData.dataValues.password;

        return { ...userData.dataValues };
      });

      return resolve(users);
    } catch (err) {
      return reject(err);
    }
  });
};
