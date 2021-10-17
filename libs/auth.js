const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyJWTToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    })
  })
}

const createJWToken = (details) => {
  if (typeof details !== 'object') {
    details = {}
  }

  const options = {
    algorithm: 'HS256',
  }
  Object.assign(options, (details.maxAge) ? { expiresIn: details.maxAge } : null);

  let token = jwt.sign({ data: details.sessionData }, JWT_SECRET, options);
  return token
}

module.exports = {
  createJWToken,
  verifyJWTToken
}
