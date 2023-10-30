import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog  from './Blog'

describe('<Blog />', () => {
  let container
  
  let mockHandler = jest.fn()

  // Constrcut the blog before each test
  beforeEach(() => {
      // Initiailize the test
      const blog = {
          author: 'Tester513', 
          title: 'How to test',
          likes: '2123',
          url: 'http://www.tester513.com',
          user:{
              username: 'zhang',
              name: 'zhangsan',
          }
      }

      // Render the Blog component
      container = render(<Blog blog={blog} handleUpdate={mockHandler}/>)
  })
})

// Test 5.13 - Checks blog's title and author
test("Checks blog's title and author", () => {
  const test_title = container.container.querySelector(".title");
  expect(test_title).toHaveTextContent(blog.title);

  const test_author = container.container.querySelector(".author");
  expect(test_author).toHaveTextContent(blog.author);
})

// Test 5.14 - Check blog's URL and number
test("Checks blog URL and number of likes", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const test_url = container.container.querySelector(".url");
  expect(test_url).toHaveTextContent(blog.url)

  const test_likes = container.container.querySelector(".likes");
  expect(test_likes).toHaveTextContent(blog.likes)
})

// Test 5.15 - Check the like button is clicked twice
test("Check the like button is clicked twice", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("like");
  // Double Click the button
  await user.click(button);
  await user.click(button);

  expect(blogService.update).toHaveBeenCalledTimes(2);
})