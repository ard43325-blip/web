// =========================
// DATA KERANJANG
// =========================
let keranjang = [];
let totalHarga = 0;

// =========================
// FUNGSI TAMBAH MENU
// =========================
function tambah(nama, harga, qtyId) {
    let qty = parseInt(document.getElementById(qtyId).value);

    if (qty <= 0) {
        alert("Jumlah tidak boleh 0!");
        return;
    }

    let existing = keranjang.find(item => item.nama === nama);

    if (existing) {
        existing.qty += qty;
        existing.subtotal = existing.qty * harga;
    } else {
        keranjang.push({
            nama: nama,
            qty: qty,
            harga: harga,
            subtotal: qty * harga
        });
    }

    renderKeranjang();
}

// =========================
// TAMPILKAN KERANJANG
// =========================
function renderKeranjang() {
    let tabel = document.getElementById("keranjang");
    tabel.innerHTML = `
        <tr>
            <th>Menu</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Aksi</th>
        </tr>
    `;

    totalHarga = 0;

    keranjang.forEach((item, index) => {
        totalHarga += item.subtotal;

        tabel.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.qty}</td>
                <td>Rp ${item.subtotal.toLocaleString()}</td>
                <td><button class="hapus-btn" onclick="hapusItem(${index})">X</button></td>
            </tr>
        `;
    });

    document.getElementById("total").innerText =
        "Total: Rp " + totalHarga.toLocaleString();
}

// =========================
// HAPUS ITEM
// =========================
function hapusItem(index) {
    keranjang.splice(index, 1);
    renderKeranjang();
}

// =========================
// QRIS POPUP
// =========================
function bukaQRIS() {
    if (keranjang.length === 0) {
        alert("Keranjang kosong!");
        return;
    }

    document.getElementById("qrisModal").style.display = "flex";
}

function tutupQRIS() {
    document.getElementById("qrisModal").style.display = "none";
}

// =========================
// SETELAH QRIS DIBAYAR
// =========================
function selesaiQRIS() {

    // Simpan ke laporan
    simpanTransaksi();

    // Tanggal struk
    let tanggalNow = new Date().toLocaleString("id-ID");

    // Simpan struk ke localStorage
    localStorage.setItem("strukTerakhir", JSON.stringify(keranjang));
    localStorage.setItem("totalTerakhir", totalHarga);
    localStorage.setItem("tanggalstruck", tanggalNow);

    alert("Pembayaran berhasil!");

    // Reset keranjang
    keranjang = [];
    renderKeranjang();

    // Tutup QRIS
    tutupQRIS();

    // Pindah ke halaman struk
    window.location.href = "struck.html";
}

// =========================
// SIMPAN LAPORAN
// =========================
function simpanTransaksi() {
    let laporan = JSON.parse(localStorage.getItem("laporan")) || [];

    let transaksi = {
        tanggal: new Date().toLocaleString("id-ID"),
        total: totalHarga,
        detail: keranjang
    };

    laporan.push(transaksi);

    localStorage.setItem("laporan", JSON.stringify(laporan));
}
