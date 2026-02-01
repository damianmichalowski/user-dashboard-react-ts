import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'

export default function AddUserPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button asChild>
        <Link to="/users">Back</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add user</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6">
          <h3 className="text-sm font-medium">User Details</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name*</Label>
              <Input id="firstName" placeholder="Leanne" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name*</Label>
              <Input id="lastName" placeholder="Graham" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Username*</Label>
              <Input id="username" placeholder="Bret" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email*</Label>
              <Input id="email" placeholder="LeanneGraham@gmail.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone*</Label>
              <Input id="phone" placeholder="+48 123 456 789" />
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-sm font-medium">Address</h3>

            <div className="grid gap-2">
              <Label htmlFor="street">Street*</Label>
              <Input id="street" placeholder="Kulas Light" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="suite">Suite*</Label>
              <Input id="suite" placeholder="12A / 3" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City*</Label>
              <Input id="city" placeholder="Gwenborough" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="zipcode">Zipcode*</Label>
              <Input id="zipcode" placeholder="00-123" />
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-sm font-medium">Company (optional)</h3>

            <div className="grid gap-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input id="companyName" placeholder="Romaguera-Crona" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="catchPhrase">Catch phrase</Label>
              <Input
                id="catchPhrase"
                placeholder="Multi-layered client-server neural-net"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bs">BS</Label>
              <Input id="bs" placeholder="harness real-time e-markets" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button>Create</Button>
            <Button variant="outline" asChild>
              <Link to="/users">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
