# UAS Visualisasi Informasi 2023

# File Spreadsheets
- [Dataset](https://docs.google.com/spreadsheets/d/1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08/edit?pli=1#gid=0)
- [Penyebab Kematian di Indonesia](https://docs.google.com/spreadsheets/d/1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08/edit?pli=1#gid=810444858)
- [Jumlah Kematian di Indonesia Berdasarkan Tahun dan Tipe](https://docs.google.com/spreadsheets/d/1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08/edit?pli=1#gid=1480790998)

# Proses Pembuatan Tabulasi Silang

## 1. Import Data ke Spreadsheet
- Download dataset [Causes of Death in Indonesia](https://www.kaggle.com/datasets/hendratno/cause-of-death-in-indonesia)
- Buka Google Spreadsheet.
- Buat lembar kerja baru atau gunakan lembar kerja yang sudah ada. Kemudian saya ubah nama sheet awal menjadi "Data".
- Import dataset yang telah didownload ke lembar kerja tersebut.

## 2. Membuat Fungsi Tabulasi Silang
Setelah data diimport ke lembar kerja "Data," kita dapat membuat fungsi untuk melakukan tabulasi silang berdasarkan data tersebut. Disini saya akan membuat 2 tabulasi silang yaitu tabulasi silang tentang Penyebab Kematian di Indonesia yang akan mengambil kolom "Cause" dan "Tahun", dan tabulasi tentang Jumlah Kematian di Indonesia berdasarkan Tahun dan Tipe yang akan mengambil data dari kolom "Tahun" dan "Tipe"
- Buka menu Ekstensi pada spreadsheet kemudian pilih Apps Script.
- Buat fungsi untuk melakukan tabulasi silang pada Apps Script tersebut
- Kode tabulasi Penyebab Kematian di Indonesia
```Javascript
function causeDanTahun() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Data');
  let numberRows = sheet.getLastRow();
  let numberCols = sheet.getLastColumn();

  let data = sheet.getRange(2, 1, numberRows-1, numberCols).getValues();

  // Ambil data dari kolom cause dan tahun
  let causes = [];
  let years = [];
  for (let i = 0; i < data.length; i++) {
    let cause = data[i][0];
    let year = data[i][2];
    if (causes.indexOf(cause) == -1) causes.push(cause);
    if (years.indexOf(year) == -1) years.push(year);
  }
  
  // Urutkan tahun dalam urutan ascending
  years.sort((a, b) => a - b);

  // Membuat sheet baru
  let newSheet = ss.insertSheet('Penyebab Kematian di Indonesia');
  newSheet.getRange('A1').setValue('Cause');
  for (let i = 0; i < years.length; i++) {
    newSheet.getRange(1, i + 2).setValue(years[i]);
  }

  // Hitung total dan tambahkan ke sheet
  for (let i = 0; i < causes.length; i++) {
    let cause = causes[i];
    newSheet.getRange(i + 2, 1).setValue(cause);
    for (let j = 0; j < years.length; j++) {
      let year = years[j];
      let totalDeaths = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k][0] == cause && data[k][2] == year) {
          totalDeaths += Number(data[k][4]);
        }
      }
      newSheet.getRange(i + 2, j + 2).setValue(totalDeaths);
    }
  }
}
```

- Kode tabulasi Jumlah Kematian di Indonesia berdasarkan Tahun dan Tipe
```Javascript
function berdasarkanTahunDanTipe() {
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName('Data');
  let numberRows = sheet.getDataRange().getNumRows();
  let numberCols = sheet.getLastColumn();

  let data = sheet.getRange(2, 1, numberRows - 1, numberCols).getValues();

  // Ambil data dari kolom tahun dan tipe
  let years = [];
  let types = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i][2];
    let type = data[i][1];
    if (years.indexOf(year) == -1) years.push(year);
    if (types.indexOf(type) == -1) types.push(type);
  }

  // Urutkan tahun dalam urutan ascending
  years.sort((a, b) => a - b);

  // Membuat sheet baru
  let newSheet = ss.insertSheet('Kematian Berdasarkan Tahun dan Tipe');
  newSheet.getRange('A1').setValue('Type');
  for (let i = 0; i < years.length; i++) {
    newSheet.getRange(1, i + 2).setValue(years[i]);
  }

  // Hitung total dan tambahkan ke sheet
  for (let i = 0; i < types.length; i++) {
    let type = types[i];
    newSheet.getRange(i + 2, 1).setValue(type);
    for (let j = 0; j < years.length; j++) {
      let year = years[j];
      let totalDeaths = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k][2] == year && data[k][1] == type) {
          totalDeaths += Number(data[k][4]);
        }
      }
      newSheet.getRange(i + 2, j + 2).setValue(totalDeaths);
    }
  }
}
```

## 3. Menjalankan Fungsi Tabulasi Silang
Setelah fungsi tabulasi silang dibuat, kita dapat menjalankannya untuk menghasilkan tabulasi silang baru berdasarkan data di lembar kerja "Data".
- Simpan fungsi tabulasi silang yang telah dibuat tadi pada Google Apps Script.
- Klik tombol run atau jalankan fungsi tersebut dari menu "Run" pada Google Apps Script.
- Setelah fungsi selesai dijalankan, akan muncul sheet baru dengan nama "Penyebab Kematian di Indonesia" dan "Kematian Berdasarkan Tahun dan Tipe" yang berisi tabulasi silang dari dataset yang terdapat pada sheet Data.

# Authors
- [Wibie Mahardhika Adi - 2100016081](https://www.github.com/wibiemahardhika22)