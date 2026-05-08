export interface Provinsi {
    kode: string;
    nama: string;
}

export interface Kota {
    kode: string;
    nama: string;
}

export interface Kelurahan {
    kode: string;
    nama: string;
    kodePos: string | null;
}

export interface Kecamatan {
    kode: string;
    nama: string;
    kelurahan: Kelurahan[];
}

export interface KotaDetail {
    nama: string;
    kecamatan: Kecamatan[];
}

export interface ProvinsiDetail {
    nama: string;
    kota: Kota[];
}

export interface WilayahResult {
    kode: string;
    nama: string;
    tipe: string;
    kota: string;
    provinsi: string;
}

export interface Prakiraan {
    waktu: string;
    suhu: string;
    kelembapan: string;
    cuaca: string;
    kecepatanAngin: string;
    arahAngin: string;
}

export interface CuacaData {
    kota: string;
    prakiraan: Prakiraan[];
}

export interface KursItem {
    mataUang: string;
    kursBeli: number;
    kursJual: number;
    kursTengah: number;
    tanggal: string;
}

export interface HariLiburItem {
    tanggal: string;
    nama: string;
    jenis: string;
}

export interface NIKResult {
    valid: boolean;
    nik?: string;
    provinsi: string;
    kota: string;
    kecamatan?: string;
    tanggalLahir: string;
    jenisKelamin: string;
    errors: string[];
}

export interface KalenderJawaResult {
    tanggalMasehi: string;
    hari: string;
    pasaran: string;
    wuku: string;
    tahunJawa: number;
    namaWindu: string;
    tahunDalamWindu: string;
}

export interface TerbilangResult {
    angka: number;
    terbilang: string;
}

export interface KodeBankItem {
    kode: string;
    nama: string;
}

export interface PlatNomorResult {
    kode: string;
    wilayah: string;
    provinsi: string;
}

export interface WaktuSholatResult {
    kota: string;
    tanggal: string;
    subuh: string;
    terbit: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
}
