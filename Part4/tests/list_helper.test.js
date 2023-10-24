const listHelper = require('../utils/list_helper')


// Part 4.3
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// Part 4.4
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

// Part 4.5
describe('Favorite Blog', () => {
  const blogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
  ]

  test('When there are mutiple blogs, verify the result', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
  })
})

// Part 4.6
describe('Author who has the largest amount of blogs', () => {
  const blogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Clean Agile: Back to Basics',
      author: 'Robert C. Martin',
      likes: 3,
    },
    {
      title: 'The Robert C. Martin Clean Code Collection',
      author: 'Robert C. Martin',
      likes: 4,
    },
    {
      title: 'UML for Java Programmers',
      author: 'Robert C. Martin',
      likes: 6,
    }

  ]

  test('When there are mutiple blogs, Check the author with largest number of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(
      {
        author: "Robert C. Martin",
        blogs: 3
      }
    )
  })
})


// Part 4.7
describe('Author who has the largest amount of likes', () => {
  const blogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Clean Agile: Back to Basics',
      author: 'Robert C. Martin',
      likes: 3,
    },
    {
      title: 'The Robert C. Martin Clean Code Collection',
      author: 'Robert C. Martin',
      likes: 4,
    },
    {
      title: 'UML for Java Programmers',
      author: 'Robert C. Martin',
      likes: 6,
    }

  ]

  test('When there are mutiple blogs, Check the author with largest number of likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    )
  })
})