<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Services\BirthdayMailService;

Schedule::call(function () {
    app(BirthdayMailService::class)->sendBirthdayEmail();
})->everyMinute();

