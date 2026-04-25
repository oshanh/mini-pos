import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UserRoundPen } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    stats?: {
        totalCustomers: number;
    };
}

export default function Dashboard({ stats }: Readonly<PageProps>) {
    const totalCustomers = stats?.totalCustomers ?? 0;
   


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Welcome to the POS Customer Management Dashboard</h1>
                <div className='border-2 rounded-md p-4'>
                    <UserRoundPen className="inline-block mr-2" />
                    Total Customers: <span className="font-semibold">{totalCustomers}</span>
                </div>
                
            </div>
        </AppLayout>
    );
}
