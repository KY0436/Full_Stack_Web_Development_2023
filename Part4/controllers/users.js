const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  
  try{
    const body = request.body
    const password = body.password
  
    const saltRounds = 10
    if (password.length <3){
      return response.status(400).json({error:"Both username and password must be at least 3 characters long"})
    }
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  }
  catch(exception){
    next(exception)
  }
  
})

/*
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})//.populate('blogs')
  response.json(users.map(user => user.toJSON())) 

  //response.json(users)
})*/

usersRouter.get('/', async (request, response) => {
  try{
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    response.json(users.map(u => u.toJSON()))
  }
  catch(exception){
    next(exception)
  }
})

module.exports = usersRouter