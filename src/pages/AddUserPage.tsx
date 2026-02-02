import AddUserForm from '@/components/AddUserForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AddUserPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add user</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6">
          <AddUserForm />
        </CardContent>
      </Card>
    </div>
  )
}
