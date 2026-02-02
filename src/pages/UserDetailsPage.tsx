import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mapApiUsersToUsers, usersQueryOptions } from '@/lib/users-query'
import { useUsersStore } from '@/store/usersStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm">{value?.trim() ? value : '--'}</div>
    </div>
  )
}

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const userId = Number(id)

  const apiUsers = useUsersStore((s) => s.apiUsers)
  const localUsers = useUsersStore((s) => s.localUsers)
  const setApiUsers = useUsersStore((s) => s.setApiUsers)

  const { data, isLoading, isError } = useQuery({
    ...usersQueryOptions,
    enabled: apiUsers.length === 0,
  })

  useEffect(() => {
    if (!data) return
    setApiUsers(mapApiUsersToUsers(data))
  }, [data, setApiUsers])

  const user = useMemo(() => {
    if (!Number.isFinite(userId)) return undefined
    return [...localUsers, ...apiUsers].find((u) => u.id === userId)
  }, [apiUsers, localUsers, userId])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {user?.name ?? 'User not found'}
        </h1>
        <p className="text-sm text-muted-foreground">
          User ID: <span className="font-mono">{id}</span>
        </p>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading user...</p>
      )}
      {isError && (
        <p className="text-sm text-muted-foreground">
          Failed to load user from API.
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" value={user?.name} />
            <Field label="Username" value={user?.username} />
            <Field label="Email" value={user?.email} />
            <Field label="Phone" value={user?.phone} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Street" value={user?.address?.street} />
            <Field label="Suite" value={user?.address?.suite} />
            <Field label="City" value={user?.address?.city} />
            <Field label="Zipcode" value={user?.address?.zipcode} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {user?.company?.name ? (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Company name" value={user.company.name} />
                <Field label="Catch phrase" value={user.company.catchPhrase} />
              </div>
              <Field label="BS" value={user.company.bs} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No company provided.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/users">Back to list</Link>
        </Button>
      </div>
    </div>
  )
}
