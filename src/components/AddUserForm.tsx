import { createUserApi } from '@/api/usersApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  addUserDefaultValues,
  addUserSchema,
  toCreateUserPayload,
  type AddUserFormValues,
} from '@/schemas/addUserSchema'
import { useUsersStore } from '@/store/usersStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

function ErrorText({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-500">{message}</p>
}

const AddUserForm = () => {
  const navigate = useNavigate()
  const addLocalUser = useUsersStore((s) => s.addLocalUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: addUserDefaultValues,
  })

  const createUserMutation = useMutation({
    mutationFn: createUserApi,
    onSuccess: (_, variables) => {
      addLocalUser(variables)
      navigate('/users')
    },
  })

  const onSubmit = (values: AddUserFormValues) => {
    createUserMutation.mutate(toCreateUserPayload(values))
  }
  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-sm font-medium">User Details</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name*</Label>
          <Input
            id="firstName"
            placeholder="Leanne"
            {...register('firstName')}
          />
          <ErrorText message={errors.firstName?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last name*</Label>
          <Input id="lastName" placeholder="Graham" {...register('lastName')} />
          <ErrorText message={errors.lastName?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username*</Label>
          <Input id="username" placeholder="Bret" {...register('username')} />
          <ErrorText message={errors.username?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            type="email"
            placeholder="LeanneGraham@gmail.com"
            {...register('email')}
          />
          <ErrorText message={errors.email?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone*</Label>
          <Input
            id="phone"
            placeholder="+48 123 456 789"
            {...register('phone')}
          />
          <ErrorText message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="text-sm font-medium">Address</h3>

        <div className="grid gap-2">
          <Label htmlFor="street">Street*</Label>
          <Input
            id="street"
            placeholder="Kulas Light"
            {...register('street')}
          />
          <ErrorText message={errors.street?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="suite">Suite*</Label>
          <Input id="suite" placeholder="12A / 3" {...register('suite')} />
          <ErrorText message={errors.suite?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="city">City*</Label>
          <Input id="city" placeholder="Gwenborough" {...register('city')} />
          <ErrorText message={errors.city?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="zipcode">Zipcode*</Label>
          <Input id="zipcode" placeholder="00-123" {...register('zipcode')} />
          <ErrorText message={errors.zipcode?.message} />
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="text-sm font-medium">Company (optional)</h3>

        <div className="grid gap-2">
          <Label htmlFor="companyName">Company name</Label>
          <Input
            id="companyName"
            placeholder="Romaguera-Crona"
            {...register('companyName')}
          />
          <ErrorText message={errors.companyName?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="catchPhrase">Catch phrase</Label>
          <Input
            id="catchPhrase"
            placeholder="Multi-layered client-server neural-net"
            {...register('catchPhrase')}
          />
          <ErrorText message={errors.catchPhrase?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bs">BS</Label>
          <Input
            id="bs"
            placeholder="harness real-time e-markets"
            {...register('bs')}
          />
          <ErrorText message={errors.bs?.message} />
        </div>
      </div>

      {createUserMutation.isError && (
        <p className="text-sm text-red-500">
          Could not create user. Try again.
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? 'Creating...' : 'Create'}
        </Button>
        <Button variant="outline" asChild>
          <Link to="/users">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}

export default AddUserForm
