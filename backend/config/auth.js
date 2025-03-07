module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'jwt_secret', 
    jwtExpiration: '1d', // Token expiration time
  };
  