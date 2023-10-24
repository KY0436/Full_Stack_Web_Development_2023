const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// 4.16- Check the length of the password
test('Check the length of the password', async () => {
  const response = await api.get("/api/users")

  const newUser = {
    username: "Marcus Rasmus",
    name: "rasmus",
    password: "ht"
  }
  await api.post(`/api/users`).send(newUser).expect(400)
})

// 4.16- Check the length of the username
test('Check the length of the username', async () => {
  const response = await api.get("/api/users")

  const newUser = {
    username: "Ma",
    name: "rasmus",
    password: "h12312t"
  }
  await api.post(`/api/users`).send(newUser).expect(400)
})

// 4.16- Check the repeated username
test('Check the repeated username', async() => {
  const response = (await api.get('/api/users')).body
  const testUsername = response[0].username
  const testUser = {
      username: `${testUsername}`,
      name: "fly1",
      password: "sdfs"
  }

  await api.post('/api/users').send(testUser).expect(400)
})

