// =========================
// LOAD STRUK DARI LOCALSTORAGE
// =========================

let data = JSON.parse(localStorage.getItem("strukTerakhir")) || [];
let total = localStorage.getItem("totalTerakhir") || 0;
let tanggal = localStorage.getItem("tanggalstruck") || "-";

let tabel = document.getElementById("struckTable");

// Tampilkan data belanja
data.forEach(item => {
    tabel.innerHTML += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.qty}</td>
            <td>Rp ${item.subtotal.toLocaleString()}</td>
        </tr>
    `;
});

// Total harga
document.getElementById("totalstruck").innerText =
    "Total: Rp " + Number(total).toLocaleString();

// Tanggal transaksi
document.getElementById("tanggalstruck").innerText =
    "Tanggal: " + tanggal;
