
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building, Loader2, PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { mockBranches, addBranch, removeBranch } from '@/lib/branches';
import type { Branch } from '@/lib/branches';
import { Textarea } from '@/components/ui/textarea';

const addBranchSchema = z.object({
  name: z.string().min(2, 'Branch name is required.'),
  address: z.string().min(10, 'A complete address is required.'),
  phone: z.string().min(10, 'A valid phone number is required.'),
});

type AddBranchFormValues = z.infer<typeof addBranchSchema>;

export default function BranchManagementPage() {
  const { toast } = useToast();
  const [branches, setBranches] = React.useState<Branch[]>(mockBranches);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<AddBranchFormValues>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
    },
  });

  const handleAddBranch = (data: AddBranchFormValues) => {
    setIsLoading(true);
    addBranch({
      name: data.name,
      address: data.address,
      phone: data.phone,
    });
    setBranches([...mockBranches]); // Refresh state from the source
    toast({
      title: 'Branch Added!',
      description: `The ${data.name} branch has been successfully created.`,
    });
    form.reset();
    setIsLoading(false);
  };

  const handleDeleteBranch = (branchId: string) => {
    removeBranch(branchId);
    setBranches([...mockBranches]); // Refresh state from the source
    toast({
      title: 'Branch Removed',
      description: 'The branch has been removed.',
      variant: 'destructive'
    });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Building className="h-8 w-8 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Branch Management</h1>
            <p className="text-muted-foreground">Add, edit, or remove store branches.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Existing Branches</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Branch Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>
                        <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {branches.map((branch) => (
                        <TableRow key={branch.id}>
                        <TableCell className="font-medium">{branch.name}</TableCell>
                        <TableCell>{branch.address}</TableCell>
                        <TableCell>{branch.phone}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteBranch(branch.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                 {branches.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">No branches found. Add one to get started.</div>
                )}
                </CardContent>
            </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Branch</CardTitle>
              <CardDescription>Fill out the form to add a new branch.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddBranch)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Downtown Branch" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complete Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Main St, Anytown, USA 12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                      Add Branch
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
