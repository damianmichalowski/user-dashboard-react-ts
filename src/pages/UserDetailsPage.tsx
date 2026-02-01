import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, useParams } from 'react-router-dom'

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm">{value?.trim() ? value : '—'}</div>
    </div>
  )
}

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const user = {
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-market',
    },
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Button asChild>
        <Link to="/users">Back</Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {user.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          User ID: <span className="font-mono">{id}</span>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" value={user.name} />
            <Field label="Username" value={user.username} />
            <Field label="Email" value={user.email} />
            <Field label="Phone" value={user.phone} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Street" value={user.address.street} />
            <Field label="Suite" value={user.address.suite} />
            <Field label="City" value={user.address.city} />
            <Field label="Zipcode" value={user.address.zipcode} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {user.company?.name ? (
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
