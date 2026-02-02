import type { User } from '@/types/user'
import { z } from 'zod'

const zipcodeRegex = /^(\d{2}-\d{3}|\d{5}(?:-\d{4})?)$/

export const addUserSchema = z
  .object({
    firstName: z.string().trim().min(2, 'First name is required.'),
    lastName: z.string().trim().min(2, 'Last name is required.'),
    username: z.string().trim().min(2, 'Username is required.'),
    email: z.email('Email is invalid.'),
    phone: z.string().trim().min(6, 'Phone is required.'),
    street: z.string().trim().min(2, 'Street is required.'),
    suite: z.string().trim().min(1, 'Suite is required.'),
    city: z.string().trim().min(2, 'City is required.'),
    zipcode: z
      .string()
      .trim()
      .regex(zipcodeRegex, 'Zipcode format is invalid.'),
    companyName: z.string().trim().optional(),
    catchPhrase: z.string().trim().optional(),
    bs: z.string().trim().optional(),
  })
  .superRefine((value, ctx) => {
    const hasCompanyDetails = Boolean(value.catchPhrase || value.bs)
    const hasCompanyName = Boolean(value.companyName)

    if (hasCompanyDetails && !hasCompanyName) {
      ctx.addIssue({
        code: 'custom',
        message: 'Company name is required when company details are provided.',
        path: ['companyName'],
      })
    }
  })

export type AddUserFormValues = z.infer<typeof addUserSchema>

export const addUserDefaultValues: AddUserFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  companyName: '',
  catchPhrase: '',
  bs: '',
}

export function toCreateUserPayload(
  values: AddUserFormValues
): Omit<User, 'id' | 'source'> {
  const company = values.companyName
    ? {
        name: values.companyName,
        catchPhrase: values.catchPhrase || undefined,
        bs: values.bs || undefined,
      }
    : undefined

  return {
    name: `${values.firstName} ${values.lastName}`.trim(),
    username: values.username,
    email: values.email,
    address: {
      street: values.street,
      suite: values.suite,
      city: values.city,
      zipcode: values.zipcode,
    },
    phone: values.phone,
    website: '',
    company,
  }
}
