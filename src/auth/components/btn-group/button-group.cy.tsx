import { $ } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '~/auth/constants'
import { ButtonGroup } from '.'

const handler = $(() => {})

describe('Testing Button group', () => {
  it(`render two button`, () => {
    cy.mount(
      <ButtonGroup
        isLoading={false}
        action={undefined}
        onAuthGithub={handler}
        onAuthGoogle={handler}
      />
    )

    cy.get(`[data-test-id='btn-group'] > :nth-child(1)`).should(
      'contain.text',
      'Github'
    )
    cy.get(`[data-test-id='btn-group'] > :nth-child(2)`).should(
      'contain.text',
      'Google'
    )
  })

  it(`render two disabled button`, () => {
    cy.mount(
      <ButtonGroup
        isLoading={true}
        action={undefined}
        onAuthGithub={handler}
        onAuthGoogle={handler}
      />
    )

    cy.get(`[data-test-id='btn-group'] > :nth-child(1)`).should('be.disabled')
    cy.get(`[data-test-id='btn-group'] > :nth-child(2)`).should('be.disabled')
  })

  it(`render Spinner be Github button and two disabled button`, () => {
    cy.mount(
      <ButtonGroup
        isLoading={true}
        action={AUTH_ACTIONS.GITHUB}
        onAuthGithub={handler}
        onAuthGoogle={handler}
      />
    )

    cy.get(`[role='status']`).should('be.visible')
    cy.get(`[data-test-id='btn-group'] > :nth-child(2)`).should('be.disabled')
  })

  it(`render Spinner be Google button and two disabled button`, () => {
    cy.mount(
      <ButtonGroup
        isLoading={true}
        action={AUTH_ACTIONS.GOOGLE}
        onAuthGithub={handler}
        onAuthGoogle={handler}
      />
    )

    cy.get(`[data-test-id='btn-group'] > :nth-child(2) [role='status']`).should(
      'be.visible'
    )
  })
})
