import { describe, expect, it } from 'vitest'
import { addUserSchema } from './addUserSchema'

describe('addUserSchema', () => {
  it('accepts minimal valid form data', () => {
    const result = addUserSchema.safeParse({
      firstName: 'Jan',
      lastName: 'Kowalski',
      username: 'jkowalski',
      email: 'jan@example.com',
      phone: '123456789',
      street: 'Main',
      suite: '1',
      city: 'Warsaw',
      zipcode: '00-123',
      companyName: '',
      catchPhrase: '',
      bs: '',
    })

    expect(result.success).toBe(true)
  })
})
