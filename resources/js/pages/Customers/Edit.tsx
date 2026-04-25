import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,useForm,usePage } from '@inertiajs/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Customer',
        href: '/customers/{customer}/edit',
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
    customer: Customer;
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function Edit({customer}: PageProps) {

    const {flash} = usePage().props as PageProps;

    const {data,setData,put,processing,errors}=useForm({
        name:customer.name,
        email:customer.email,
        phoneNumber:customer.phoneNumber,
        dob:customer.dob
    });

    const handleSubmit= (e: React.FormEvent)=>{
        e.preventDefault();
        put(route('customers.update', customer.id));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Customer" />
            <div className="w-8/12 p-4">

                <form onSubmit={handleSubmit} className='space-y-4 w-auto'>
                    
                   
                    {Object.keys(errors).length>0 &&
                        <Alert variant='destructive' dismissAfterMs={3000}>


                            <AlertTitle> Errors !</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key,message])=>(
                                        <li key={key}>{message}</li>
                                    ))}
                                    {flash.error && <li>{flash.error}</li>}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    }
                    <Label htmlFor="name" > Full Name </Label>
                    <Input type='text' id='name' placeholder='customer name' value={data.name} onChange={(e)=>setData('name',e.target.value)} required/>

                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="customer email" value={data.email} onChange={(e)=>setData('email',e.target.value)} required />

                    <Label htmlFor='phoneNumber'>Phone number</Label>
                    <Input type='text' id="phoneNumber" inputMode='numeric' pattern='[0-9]*' placeholder='phone number' value={data.phoneNumber} 
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d{0,10}$/.test(value)) {
                                    setData('phoneNumber', value);
                                }
                            }} 
                    />

                    <Label htmlFor="customerbday" >Date of Birth</Label>
                    <Input type="date" value={data.dob} onChange={(e)=>setData('dob',e.target.value)} required/>

                    <Button type="submit" disabled={processing}>
                        Submit
                    </Button>

                </form>
            </div>
            
        </AppLayout>
    );
}
