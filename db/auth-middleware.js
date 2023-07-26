module.exports = function (req, res, next) {
  if (req.path === '/refresh') {
    if (!req.body.refresh_token) {
      return res.status(401).send('refresh_token is required')
    }
    return res.status(200).json({
      refresh_token: 'refresh_token',
      access_token: new Date()
    })
  }

  if (req.path === '/login') {
    return res.status(200).json({
      refresh_token: 'refresh_token_' + req.body.email + '_' + req.body.password,
      access_token: 'access_token'
    })
  }
  next()
}
