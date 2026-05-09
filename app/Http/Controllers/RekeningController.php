<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RekeningController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $bank = $request->string('bank')->toString();
        $noRekening = $request->string('noRekening')->toString();

        return Inertia::render('Rekening/Index', [
            'bank' => $bank,
            'noRekening' => $noRekening,
            'result' => ($bank && $noRekening) ? $this->service->validasiRekening($bank, $noRekening) : null,
        ]);
    }
}
