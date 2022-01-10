const bcrypt = require('bcryptjs');
const db = require('../connection');

const init = async () => {
  
  let salt = await bcrypt.genSalt(15);
  
  let hashedAdminPass = await bcrypt.hash('admin', salt);
  let hashedTechnicianPass = await bcrypt.hash('tecnico', salt);
  let hashedUserPass = await bcrypt.hash('user', salt);

  let query = `
    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('admin', 'admin', 'admin@admin.com', '${hashedAdminPass}', 'F', '11111111111', '60', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('technician', 'technian', 'technician@technician.com', '${hashedTechnicianPass}', 'F', '11111111111', '55', '1995-12-17T03:24:00');
    
    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('user', 'user', 'user@user.com', '${hashedUserPass}', 'F', '11111111111', '50', '1995-12-17T03:24:00');
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error) => {
      if(error) reject(error)
      else{
        console.log("users initialized =::::::")
        resolve(true)
      }      
    })
  })
}

module.exports = init