import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardTitle className="text-2xl">404 - Page not found</CardTitle>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The page you are looking for does not exist.
          </p>

          <Button asChild className="w-full">
            <Link to="/users">Back to users</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
