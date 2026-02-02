import { fetchUsersApi } from '@/api/usersApi'
import type { ApiUser, User } from '@/types/user'
import { queryOptions } from '@tanstack/react-query'

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: fetchUsersApi,
  staleTime: 5 * 60_000,
  refetchOnWindowFocus: false,
})

export function mapApiUsersToUsers(users: ApiUser[]): User[] {
  return users.map((user) => ({
    ...user,
    source: 'api',
  }))
}
