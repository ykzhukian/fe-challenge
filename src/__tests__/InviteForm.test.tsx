import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import InvitationForm from '../components/InvitationForm'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('/prod/fake-auth', (req, res, ctx) => {
    const response = res(ctx.status(200), ctx.json('registered mock'))
    console.log('mock api:', response);
    return response;
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

test('invite form validation', () => {
  render(<InvitationForm />)

  const form = screen.getByRole('invite-form')
  fireEvent.submit(form)

  const errMsg = screen.getByText(/Please enter your full name/i)
  expect(errMsg).toBeInTheDocument()
})

test('fill out different email address', () => {
  render(<InvitationForm />)

  // fill out the email inputs with different emails
  fireEvent.change(screen.getByPlaceholderText('Email address'), {
    target: { value: 'test@email.com' },
  })
  fireEvent.change(screen.getByPlaceholderText('Confirm email address'), {
    target: { value: 'tests@email.com' },
  })
  
  const form = screen.getByRole('invite-form')
  fireEvent.submit(form);
  const emailErrMsg = screen.getByText(/different email addresses/i)
  expect(emailErrMsg).toBeInTheDocument()
})

test('submit invite form', async () => {

  const { getByText, getByPlaceholderText } = render(<InvitationForm />)

  // fill out the form correctly
  fireEvent.change(getByPlaceholderText(/full name/i), {
    target: { value: 'Mr Test' },
  })
  fireEvent.change(getByPlaceholderText('Email address'), {
    target: { value: 'test@email.com' },
  })
  fireEvent.change(getByPlaceholderText('Confirm email address'), {
    target: { value: 'test@email.com' },
  })

  const submitBtn = getByText(/send/i)
  fireEvent.click(submitBtn);
  expect(submitBtn).toHaveTextContent('Loading...')

  await waitFor(() => {
    expect(getByText("Thank you!")).toBeInTheDocument()
    expect(submitBtn).not.toBeInTheDocument()
  });

})

