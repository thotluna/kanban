import { Message } from '.'
import { MessageProvider } from '../message-provider'

import { $, component$ } from '@builder.io/qwik'
import { useMessage } from '~/messages/hooks'
type Props = {
  milliseconds?: 'forever' | number
}
export const MessageTest = component$<Props>(({ milliseconds = 0 }) => {
  const { createMessageError } = useMessage()

  const HandlerClickError = $(() => {
    createMessageError({
      message: 'This is a Message Error',
      milisecons: milliseconds,
    })
  })

  return (
    <>
      <button onClick$={HandlerClickError}>Set Error</button>
      <Message />
    </>
  )
})

describe(`Message component testing`, () => {
  it(`render message`, () => {
    cy.mount(
      <MessageProvider>
        <Message />
      </MessageProvider>
    )
    cy.contains('This is a message')
  })

  it(`render message error set outdoor`, () => {
    cy.mount(
      <MessageProvider>
        <MessageTest />
      </MessageProvider>
    )
    cy.get('button').first().should('contain.text', 'Set Error').click()
    cy.get('[data-test-id="message-component"]').as('messageTest')
    cy.get('@messageTest').should('contain.text', 'This is a Message Error')
    cy.get('button').last().click()
    cy.get('@messageTest').should('not.exist')
  })

  it(`render message error set outdoor close with time`, () => {
    cy.mount(
      <MessageProvider>
        <MessageTest milliseconds={1200} />
      </MessageProvider>
    )
    cy.get('button').first().should('contain.text', 'Set Error').click()
    cy.get('[data-test-id="message-component"]').as('messageTest')
    cy.get('@messageTest').should('contain.text', 'This is a Message Error')
    cy.wait(1200)
    cy.get('@messageTest').should('not.exist')
  })
})
