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
import { Link } from 'react-router-dom'

export default function UsersPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
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
          <Input placeholder="Search by address (street/city/zip...)" />
          <Button variant="outline" className="sm:w-[160px]">
            Sort: ASC
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
                <TableRow>
                  <TableCell>Leanne Graham</TableCell>
                  <TableCell>Bret</TableCell>
                  <TableCell>Sincere@april.biz</TableCell>
                  <TableCell>
                    Kulas Light Apt. 556, Gwenborough 92998-3874
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/users/1">View</Link>
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
