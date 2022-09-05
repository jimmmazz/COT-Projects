import User from '../models/userModel.js'

export const createUser = async (req, res) => {
  const { name, email, password, verifyPassword } = req.body
  const response = await User.signup(name, email, password, verifyPassword)
  // console.log('controller ', response)
  if (!response._id) {
    res.status(400).json(response.message)
  } else {
    res.status(200).json(response)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const response = await User.login(email, password)
  // console.log(req.body)

  if (!response.user) {
    res.status(400).json(response.message)
  } else {
    res.status(200).json(response)
  }
}

export const getUser = async (req, res) => {
  const user = await User.findOne({ name: 'red' }, '-password')
  console.log(user)
  res.json(user)
}
