import { handleError } from '../utils/';
import { UserLogs } from '../models';
import { ALL } from './roles';


module.exports = (roles, action = '', save_log = true) => {
  return (req, res, next) => {
    if (req.headers && req.headers.country_code && !req.body.country_code) {
      req.body.country_code = req.headers.country_code;
    }
    const { password, password_confirm, payment, ...data } = req.body;
    console.info('request: ', `${req.baseUrl}${req.url}`, req.method, JSON.stringify(data));
    if (req.user) {

      if(req.headers.country_code){
        req.user.country_codes = [req.headers.country_code];
      }

      if (save_log === true){
        const logs = new UserLogs({
          action,
          url: req.baseUrl, 
          method: req.method, 
          user_id: req.user._id,
          private: true,
          body: JSON.stringify(data),
          files: JSON.stringify(req.files),
          params: JSON.stringify(req.params),
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          user_agent: req.headers['user-agent'],
        });
        logs.save();
      }
      if (roles.includes(req.user.user_type) || roles.includes(ALL))
        next();
      else
        return handleError({
          status: 403,
          message: "Debe iniciar sesión o registrarse para ejecutar esta acción."
        }, {}, res);

        /* Save logs without token and is public access */
    } else if (!req.user && roles.includes(ALL)) {
      const logs = new UserLogs({
        action: `${action} - ACCESO SIN TOKEN`,
        url: req.baseUrl, 
        method: req.method,
        private: false,
        body: JSON.stringify(data),
        files: JSON.stringify(req.files),
        params: JSON.stringify(req.params),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
      });
      logs.save();
      next();
      
      /* Save logs without token and is not public access */
    } else {
      const logs = new UserLogs({
        action: `${action} - TOKEN INVALIDO`,
        url: req.baseUrl, 
        method: req.method,
        private: true,
        body: JSON.stringify(data),
        files: JSON.stringify(req.files),
        params: JSON.stringify(req.params),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
      });
      logs.save();
      return handleError({
        status: 403,
        message: "Debe iniciar sesión o registrarse para ejecutar esta acción."
      }, {}, res);
    }
  }
}