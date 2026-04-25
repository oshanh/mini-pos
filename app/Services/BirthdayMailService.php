<?php
namespace App\Services;

use Illuminate\Http\Request;
use App\Mail\birthdayMailer;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;


class BirthdayMailService
{
public function sendBirthdayEmail()
    {
        $today=now()->format('Y-m-d');
        try{
            $customers=DB::table('customers')->whereDate('dob', $today)->get();
        }
        catch(\Exception $e){
            return 'An error occurred while fetching customers: '.$e->getMessage();
        }
        if($customers->isEmpty()){
            return 'No birthdays today.';
        }
        foreach($customers as $customer){
            
            $customerDob=Carbon::parse($customer->dob)->format('Y-m-d');
            
            if($customerDob==$today){
                try{
                    Mail::to(config('mail.to.admin'))->send(new BirthdayMailer($customer));
                }
                catch(\Exception $e){
                    return 'Failed to send email: '.$e->getMessage();
                }
                
            }

            
        }

        return $customers->count().'Birthday email reminders sent successfully!';
    }

}





