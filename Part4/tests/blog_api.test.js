const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const api = supertest(app)

// 4.8- Return the correct amount of blog posts
test('Returns the correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(2)
})

// 4.9- Check the ID of each blog
test('Check the unique identifier property', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  expect(response.body[0].id).toBeDefined()
})

// 4.10- Check the POST Method && 4.23- Fix the POST method
test('The number of the blogs should increase by 1 after post a new one', async() => {
  const userInfo = {
    username: "tester",
    password: "000000",
  }
  const loginInfo = await api.post('/api/login').send(userInfo)
  console.log(loginInfo.body.token)

  const initialLength = (await api.get('/api/blogs')).body.length
  const newBlog = {
      title: "Phycis II",
      author: "Scientist",
      url: "https://www.pearson.com/PhysicsII",
      likes: 191
  } 
  await api.post('/api/blogs').set({ "Authorization": `Bearer ${loginInfo.body.token}` }).send(newBlog)
  const afterwardsLength = await api.get('/api/blogs')
  expect(afterwardsLength.body).toHaveLength(initialLength + 1)
})

// 4.11- Check the "likes" property in the blogs
test('Check the likes property in the blogs', async() => {
  let posted = {}
  const newBlog = {
      title: "Yesterday Once more",
      author: "Carpenter",
      url: "https://www.youtube.com/watch?v=YTaWayUE5XA"
  } 
  await api.post('/api/blogs').send(newBlog)
  afterwardsLength.forEach(element => {
    if(element.title === newBlog.title){
      posted = element
    }
  })
  expect(posted.likes).toBe(0)
})

// 4.12- Check the url property in the blogs
test('Check the url property in the blogs', async() => {
  const detectedBlog = {
      title: "Harry Potter",
      author: "J. K. Rowling",
      //missing url
  } 
  await api.post('/api/blogs').send(detectedBlog).expect(400)
})

// 4.12- Check the title property in the blogs
test('Check the title property in the blogs', async() => {
  const detectedBlog = {
      //title: "Harry Potter",
      author: "J. K. Rowling",
      url: "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone"
  } 
  await api.post('/api/blogs').send(detectedBlog).expect(400)
})

// 4.13- Blog list expansion
test("Delete blog post", async () => {
  const newBlog = {
    title: "Jane Eyre",
    author: "Charlotte Bronte",
    url: "https://en.wikipedia.org/wiki/Jane_Eyre",
  };

  await api.post("/api/blogs").send(newBlog).expect(201)
  const response = await api.get("/api/blogs");


  const ids = response.body.map(
    (b) => b.id);
  await api.delete(`/api/blogs/${response.body[ids.length-1].id}`).expect(204);
})

afterAll(async () => {
  await mongoose.connection.close()
})

// 4.14- Updating the information of blogs
test('Response code should be 200 after update the blog', async() => {
  const response = await api.get("/api/blogs")
  const ids = response.body.map(
    (b) => b.id);
  const random_id = ids[Math.floor(Math.random() * ids.length)];
  console.log(random_id)

  const newBlog = {
    title: "Jane Eyre",
    author: "Charlotte Bronte",
    url: "https://en.wikipedia.org/wiki/Jane_Eyre",
    likes: 19,
  }
  await api.put(`/api/blogs/${random_id}`).send(newBlog).expect(200)
})

// 4.23- Test the authorization token
test('Test the authorization token', async() => {
  const newBlog = {
      title: "ASDFASDFS",
      author: "Nerlens Okafor",
      url: "https://www.dsadfsdfs.com",
      likes: 1
  } 
  await api.post('/api/blogs').send(newBlog).expect(401)
})
