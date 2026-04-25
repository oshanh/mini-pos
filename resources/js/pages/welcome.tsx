import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="POS Customer Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=space-grotesk:400,500,600,700" rel="stylesheet" />
            </Head>
                <div className="flex flex-col items-center justify-center h-screen gap-6 px-6">

  <h1 className="text-3xl font-bold text-center">
    Welcome to Mini-POS
  </h1>

  {auth.user ? (
    <div className="flex gap-4">
      <Link
        href={route('customers.index')}
        className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
      >
        Open Customer Manager
      </Link>

      <Link
        href={route('dashboard')}
        className="rounded-lg border border-slate-400 px-5 py-2.5 text-sm font-semibold transition hover:border-slate-900"
      >
        Dashboard
      </Link>
    </div>
  ) : (
    <Link
      href={route('login')}
      className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
    >
      Login
    </Link>
  )}

</div>
        </>
    );
}
