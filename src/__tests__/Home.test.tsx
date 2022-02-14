import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../views/Home'

beforeEach(() => {
  render(<Home />)
})

test('homepage title', () => {
  const titleElement = screen.getByText(/A better way to enjoy every day/i)
  expect(titleElement).toBeInTheDocument()
  expect(titleElement).toHaveClass('slogan')
})

test('homepage description', () => {
  const description = screen.getByText(/Be the first to know when we launch/i)
  expect(description).toBeInTheDocument()
})

// click request button and show modal
test('homepage cta button', () => {
  const button = screen.getByRole('cta-btn')
  fireEvent.click(button);
  const formInput = screen.getByPlaceholderText(/full name/i)
  expect(formInput).toBeInTheDocument()
})

