"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

   const form = useForm()
  
    const onSubmit = (formData:any) =>{
      console.log(formData)
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
              <div className="grid gap-2">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
                </div>
                <div className="grid gap-2">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
                  
                </div>
                <div className="grid gap-2">
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
                  
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Do you have an account?{" "}
                <Link href='/login' className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}


export default RegisterForm