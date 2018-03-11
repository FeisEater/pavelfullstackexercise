import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import store from './store'
import { Provider } from 'react-redux'

describe.only('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
        window.localStorage.removeItem('loggedUser')
        app = mount(<Provider store={store}><App /></Provider>)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(app.find('.loginForm').length).toEqual(1)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      window.localStorage.setItem('loggedUser', JSON.stringify({
        token: 'token',
        username: 'username',
        name: 'Real Name'
      }))
      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(app.find('.loginForm').length).toEqual(0)
      expect(blogComponents.length).toEqual(2)
    })
  })
})
