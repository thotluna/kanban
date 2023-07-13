import { $, Slot } from '@builder.io/qwik'
import { Message } from '.'

import { component$ } from '@builder.io/qwik'
import { MessageProvider } from '../message-provider'
import { useMessage } from '~/message/hooks'

export const MessageWithProvider = component$(() => {
  return (
    <MessageProvider>
      <Slot />
    </MessageProvider>
  )
})

type props = {
  time: number
}

export const SetMessage = component$(({ time }: props) => {
  const { createMessageSuccess } = useMessage()

  const handler = $(() => {
    createMessageSuccess({ message: 'This is a message', timeout: time })
  })

  return (
    <div>
      <button onClick$={handler}>Set Message</button>
      <Message />
    </div>
  )
})

describe('Testing message component', () => {
  it('render without timeout', () => {
    cy.mount(
      <MessageProvider>
        <SetMessage time={0} />
      </MessageProvider>
    )

    cy.get('button').should('contain.text', 'Set Message').click()
    cy.get('[data-test-id="messages"]').as('messageElement')

    cy.get('@messageElement').should('contain.text', 'This is a message')
    cy.get('button').last().click()
    cy.get('@messageElement').should('not.exist')
  })

  it('render with timeout', () => {
    const timeout = 500
    cy.mount(
      <MessageProvider>
        <SetMessage time={timeout} />
      </MessageProvider>
    )

    cy.get('button').should('contain.text', 'Set Message').click()
    cy.get('[data-test-id="messages"]').as('messageElement')

    cy.get('@messageElement').should('contain.text', 'This is a message')
    cy.wait(timeout)
    cy.get('@messageElement').should('not.exist')
  })
})
