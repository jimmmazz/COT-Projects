import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose
const prohibitedSelcialCharacters = ['<', '>', '=', '"']

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// static signup method
userSchema.statics.signup = async function (
  name,
  email,
  password,
  verifyPassword
) {
  try {
    if (!email || !password || !name || !verifyPassword) {
      throw Error('All fields must be filled')
    }
    const combinedPasswords = password.concat(verifyPassword)
    const isNotAllowed = prohibitedSelcialCharacters.filter((char) =>
      combinedPasswords.includes(char)
    )
    if (isNotAllowed.length > 0) {
      throw Error('Password can not contain <, >, =, or "')
    }
    if (!validator.isLength(password, { min: 4, max: 12 })) {
      throw Error('Password must between 4 and 12 characters.')
    }
    if (password !== verifyPassword) {
      throw Error('Passwords do not match.')
    }
    // validation
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    email = validator.normalizeEmail(email)

    const exists = await this.findOne({ email })

    if (exists) {
      throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    user.password = null
    console.log('model ', user)
    return user
  } catch (error) {
    // console.log('catch ', error.message)
    return error
  }
}

userSchema.statics.login = async function (email, password) {
  try {
    // validation
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    const isNotAllowed = prohibitedSelcialCharacters.filter((char) =>
      password.includes(char)
    )
    if (isNotAllowed.length > 0) {
      throw Error('Password can not contain <, >, =, or "')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    email = validator.normalizeEmail(email)

    const user = await this.findOne({ email })
    console.log(user)

    if (!user) {
      throw Error('Email or password not correct.')
    }
    // if (validator.escape(password)) {
    //   console.log(validator.escape(password))
    //   return { user: null }
    // }

    const isCompared = await bcrypt.compare(password, user.password)

    if (isCompared) {
      user.password = null

      //add token to user object
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60,
        }
      )

      return { user, token }
    } else {
      throw Error('Email or password not correct.')
    }
  } catch (error) {
    // console.log(error.message)
    return error
  }
}

export default model('User', userSchema)
