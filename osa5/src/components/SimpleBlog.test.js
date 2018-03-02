import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')
    
    expect(contentDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(likesDiv.text()).toContain(` ${blog.likes} `)
  })

  it('clicking the like button twice calls event handler twice', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        likes: 5
    }
  
    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})