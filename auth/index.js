import { handleError } from '../utils/';
import { ALL } from './roles';


module.exports = (roles, action = '', save_log = true) => {
  return (req, res, next) => {
    const { password, ...data } = req.body;
    console.info('request: ', `${req.baseUrl}${req.url}`, req.method, JSON.stringify(data));
    if (req.user) {
      if (roles.includes(req.user.user_type) || roles.includes(ALL))
        next();
      else
        return handleError({
          status: 403,
          message: "Debe iniciar sesión o registrarse para ejecutar esta acción."
        }, {}, res);

        /* Save logs without token and is public access */
    }  else {
      return handleError({
        status: 403,
        message: "Debe iniciar sesión o registrarse para ejecutar esta acción."
      }, {}, res);
    }
  }
}