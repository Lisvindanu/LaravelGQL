<?php

use App\Http\Controllers\CuacaController;
use App\Http\Controllers\HariLiburController;
use App\Http\Controllers\KalenderJawaController;
use App\Http\Controllers\KursController;
use App\Http\Controllers\NikController;
use App\Http\Controllers\TerbilangController;
use App\Http\Controllers\WilayahController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/wilayah', [WilayahController::class, 'index'])->name('wilayah');
Route::get('/cuaca', [CuacaController::class, 'index'])->name('cuaca');
Route::get('/kurs', [KursController::class, 'index'])->name('kurs');
Route::get('/hari-libur', [HariLiburController::class, 'index'])->name('hari-libur');
Route::get('/nik', [NikController::class, 'index'])->name('nik');
Route::get('/kalender-jawa', [KalenderJawaController::class, 'index'])->name('kalender-jawa');
Route::get('/terbilang', [TerbilangController::class, 'index'])->name('terbilang');
