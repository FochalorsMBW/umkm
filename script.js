// Fungsi baca selengkapnya
document.querySelectorAll('.read-more-btn').forEach(function(btn) {
    btn.addEventListener('click', function () {
        var readMoreContent = this.previousElementSibling.querySelector('.read-more-content');
        if (readMoreContent.style.display === 'none' || readMoreContent.style.display === '') {
            readMoreContent.style.display = 'inline';
            this.textContent = 'Sembunyikan';
        } else {
            readMoreContent.style.display = 'none';
            this.textContent = 'Selengkapnya';
        }
    });
});

// Daftar data buah
const buahData = [
    { nama: "Apel", gambar: "./aset/appleic.png", deskripsi: "Apel merah segar langsung dari kebun.", harga: 25000,isSignature: true },
    { nama: "Pisang", gambar: "./aset/bananaic.png", deskripsi: "Pisang manis dan siap santap.", harga: 15000,isSignature: true },
    { nama: "Jeruk", gambar: "./aset/orangeic.png", deskripsi: "Jeruk segar dengan rasa manis alami.", harga: 20000,isSignature: true },
    { nama: "Mangga", gambar: "./aset/mangoic.png", deskripsi: "Mangga harum manis khas Sijunjung.", harga: 18000},
    { nama: "Anggur", gambar: "./aset/grapeic.png", deskripsi: "Anggur impor dengan kualitas premium.", harga: 20000 },
    { nama: "Semangka", gambar: "./aset/watermelonic.png", deskripsi: "Semangka segar dan berair.", harga: 17000 },
    { nama: "Durian", gambar: "./aset/durianic.png", deskripsi: "Durian raja musang.", harga: 19000 },
    { nama: "Rambutan", gambar: "./aset/rambutanic.png", deskripsi: "Rambutan dari binjai.", harga: 15000 },
    { nama: "Buah Naga", gambar: "./aset/dragon-fruitic.png", deskripsi: "Buah naga super.", harga: 40000 },
    { nama: "Pepaya", gambar: "./aset/papayaic.png", deskripsi: "Pepaya segar melepas dahaga.", harga: 12000 },
    { nama: "Nanas", gambar: "./aset/pineappleic.png", deskripsi: "Nanas manis, asam dan gurih.", harga: 24500 },
    { nama: "Manggis", gambar: "./aset/mangosteenic.png", deskripsi: "Manggis manis anti-exhaustes.", harga: 21000 },
    { nama: "Stroberi", gambar: "./aset/strawberryic.png", deskripsi: "Stroberi asli Australi.", harga: 35000 },
    { nama: "Salak", gambar: "./aset/salakic.png", deskripsi: "Salak asli Lombok.", harga: 30000 },
    { nama: "Alpukat", gambar: "./aset/avocadoic.png", deskripsi: "Alpukat dari Mexico.", harga: 27500 },
];

// Deklarasi keranjang
let keranjang = [];

