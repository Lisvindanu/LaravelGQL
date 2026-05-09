<?php

use App\Http\Controllers\CuacaController;
use App\Http\Controllers\GempaController;
use App\Http\Controllers\HargaBBMController;
use App\Http\Controllers\HariLiburController;
use App\Http\Controllers\KalenderHijriyahController;
use App\Http\Controllers\KalenderJawaController;
use App\Http\Controllers\KodeBankController;
use App\Http\Controllers\KodePosController;
use App\Http\Controllers\KursController;
use App\Http\Controllers\NikController;
use App\Http\Controllers\PlatNomorController;
use App\Http\Controllers\TerbilangController;
use App\Http\Controllers\WaktuSholatController;
use App\Http\Controllers\WilayahController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/playground', 'Playground/Index')->name('playground');

Route::get('/wilayah', [WilayahController::class, 'index'])->name('wilayah');
Route::get('/cuaca', [CuacaController::class, 'index'])->name('cuaca');
Route::get('/kurs', [KursController::class, 'index'])->name('kurs');
Route::get('/hari-libur', [HariLiburController::class, 'index'])->name('hari-libur');
Route::get('/nik', [NikController::class, 'index'])->name('nik');
Route::get('/kalender-jawa', [KalenderJawaController::class, 'index'])->name('kalender-jawa');
Route::get('/terbilang', [TerbilangController::class, 'index'])->name('terbilang');
Route::get('/kode-bank', [KodeBankController::class, 'index'])->name('kode-bank');
Route::get('/plat-nomor', [PlatNomorController::class, 'index'])->name('plat-nomor');
Route::get('/waktu-sholat', [WaktuSholatController::class, 'index'])->name('waktu-sholat');
Route::get('/gempa', [GempaController::class, 'index'])->name('gempa');
Route::get('/kode-pos', [KodePosController::class, 'index'])->name('kode-pos');
Route::get('/kalender-hijriyah', [KalenderHijriyahController::class, 'index'])->name('kalender-hijriyah');
Route::get('/harga-bbm', [HargaBBMController::class, 'index'])->name('harga-bbm');
