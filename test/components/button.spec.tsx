import React from 'react'
import renderer from 'react-test-renderer'
import { expect, test } from 'vitest'

import { Button } from '../../src'

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as renderer.ReactTestRendererJSON
}

test('Link changes the class when hovered', () => {
  const component = renderer.create(<Button>Anthony Fu</Button>)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
