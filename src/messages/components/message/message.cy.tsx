import { Message } from '.'
import { MessageProvider } from '../message-provider'

describe.only(`Message component testing`, () => {
  it(`render message`, () => {
    cy.mount(
      <MessageProvider>
        <Message />
      </MessageProvider>
    )
    cy.contains('This is a message')
  })
})
