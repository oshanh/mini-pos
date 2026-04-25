<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        try{
            $customers=Customer::all();
        }
        catch(QueryException $e){
            return redirect()->back()->with('error', 'An error occurred while fetching customers.');
        }
        catch(Exception $e){
            return redirect()->back()->with('error', 'An unexpected error occurred.');
        }
        
        return Inertia::render('Customers/Index', compact('customers'));
    }

    public function create()
    {
        return Inertia::render('Customers/Create',[]);
    }

    public function store(Request $request){
        
        $validated=$request->validate([
            'name'=>'required | string',
            'email' => 'required | email:rfc,dns',
            'phoneNumber' => ' nullable |numeric',
            'dob'=>'required | date '

        ]);
        try{
            Customer::create($validated);
            return redirect()->route('customers.index')->with('success', 'Customer created!');
        }
        catch(QueryException $e){
            return redirect()->back()->with('error', 'An error occurred while creating the customer.');
        }
        catch(Exception $e){
            return redirect()->back()->with('error', 'An unexpected error occurred.');
        }
        
    }

    public function destroy (Customer $customer){
        try{
            $customer->delete();
            return redirect()->route('customers.index')->with('success', 'Customer deleted!');
        }
        catch(QueryException $e){
            return redirect()->back()->with('error', 'An error occurred while deleting the customer.');
        }
        catch(Exception $e){
            return redirect()->back()->with('error', 'An unexpected error occurred.');
        }
    }

    public function edit(Customer $customer){
        return Inertia::render('Customers/Edit',compact('customer'));
    }

    public function update(Request $request, Customer $customer){
        $validated=$request->validate([
            'name'=>'required | string',
            'email' => 'required | email',
            'phoneNumber' => ' nullable |numeric',
            'dob'=>'required | date '

        ]);
        
        try{
            $customer->update($validated);
            return redirect()->route('customers.index')->with('success', 'Customer updated!');
        }
        catch(QueryException $e){
            return redirect()->back()->with('error', 'An error occurred while updating the customer.');
        }
        catch(Exception $e){
            return redirect()->back()->with('error', 'An unexpected error occurred.');
        }
    }

    public function getstats(){
        try{
            $totalCustomers=Customer::count();
        }
        catch(QueryException $e){
            return redirect()->back()->with('error', 'An error occurred while fetching statistics.');
        }
        catch(Exception $e){
            return redirect()->back()->with('error', 'An unexpected error occurred.');
        }
        $stats=[
            'totalCustomers'=>$totalCustomers
        ];
        return Inertia::render('dashboard',compact('stats'));
    }
}
