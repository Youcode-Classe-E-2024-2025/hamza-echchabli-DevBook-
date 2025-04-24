import jwt from 'jsonwebtoken'

const auth = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Check role
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied' })
      }

      req.user = decoded // { userId, role, iat, exp }
      next()
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    } 
  }
}

export default auth
