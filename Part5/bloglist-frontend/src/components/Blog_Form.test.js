
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

// 5.16 --Test the new form
describe('<CreateBlog />', () => {
    test('Approciate action of create component', () => {
        const blogs = []
        let mockHandler = jest.fn()
        const container = render(
            <CreateBlog blogs={blogs} setBlogs={mockHandler}/>
        )

        const title = container.container.querySelector('#title')
        const author = container.container.querySelector('#author')
        const url = container.container.querySelector('#url')
        const form = container.container.querySelector('form')

        fireEvent.change(title, {target: { value: 'tester516' }})
        fireEvent.change(author, {target: { value: 'lisa' }})
        fireEvent.change(url, {target: { value: 'http://www.tester516.com' }})
        fireEvent.submit(form)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})