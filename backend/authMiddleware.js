const { createRemoteJWKSet, jwtVerify } = require('jose');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;

const jwks = createRemoteJWKSet(
  new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`)
);

async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    const { payload } = await jwtVerify(token, jwks, {
      issuer: `${supabaseUrl}/auth/v1`,
      audience: 'authenticated'
    });

    if (!payload.sub) {
      return res.status(401).json({
        error: 'Invalid authentication token'
      });
    }

    req.user = {
      id: payload.sub
    };

    next();
  } catch (err) {
    console.error('Authentication error:', err.message);

    return res.status(401).json({
      error: 'Invalid or expired authentication token'
    });
  }
}

module.exports = authenticateUser;