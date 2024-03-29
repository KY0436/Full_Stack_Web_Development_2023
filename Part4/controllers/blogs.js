const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
  .catch(error => next(error))
})*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
  response.json(blogs.map(blog => blog.toJSON())) 
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async(request, response) => {
  const body = request.body
  if(!body.title || !body.url){
    return response.status(400).json({error: 'The title or url properties are missing from the request data'})
  }
  // Check whether there is token in the process
  if(!request.token){
    return response.status(401).json({error: 'Unauthorized post.'})
  }

  const user = await request.user
  //const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response, next) =>{
  const user = await request.user
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === user.id.toString() ) {
    blog.remove()
    response.status(204).end()
  }
  else{
    response.status(403).end()
  }
  /*
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()*/
})


blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, 
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }, 
    { new: true })
  if (updatedBlog){
    response.status(200).json(updatedBlog)}
})

module.exports = blogsRouter