import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const isAuth = async (req, res, next) => {
  // console.log('auth', req.header('Bearer'))
  const decoded = jwt.verify(req.header('Bearer'), process.env.JWT_SECRET)
  console.log('query', req.query)

  try {
    const user = await User.findOne({ email: req.query.email })
    if (!user) {
      throw Error('Email or password wrong.')
    }

    if (user.id === decoded.id) {
      console.log('true')
      next()
    } else {
      console.log('user', user)
      console.log('jwt', decoded.id)
    }
  } catch (error) {
    console.log(error)
  }
}
