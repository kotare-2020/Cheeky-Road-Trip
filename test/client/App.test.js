import React from 'react'
import { shallow } from 'enzyme'

import {App} from '../../client/components/App'

test('Title renders on App', () => {
  // Arrange
  const expected = 'Lost and Found'

  // Act
  const wrapper = shallow(<App auth={{isAuthenticated: false}}/>)
  const actual = wrapper.find('h1').text()

  // Assert
  expect(actual).toEqual(expected)
})
