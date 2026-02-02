import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mapApiUsersToUsers, usersQueryOptions } from '@/lib/users-query'
import { useUsersStore } from '@/store/usersStore'
import type { User } from '@/types/user'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function UsersPage() {
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState<'none' | 'asc' | 'desc'>('none')

  const apiUsers = useUsersStore((s) => s.apiUsers)
  const localUsers = useUsersStore((s) => s.localUsers)
  const hiddenApiIds = useUsersStore((s) => s.hiddenApiIds)
  const setApiUsers = useUsersStore((s) => s.setApiUsers)
  const hideApiUser = useUsersStore((s) => s.hideApiUser)
  const removeLocalUser = useUsersStore((s) => s.removeLocalUser)

  const { data, isLoading, isError } = useQuery(usersQueryOptions)

  useEffect(() => {
    if (!data) return
    setApiUsers(mapApiUsersToUsers(data))
  }, [data, setApiUsers])

  const visibleUsers = useMemo(() => {
    const apiVisible = apiUsers.filter((u) => !hiddenApiIds.includes(u.id))
    const combined = [...localUsers, ...apiVisible]
    const q = query.trim().toLowerCase()

    const filtered = q
      ? combined.filter((u) => {
          const searchable = [
            u.name,
            u.username,
            u.email,
            u.address.street,
            u.address.suite,
            u.address.city,
            u.address.zipcode,
          ]
            .join(' ')
            .toLowerCase()

          return searchable.includes(q)
        })
      : combined

    if (sortMode === 'none') return filtered

    return filtered.sort((a, b) => {
      const left = a.name.toLowerCase()
      const right = b.name.toLowerCase()
      if (left === right) return 0
      if (sortMode === 'asc') return left < right ? -1 : 1
      return left > right ? -1 : 1
    })
  }, [apiUsers, hiddenApiIds, localUsers, query, sortMode])

  const handleDelete = (user: User) => {
    if (user.source === 'api') {
      hideApiUser(user.id)
      return
    }
    removeLocalUser(user.id)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        </div>

        <Button asChild>
          <Link to="/users/add">+ Add user</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search by address (name/username/email/street/city/zip...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setSortMode((v) =>
                v === 'none' ? 'asc' : v === 'asc' ? 'desc' : 'none'
              )
            }
          >
            Sort: {sortMode === 'none' ? 'Default' : sortMode.toUpperCase()}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={5}>Loading...</TableCell>
                  </TableRow>
                )}
                {!isLoading && isError && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      Failed to load users from API.
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && !isError && visibleUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>No users found.</TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  !isError &&
                  visibleUsers.map((user) => (
                    <TableRow key={`${user.source}-${user.id}`}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.address.street} {user.address.suite},{' '}
                        {user.address.city} {user.address.zipcode}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/users/${user.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
