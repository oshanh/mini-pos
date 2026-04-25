# Mini-POS

Mini-POS is a simple POS and customer management app built with Laravel and Inertia.

## Setup

```bash
cd pos
npm install
php artisan migrate
```

## Run the app

```bash
composer run dev
```

## Birthday reminder scheduler

Run the scheduled task in a separate terminal:

```bash
php artisan schedule:work
```

