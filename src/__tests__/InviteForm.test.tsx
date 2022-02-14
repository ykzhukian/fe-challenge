import { render, screen, fireEvent } from '@testing-library/react'
import InvitationForm from '../components/InvitationForm'

beforeEach(() => {
  render(<InvitationForm />)
})

test('invite form validation', () => {
  const form = screen.getByRole('invite-form')
  fireEvent.submit(form)

  const errMsg = screen.getByText(/Please enter your full name/i)
  expect(errMsg).toBeInTheDocument()
})

test('fill out different email address', () => {
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

test('submit invite form', () => {
  // fill out the form correctly
  fireEvent.change(screen.getByPlaceholderText(/full name/i), {
    target: { value: 'Mr Test' },
  })
  fireEvent.change(screen.getByPlaceholderText('Email address'), {
    target: { value: 'test@email.com' },
  })
  fireEvent.change(screen.getByPlaceholderText('Confirm email address'), {
    target: { value: 'test@email.com' },
  })

  const submitBtn = screen.getByText(/send/i)
  fireEvent.click(submitBtn);
  expect(submitBtn).toHaveTextContent('Loading...')
})

