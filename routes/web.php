<?php

use App\Http\Controllers\BandaraController;
use App\Http\Controllers\VaultController;
use App\Http\Controllers\GunungBerapiController;
use App\Http\Controllers\PahlawanController;
use App\Http\Controllers\NomorDaruratController;
use App\Http\Controllers\PresidenController;
use App\Http\Controllers\StasiunKeretaController;
use App\Http\Controllers\PTNController;
use App\Http\Controllers\BudayaDaerahController;
use App\Http\Controllers\BpjsController;
use App\Http\Controllers\CuacaController;
use App\Http\Controllers\EmasController;
use App\Http\Controllers\GempaController;
use App\Http\Controllers\HargaBBMController;
use App\Http\Controllers\HariLiburController;
use App\Http\Controllers\InflasiController;
use App\Http\Controllers\KalenderHijriyahController;
use App\Http\Controllers\KalenderJawaController;
use App\Http\Controllers\KodeBankController;
use App\Http\Controllers\KodePosController;
use App\Http\Controllers\KursController;
use App\Http\Controllers\NikController;
use App\Http\Controllers\PlatNomorController;
use App\Http\Controllers\RekeningController;
use App\Http\Controllers\SahamController;
use App\Http\Controllers\TerbilangController;
use App\Http\Controllers\UmrController;
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
Route::get('/saham', [SahamController::class, 'index'])->name('saham');
Route::get('/bpjs', [BpjsController::class, 'index'])->name('bpjs');
Route::get('/rekening', [RekeningController::class, 'index'])->name('rekening');
Route::get('/inflasi', [InflasiController::class, 'index'])->name('inflasi');
Route::get('/umr', [UmrController::class, 'index'])->name('umr');
Route::get('/emas', [EmasController::class, 'index'])->name('emas');
Route::get('/bandara', [BandaraController::class, 'index'])->name('bandara');
Route::get('/gunung-berapi', [GunungBerapiController::class, 'index'])->name('gunung-berapi');
Route::get('/pahlawan', [PahlawanController::class, 'index'])->name('pahlawan');
Route::get('/nomor-darurat', [NomorDaruratController::class, 'index'])->name('nomor-darurat');
Route::get('/presiden', [PresidenController::class, 'index'])->name('presiden');
Route::get('/stasiun-kereta', [StasiunKeretaController::class, 'index'])->name('stasiun-kereta');
Route::get('/ptn', [PTNController::class, 'index'])->name('ptn');
Route::get('/budaya-daerah', [BudayaDaerahController::class, 'index'])->name('budaya-daerah');

Route::get('/vault/login', [VaultController::class, 'showLogin'])->name('vault.login');
Route::post('/vault/login', [VaultController::class, 'login']);
Route::post('/vault/logout', [VaultController::class, 'logout'])->name('vault.logout');

Route::middleware('vault.auth')->group(function () {
    Route::inertia('/vault/dev', 'Vault/Dev')->name('vault.dev');
});