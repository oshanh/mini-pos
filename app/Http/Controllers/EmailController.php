<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\birthdayMailer;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use App\Services\BirthdayMailService;

class EmailController extends Controller
{
    public function sendBirthdayEmail()
    {
        $birthdayMailService = new BirthdayMailService();
        return $birthdayMailService->sendBirthdayEmail();
    }
}
