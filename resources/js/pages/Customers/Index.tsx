import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,Link,useForm,usePage } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    dob: string;
}

interface PageProps {
    customers: Customer[];
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: unknown;
}

export default function Index() {
    const { customers, flash } = usePage<PageProps>().props;
    const { delete:destroy,processing} = useForm();
    const [searchInput,setSearchInput]=useState('');
    

    const handleDelete = (customerId: number) => {
        if(confirm('Are you sure you want to delete this customer?')) {
            destroy(route('customers.destroy', customerId));
            
        }
    };

    const filteredCustomers= customers.filter(c=>
        c.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        c.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        c.phoneNumber.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />

            {flash.success || flash.error ? (
                <Alert variant={flash.success ? 'success' : 'destructive'} className='mb-4' dismissAfterMs={3000}>
                    <AlertTitle>{flash.success ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{flash.success || flash.error}</AlertDescription>
                </Alert>
            ) : null}


            <div className='mb-4 w-full p-4 flex items-center justify-between'>
                <Input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search customers..." className='w-1/3' />


            <Link href={route('customers.create')} className=' justify-end'>
                
                <Button >Create Customer</Button>

            </Link>
            </div>
            {filteredCustomers.length>0 ? (
                <Table>
                    <TableCaption>A list of your customers.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Date of Birth</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.id}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phoneNumber}</TableCell>
                                <TableCell>{customer.dob}</TableCell>
                                <TableCell className="space-x-3">
                                    <Link href={route('customers.edit', customer.id)}>
                                        <Button  variant="default" >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button disabled={processing} variant="destructive" onClick={() => handleDelete(customer.id)}>
                                        Delete
                                    </Button>
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No customers found</p>
            )}
        </AppLayout>
    );
}
