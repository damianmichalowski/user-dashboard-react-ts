export type User = {
  id: number
  source: 'api' | 'local'
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company?: Company
}

export type ApiUser = Omit<User, 'source'>

export type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
}

export type Company = {
  name: string
  catchPhrase?: string
  bs?: string
}
