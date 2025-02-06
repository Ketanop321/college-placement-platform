"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  collegeName: z.string().min(2, {
    message: "College name must be at least 2 characters.",
  }),
  logo: z.string().url({
    message: "Please enter a valid URL for the logo.",
  }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  placementPolicy: z.string().min(10, {
    message: "Placement policy must be at least 10 characters.",
  }),
})

export default function CollegeSetup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeName: "",
      logo: "",
      primaryColor: "",
      secondaryColor: "",
      placementPolicy: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">College Setup</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter college name" {...field} />
                </FormControl>
                <FormDescription>This is the name that will be displayed on your portal.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter logo URL" {...field} />
                </FormControl>
                <FormDescription>Enter the URL of your college logo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <Input placeholder="#000000" {...field} />
                </FormControl>
                <FormDescription>Enter the primary color for your portal (hex code).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Color</FormLabel>
                <FormControl>
                  <Input placeholder="#FFFFFF" {...field} />
                </FormControl>
                <FormDescription>Enter the secondary color for your portal (hex code).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placementPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placement Policy</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your college's placement policy" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Describe your college's placement policy.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save College Setup</Button>
        </form>
      </Form>
    </div>
  )
}