// Fungsi untuk menampilkan daftar buah
function tampilkanBuah(buah) {
    const buahList = document.getElementById('buahList');
    buahList.innerHTML = '';

    buah.forEach((item, index) => {
        const buahItem = document.createElement('div');
        buahItem.className = 'buah-item';
        if (item.isSignature) {
            buahItem.classList.add('signature-item');
        }
        buahItem.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <div class="harga">Rp ${item.harga.toLocaleString()}/kg</div>
            <div class="quantity-buttons">
                <button class="btn btn-success btn-tambah" data-index="${index}">
                    <i class="fas fa-plus"></i>
                </button>
                <span class="jumlah-buah" data-index="${index}">0</span>
                <button class="btn btn-danger btn-kurang" data-index="${index}">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        `;
        buahList.appendChild(buahItem);
    });

    const items = document.querySelectorAll('.buah-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Tambahkan event listener ke tombol "Tambah" dan "Kurang"
    const tambahButtons = document.querySelectorAll('.btn-tambah');
    const kurangButtons = document.querySelectorAll('.btn-kurang');

    tambahButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const cartCountElem = document.getElementById('cartCount');
            const currentCount = parseInt(cartCountElem.textContent);
            cartCountElem.textContent = currentCount + 1;

            // Logika menambahkan buah ke keranjang
            const buahIndex = keranjang.findIndex(item => item.nama === buah[index].nama);
            if (buahIndex !== -1) {
                keranjang[buahIndex].jumlah += 1;
            } else {
                keranjang.push({ ...buah[index], jumlah: 1 });
            }

            // Fungsi memperbarui daftar isi di keranjang
            document.querySelector(`.jumlah-buah[data-index="${index}"]`).textContent = keranjang[buahIndex !== -1 ? buahIndex : keranjang.length - 1].jumlah;
            perbaruiKeranjang();
        });
    });

    kurangButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const cartCountElem = document.getElementById('cartCount');
            const currentCount = parseInt(cartCountElem.textContent);
            if (currentCount > 0) {
                cartCountElem.textContent = currentCount - 1;

                // Hapus buah dari keranjang atau kurangi jumlahnya
                const buahIndex = keranjang.findIndex(item => item.nama === buah[index].nama);
                if (buahIndex !== -1 && keranjang[buahIndex].jumlah > 1) {
                    keranjang[buahIndex].jumlah -= 1;
                    // Perbarui jumlah di tampilan
                    document.querySelector(`.jumlah-buah[data-index="${index}"]`).textContent = keranjang[buahIndex].jumlah;
                } else if (buahIndex !== -1) {
                    keranjang.splice(buahIndex, 1);
                    // Perbarui jumlah di tampilan
                    document.querySelector(`.jumlah-buah[data-index="${index}"]`).textContent = 0;
                }
                perbaruiKeranjang();
            }
        });
    });
}

// Fungsi untuk memperbarui tampilan keranjang
function perbaruiKeranjang() {
    const keranjangList = document.getElementById('keranjangList');
    keranjangList.innerHTML = '';
    let totalHarga = 0;

    keranjang.forEach(item => {
        const keranjangItem = document.createElement('div');
        keranjangItem.className = 'keranjang-item';
        keranjangItem.innerHTML = `
            <div>${item.nama} - Rp ${item.harga.toLocaleString()}/kg x${item.jumlah}</div>
        `;
        totalHarga += item.harga * item.jumlah;
        keranjangList.appendChild(keranjangItem);
    });

    const totalHargaElem = document.createElement('div');
    totalHargaElem.className = 'total-harga';
    totalHargaElem.innerHTML = `<strong>Total: Rp ${totalHarga.toLocaleString()}</strong>`;
    keranjangList.appendChild(totalHargaElem);
}

// Fungsi untuk menampilkan modal konfirmasi
function tampilkanModal() {
    const modal = document.getElementById('modalKonfirmasi');
    const totalHarga = keranjang.reduce((total, item) => total + item.harga * item.jumlah, 0);
    document.getElementById('totalHargaModal').textContent = `Total Pembelian: Rp ${totalHarga.toLocaleString()}`;
    modal.style.display = 'block';
}

// Fungsi untuk menyembunyikan modal
function sembunyikanModal() {
    const modal = document.getElementById('modalKonfirmasi');
    modal.style.display = 'none';
}

// Fungsi untuk mengonfirmasi pembelian
function konfirmasiPembelian() {
    sembunyikanModal();
    alert('Pembelian berhasil');
    window.location.reload();
}

// Fungsi pencarian buah
function cariBuah() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const hasilPencarian = buahData.filter(item => item.nama.toLowerCase().includes(input));
    tampilkanBuah(hasilPencarian);
}

// Fungsi untuk menampilkan daftar buah
tampilkanBuah(buahData);

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.buah-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });

    const cartIcon = document.getElementById('cartIcon');
    cartIcon.addEventListener('click', function() {
        const keranjangContainer = document.getElementById('keranjangContainer');
        keranjangContainer.style.display = keranjangContainer.style.display === 'none' ? 'block' : 'none';
    });

    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', tampilkanModal);

    const iyaButton = document.getElementById('iyaButton');
    const tidakButton = document.getElementById('tidakButton');

    iyaButton.addEventListener('click', konfirmasiPembelian);
    tidakButton.addEventListener('click', sembunyikanModal);
});

// Fungsi untuk mengatur mode gelap (Opsional)
const toggleDarkMode = document.getElementById('toggleDarkMode');

toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

