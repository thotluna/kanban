import { Message } from '.'

describe.only(`Message component testing`, () => {
  it(`render message`, () => {
    cy.mount(<Message />)
    cy.contains('This is a message')
  })
})
