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

export interface GempaItem {
    tanggal: string;
    jam: string;
    magnitude: string;
    kedalaman: string;
    lintang: string;
    bujur: string;
    wilayah: string;
    potensi: string;
    dirasakan: string;
}

export interface KodePosResult {
    kodePos: string;
    kelurahan: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
}

export interface KalenderHijriyahResult {
    tanggalMasehi: string;
    tanggalHijriyah: string;
    hari: string;
    hariArab: string;
    bulan: string;
    bulanArab: string;
    tahun: number;
}

export interface HargaBBMItem {
    nama: string;
    harga: number;
    satuan: string;
    jenis: string;
}

export interface IHSGResult {
    symbol: string;
    nama: string;
    harga: number;
    perubahan: number;
    persentasePerubahan: number;
    open: number;
    high: number;
    low: number;
    volume: number;
    waktu: string;
}

export interface IuranBpjsItem {
    kelas: string;
    segmen: string;
    nominal: number;
    keterangan: string;
}

export interface ValidasiRekeningResult {
    valid: boolean;
    bank: string;
    noRekening: string;
    panjang: number;
    keterangan: string;
}

export interface InflasiItem {
    periode: string;
    bulan: string;
    tahun: number;
    inflasiBulanan: number;
    inflasiTahunan: number;
    ihk: number;
}
