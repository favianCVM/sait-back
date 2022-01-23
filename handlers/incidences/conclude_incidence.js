const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      let concluded_incidence = {}

      


      return resolve({

      });
    } catch (error) {
      return reject(error);
    }
  });
};
