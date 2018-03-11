import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 5,
      user: {
          name: 'Test Creator'
      }
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} />)

    const headerDivBefore = blogComponent.find('.blogHeader')
    expect(headerDivBefore.text()).toContain(`${blog.title} ${blog.author}`)
    expect(blogComponent.contains(<div class="details" />)).toEqual(false)

    headerDivBefore.simulate('click')
    
    const headerDivAfter = blogComponent.find('.blogHeader')
    expect(headerDivAfter.text()).toContain(`${blog.title} ${blog.author}`)
    const detailsDiv = blogComponent.find('.details')
    const url = detailsDiv.find('.urlLink')
    expect(url.text()).toContain(`${blog.url}`)
    const likesDiv = detailsDiv.find('.likes')
    expect(likesDiv.text()).toContain(`${blog.likes} likes`)
    const userDiv = detailsDiv.find('.creator')
    expect(userDiv.text()).toContain(`Added by ${blog.user.name}`)
  })
})