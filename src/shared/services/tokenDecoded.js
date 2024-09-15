require('dotenv').config();
const jwt = require("jsonwebtoken");

function tokenDecoded (authorization) {
  
  try {
    let tokenNoBearer = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(tokenNoBearer, `${process.env.SECRET_KEY}`);
    return decoded;
  } catch (error) {
    return array = [];
  }
};

module.exports = tokenDecoded;
