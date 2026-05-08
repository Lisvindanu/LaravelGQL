export interface Provinsi {
    kode: string;
    nama: string;
}

export interface Kota {
    kode: string;
    nama: string;
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
    suhu: number;
    kelembapan: number;
    cuaca: string;
    kecepatanAngin: number;
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
    provinsi: string;
    kota: string;
    tanggalLahir: string;
    jenisKelamin: string;
    errors: string[];
}

export interface KalenderJawaResult {
    hari: string;
    pasaran: string;
    wuku: string;
    tahunJawa: string;
    namaWindu: string;
    tahunDalamWindu: number;
}

export interface TerbilangResult {
    angka: number;
    terbilang: string;
}
