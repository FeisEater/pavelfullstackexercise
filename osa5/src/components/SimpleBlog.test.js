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
})