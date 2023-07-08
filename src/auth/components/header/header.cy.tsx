import { Header } from '.'

const title = 'Sign Up'
const linkComement = 'sign in of existent user'
const link = '/auth/sing-up'

describe(`Test suit by Header Auth`, () => {
  beforeEach(() => {
    cy.mount(<Header title={title} linkComment={linkComement} link={link} />)
  })

  it(`should render title`, () => {
    cy.get('h1').should('contain.text', title)
  })

  it(`should render logo`, () => {
    cy.get('svg').should('be.visible')
  })

  it(`should render Or`, () => {
    cy.get('span').should('contain.text', 'Or')
  })

  it(`should render linkComement`, () => {
    cy.get('span a').should('contain.text', linkComement)
  })

  it(`should render a`, () => {
    cy.get('span a').should('have.attr', `href`)
  })

  it(`should render link`, () => {
    cy.get(`[href='${link}']`).should('be.visible')
  })
})
