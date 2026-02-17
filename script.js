import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// ---------- CERITA MARUKO-CHAN YANG LUCU (BAHASA INDONESIA) ----------
const ceritaMaruko = [
    { 
        karakter: "Maruko-chan", 
        teks: "Hari ini cuacanya bagus banget ya! Aku mau jalan-jalan deh~", 
        teksInggris: "The weather is so nice today! I want to go for a walk~",
        emosi: "senang",
        bunga: 1
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Eh? Itu bunga sakura mekar semuanya! Cantik-cantik banget!", 
        teksInggris: "Eh? The cherry blossoms are all blooming! So beautiful!",
        emosi: "kaget senang",
        bunga: 3
    },
    { 
        karakter: "Tamu-chan", 
        teks: "Maruko-chan! Lagi ngapain sendirian di sini?", 
        teksInggris: "Maruko-chan! What are you doing here alone?",
        emosi: "penasaran"
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Aku lagi nikmatin bunga sakura~ Enak banget liat pemandangan kayak gini!", 
        teksInggris: "I'm enjoying the cherry blossoms~ It's so nice to see views like this!",
        emosi: "bahagia",
        bunga: 2
    },
    { 
        karakter: "Tamu-chan", 
        teks: "Iya ya... Tapi lebih enak kalau ditemenin, kan?", 
        teksInggris: "Yeah... But it's better with company, right?",
        emosi: "tersenyum"
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Iya juga sih! Makanya aku seneng banget ketemu kamu!", 
        teksInggris: "That's true! That's why I'm so happy to see you!",
        emosi: "sangat bahagia",
        bunga: 2
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Kamu mau temenin aku liat bunga sakura nggak?", 
        teksInggris: "Will you accompany me to see the cherry blossoms?",
        emosi: "harap"
    },
    { 
        karakter: "Tamu-chan", 
        teks: "Mau dong! Aku juga suka banget liat bunga sakura bareng Maruko-chan!", 
        teksInggris: "Of course! I also really like seeing cherry blossoms with Maruko-chan!",
        emosi: "senang"
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Yey! Makasih ya! Kamu baik banget!", 
        teksInggris: "Yay! Thank you! You're so kind!",
        emosi: "sangat bahagia",
        bunga: 3
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Eh, lihat! Ada kelinci lucu di balik pohon!", 
        teksInggris: "Eh, look! There's a cute rabbit behind the tree!",
        emosi: "kaget senang",
        bunga: 1
    },
    { 
        karakter: "Tamu-chan", 
        teks: "Wah iya! Kelincinya gemes banget! Pengen aku peluk~", 
        teksInggris: "Wow, yes! The rabbit is so cute! I want to hug it~",
        emosi: "gemas"
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Hari ini bener-bener hari yang sempurna! Cuaca cerah, bunga mekar, ada kelinci imut, dan ditemenin kamu!", 
        teksInggris: "Today is truly a perfect day! Sunny weather, blooming flowers, cute rabbit, and accompanied by you!",
        emosi: "sangat bahagia",
        bunga: 3
    },
    { 
        karakter: "Maruko-chan", 
        teks: "Pokoknya aku seneng banget! Makasih ya udah jadi temen terbaik aku!", 
        teksInggris: "I'm really happy! Thank you for being my best friend!",
        emosi: "mengharukan",
        bunga: 5
    },
    { 
        karakter: "Tamu-chan", 
        teks: "Aku juga seneng banget punya temen kayak Maruko-chan! Lucu, baik, dan selalu ceria!", 
        teksInggris: "I'm also really happy to have a friend like Maruko-chan! Cute, kind, and always cheerful!",
        emosi: "sangat bahagia"
    },
    { 
        karakter: "Semua", 
        teks: "Persahabatan selamanya! 🌸", 
        teksInggris: "Friendship forever! 🌸",
        emosi: "spesial",
        bunga: 10,
        isFinal: true
    }
];

let indexCeritaSekarang = 0;
let autoPlay = true;
let autoPlayTimeout;
let totalBunga = 0;

// ---------- SETUP SCENE ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFE4E1); // Pink pastel lembut

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 4, 8);
camera.lookAt(0, 1.5, 0);

// Renderers
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xFFE4E1); // Pink pastel
document.body.appendChild(renderer.domElement);

// CSS2 Renderer untuk teks
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 4;
controls.maxDistance = 15;
controls.target.set(0, 1.5, 0);

// ---------- LAMPU YANG LEMBUT ----------
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffccdd, 0.8);

// Main light
const mainLight = new THREE.DirectionalLight(0xfff0e6, 1);
mainLight.position.set(2, 5, 3);
mainLight.castShadow = true;
mainLight.receiveShadow = true;
scene.add(mainLight);

// Lampu pink tambahan
const pinkLight = new THREE.PointLight(0xffaacc, 0.8);
pinkLight.position.set(1, 2, 2);
scene.add(pinkLight);

// Lampu kuning hangat
const warmLight = new THREE.PointLight(0xffdd99, 0.5);
warmLight.position.set(-1, 2, 3);
scene.add(warmLight);

// ---------- GROUND SUPER IMTUT ----------
// Ground pastel
const groundGeometry = new THREE.CircleGeometry(10, 32);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffdab9,
    emissive: 0xfff0e0,
    emissiveIntensity: 0.1
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// Pola-pola imut di ground
for (let i = 0; i < 50; i++) {
    const polaGeo = new THREE.CircleGeometry(0.1, 4);
    const polaMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1 });
    const pola = new THREE.Mesh(polaGeo, polaMat);
    
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 7;
    pola.position.set(
        Math.cos(angle) * radius,
        0.01,
        Math.sin(angle) * radius
    );
    pola.rotation.x = -Math.PI / 2;
    scene.add(pola);
}

// ---------- KARAKTER MARUKO-CHAN (STYLE CHIBI SUPER IMUT) ----------
function createMarukoChan() {
    const group = new THREE.Group();
    
    // GAUN MERAH (Khas Maruko-chan)
    const gaunGeo = new THREE.ConeGeometry(0.4, 0.7, 8);
    const gaunMat = new THREE.MeshStandardMaterial({ 
        color: 0xff4d4d, // Merah cerah
        emissive: 0x330000,
        emissiveIntensity: 0.1
    });
    const gaun = new THREE.Mesh(gaunGeo, gaunMat);
    gaun.position.y = 0.35;
    gaun.castShadow = true;
    gaun.receiveShadow = true;
    group.add(gaun);
    
    // KERAH PUTIH
    const kerahGeo = new THREE.TorusGeometry(0.25, 0.05, 4, 8, Math.PI);
    const kerahMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const kerah = new THREE.Mesh(kerahGeo, kerahMat);
    kerah.position.y = 0.7;
    kerah.rotation.x = Math.PI / 2;
    kerah.rotation.z = 0;
    kerah.scale.set(1, 0.3, 0.5);
    kerah.castShadow = true;
    group.add(kerah);
    
    // KEPALA BESAR (Ciri khas chibi)
    const kepalaGeo = new THREE.SphereGeometry(0.35, 24);
    const kepalaMat = new THREE.MeshStandardMaterial({ color: 0xffe0c0 });
    const kepala = new THREE.Mesh(kepalaGeo, kepalaMat);
    kepala.position.y = 1.1;
    kepala.castShadow = true;
    kepala.receiveShadow = true;
    group.add(kepala);
    
    // RAMBUT (Model rambut Maruko yang khas)
    const rambutGeo = new THREE.SphereGeometry(0.32, 8);
    const rambutMat = new THREE.MeshStandardMaterial({ color: 0x332211 });
    const rambut = new THREE.Mesh(rambutGeo, rambutMat);
    rambut.position.set(0, 1.28, 0.05);
    rambut.scale.set(1.1, 0.25, 0.9);
    rambut.castShadow = true;
    group.add(rambut);
    
    // PONI RAMBUT
    for (let i = 0; i < 3; i++) {
        const poniGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 6);
        const poniMat = new THREE.MeshStandardMaterial({ color: 0x332211 });
        const poni = new THREE.Mesh(poniGeo, poniMat);
        poni.position.set(-0.05 + (i * 0.05), 1.23, 0.18);
        poni.rotation.x = 0.3;
        poni.castShadow = true;
        group.add(poni);
    }
    
    // MATA BESAR (Khas anime)
    const mataKiri = new THREE.Group();
    const mataKiriPutih = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    mataKiriPutih.position.set(-0.12, 1.12, 0.3);
    mataKiriPutih.scale.set(0.8, 0.6, 0.2);
    mataKiriPutih.castShadow = true;
    group.add(mataKiriPutih);
    
    const mataKiriHitam = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 6),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    mataKiriHitam.position.set(-0.12, 1.12, 0.35);
    mataKiriHitam.scale.set(0.5, 0.5, 0.1);
    mataKiriHitam.castShadow = true;
    group.add(mataKiriHitam);
    
    const mataKiriPutihKecil = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 4),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    mataKiriPutihKecil.position.set(-0.14, 1.14, 0.37);
    group.add(mataKiriPutihKecil);
    
    // Mata Kanan
    const mataKananPutih = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    mataKananPutih.position.set(0.12, 1.12, 0.3);
    mataKananPutih.scale.set(0.8, 0.6, 0.2);
    mataKananPutih.castShadow = true;
    group.add(mataKananPutih);
    
    const mataKananHitam = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 6),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    mataKananHitam.position.set(0.12, 1.12, 0.35);
    mataKananHitam.scale.set(0.5, 0.5, 0.1);
    mataKananHitam.castShadow = true;
    group.add(mataKananHitam);
    
    const mataKananPutihKecil = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 4),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    mataKananPutihKecil.position.set(0.1, 1.14, 0.37);
    group.add(mataKananPutihKecil);
    
    // PIPI MERAH (Blush)
    const pipiKiri = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 4),
        new THREE.MeshStandardMaterial({ color: 0xffa0a0 })
    );
    pipiKiri.position.set(-0.2, 1.0, 0.25);
    pipiKiri.scale.set(0.8, 0.4, 0.1);
    group.add(pipiKiri);
    
    const pipiKanan = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 4),
        new THREE.MeshStandardMaterial({ color: 0xffa0a0 })
    );
    pipiKanan.position.set(0.2, 1.0, 0.25);
    pipiKanan.scale.set(0.8, 0.4, 0.1);
    group.add(pipiKanan);
    
    // MUTIARA (Mulut)
    const mulutGeo = new THREE.TorusGeometry(0.05, 0.01, 4, 8, Math.PI);
    const mulutMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const mulut = new THREE.Mesh(mulutGeo, mulutMat);
    mulut.position.set(0, 1.0, 0.32);
    mulut.rotation.x = 0.1;
    mulut.rotation.z = 0;
    mulut.scale.set(0.8, 0.5, 0.3);
    mulut.castShadow = true;
    group.add(mulut);
    
    // TANGAN
    const tanganKiri = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6),
        new THREE.MeshStandardMaterial({ color: 0xffe0c0 })
    );
    tanganKiri.position.set(-0.35, 0.7, 0);
    tanganKiri.rotation.z = 0.4;
    tanganKiri.rotation.x = 0.2;
    tanganKiri.castShadow = true;
    group.add(tanganKiri);
    
    const tanganKanan = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6),
        new THREE.MeshStandardMaterial({ color: 0xffe0c0 })
    );
    tanganKanan.position.set(0.35, 0.7, 0);
    tanganKanan.rotation.z = -0.4;
    tanganKanan.rotation.x = -0.2;
    tanganKanan.castShadow = true;
    group.add(tanganKanan);
    
    // SEPATU
    const sepatuKiri = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 6),
        new THREE.MeshStandardMaterial({ color: 0x442211 })
    );
    sepatuKiri.position.set(-0.15, 0.05, 0.1);
    sepatuKiri.scale.set(0.8, 0.3, 1.2);
    sepatuKiri.castShadow = true;
    group.add(sepatuKiri);
    
    const sepatuKanan = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 6),
        new THREE.MeshStandardMaterial({ color: 0x442211 })
    );
    sepatuKanan.position.set(0.15, 0.05, 0.1);
    sepatuKanan.scale.set(0.8, 0.3, 1.2);
    sepatuKanan.castShadow = true;
    group.add(sepatuKanan);
    
    return group;
}

// ---------- KARAKTER TAMU (TEMAN MARUKO) ----------
function createTemanChan() {
    const group = new THREE.Group();
    
    // Baju Kuning
    const bajuGeo = new THREE.ConeGeometry(0.35, 0.6, 8);
    const bajuMat = new THREE.MeshStandardMaterial({ color: 0xffdd44 });
    const baju = new THREE.Mesh(bajuGeo, bajuMat);
    baju.position.y = 0.3;
    baju.castShadow = true;
    baju.receiveShadow = true;
    group.add(baju);
    
    // Kepala
    const kepalaGeo = new THREE.SphereGeometry(0.3, 24);
    const kepalaMat = new THREE.MeshStandardMaterial({ color: 0xffe0c0 });
    const kepala = new THREE.Mesh(kepalaGeo, kepalaMat);
    kepala.position.y = 0.95;
    kepala.castShadow = true;
    kepala.receiveShadow = true;
    group.add(kepala);
    
    // Rambut
    const rambutGeo = new THREE.SphereGeometry(0.28, 8);
    const rambutMat = new THREE.MeshStandardMaterial({ color: 0x884422 });
    const rambut = new THREE.Mesh(rambutGeo, rambutMat);
    rambut.position.set(0, 1.1, 0.02);
    rambut.scale.set(1.1, 0.25, 0.9);
    rambut.castShadow = true;
    group.add(rambut);
    
    // Mata
    const mataMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    const mataKiri = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), mataMat);
    mataKiri.position.set(-0.1, 0.98, 0.25);
    mataKiri.scale.set(0.8, 0.8, 0.1);
    mataKiri.castShadow = true;
    group.add(mataKiri);
    
    const mataKanan = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), mataMat);
    mataKanan.position.set(0.1, 0.98, 0.25);
    mataKanan.scale.set(0.8, 0.8, 0.1);
    mataKanan.castShadow = true;
    group.add(mataKanan);
    
    // Mulut
    const mulutGeo = new THREE.TorusGeometry(0.04, 0.008, 4, 6, Math.PI);
    const mulutMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const mulut = new THREE.Mesh(mulutGeo, mulutMat);
    mulut.position.set(0, 0.88, 0.26);
    mulut.rotation.x = 0.1;
    mulut.scale.set(0.7, 0.5, 0.3);
    mulut.castShadow = true;
    group.add(mulut);
    
    return group;
}

// Buat karakter
const maruko = createMarukoChan();
maruko.position.set(-1.2, 0, 0);
maruko.rotation.y = 0.3;
scene.add(maruko);

const teman = createTemanChan();
teman.position.set(1.2, 0, 0);
teman.rotation.y = -0.3;
scene.add(teman);

// ---------- BUNGA SAKURA SUPER IMUT ----------
function createBungaSakura(x, y, z, ukuran = 0.2) {
    const group = new THREE.Group();
    
    // Kelopak bunga
    const kelopakMat = new THREE.MeshStandardMaterial({ color: 0xffaacc });
    
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const kelopak = new THREE.Mesh(
            new THREE.ConeGeometry(ukuran * 0.8, ukuran * 0.4, 4),
            kelopakMat
        );
        kelopak.position.set(
            Math.cos(angle) * ukuran,
            Math.sin(angle) * ukuran * 0.5,
            0
        );
        kelopak.rotation.z = angle;
        kelopak.rotation.x = 0.5;
        kelopak.castShadow = true;
        group.add(kelopak);
    }
    
    // Tengah bunga
    const tengah = new THREE.Mesh(
        new THREE.SphereGeometry(ukuran * 0.3, 6),
        new THREE.MeshStandardMaterial({ color: 0xffdd88 })
    );
    tengah.position.set(0, 0, 0);
    tengah.castShadow = true;
    group.add(tengah);
    
    group.position.set(x, y, z);
    return group;
}

// Tambah banyak bunga sakura
for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 4;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 0.5 + Math.random() * 0.5;
    
    const bunga = createBungaSakura(x, y, z, 0.15 + Math.random() * 0.1);
    scene.add(bunga);
}

// Pohon sakura sederhana
function createPohonSakura(x, z) {
    const group = new THREE.Group();
    
    // Batang
    const batangGeo = new THREE.CylinderGeometry(0.2, 0.3, 2);
    const batangMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const batang = new THREE.Mesh(batangGeo, batangMat);
    batang.position.y = 1;
    batang.castShadow = true;
    batang.receiveShadow = true;
    group.add(batang);
    
    // Daun-daun (pink)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const daun = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 5),
            new THREE.MeshStandardMaterial({ color: 0xffaacc })
        );
        daun.position.set(
            Math.cos(angle) * 0.8,
            2.2 + Math.sin(i) * 0.3,
            Math.sin(angle) * 0.8
        );
        daun.castShadow = true;
        group.add(daun);
    }
    
    group.position.set(x, 0, z);
    return group;
}

// Tambah pohon
scene.add(createPohonSakura(-3, -2));
scene.add(createPohonSakura(3, 2));
scene.add(createPohonSakura(-2, 3));
scene.add(createPohonSakura(2, -3));

// ---------- ELEMEN DEKORASI IMUT ----------
// Hati-hati kecil
for (let i = 0; i < 15; i++) {
    const hati = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 4),
        new THREE.MeshStandardMaterial({ color: 0xff69b4 })
    );
    
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    hati.position.set(x, 0.1, z);
    hati.castShadow = true;
    scene.add(hati);
}

// Awan-awan imut
function createAwan(x, y, z) {
    const group = new THREE.Group();
    const awanMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xeeeeee, emissiveIntensity: 0.3 });
    
    for (let i = 0; i < 3; i++) {
        const bola = new THREE.Mesh(new THREE.SphereGeometry(0.3, 5), awanMat);
        bola.position.set((i - 1) * 0.3, 0, 0);
        bola.castShadow = true;
        group.add(bola);
    }
    
    group.position.set(x, y, z);
    return group;
}

scene.add(createAwan(2, 3, -2));
scene.add(createAwan(-2, 3.5, 2));
scene.add(createAwan(0, 4, 3));

// ---------- FUNGSI UPDATE DIALOG ----------
function updateDialog() {
    const cerita = ceritaMaruko[indexCeritaSekarang];
    const pesanEl = document.getElementById('dialogue-message');
    const subEl = document.getElementById('dialogue-sub');
    const speakerEl = document.getElementById('speaker-name');
    const iconEl = document.getElementById('speaker-icon');
    const happinessMeter = document.getElementById('happiness-meter');
    const flowerCounter = document.getElementById('flower-counter');
    
    pesanEl.textContent = cerita.teks;
    subEl.textContent = cerita.teksInggris;
    speakerEl.textContent = cerita.karakter;
    
    // Ganti icon berdasarkan karakter
    if (cerita.karakter === "Maruko-chan") {
        iconEl.textContent = "👧";
    } else if (cerita.karakter === "Tamu-chan") {
        iconEl.textContent = "🧑";
    } else {
        iconEl.textContent = "🌸";
    }
    
    // Tambah bunga
    if (cerita.bunga) {
        totalBunga += cerita.bunga;
        flowerCounter.textContent = totalBunga;
        
        // Tambah sticker bunga
        for (let i = 0; i < cerita.bunga; i++) {
            setTimeout(() => createFloatingSticker('🌸'), i * 100);
        }
    }
    
    // Update happiness meter (selalu 100% karena imut)
    happinessMeter.textContent = Math.min(100, 70 + (indexCeritaSekarang * 2)) + '%';
    
    // Efek spesial
    if (cerita.emosi === "sangat bahagia") {
        createFloatingSticker('✨');
        createFloatingSticker('💫');
    } else if (cerita.emosi === "spesial") {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createFloatingSticker('🌸'), i * 200);
            setTimeout(() => createFloatingSticker('❤️'), i * 200 + 100);
        }
    }
    
    // Animasi karakter berdasarkan emosi
    if (cerita.karakter === "Maruko-chan") {
        if (cerita.emosi === "sangat bahagia") {
            maruko.position.y = 0.15;
            setTimeout(() => { maruko.position.y = 0; }, 300);
        }
    }
}

// Sticker melayang
function createFloatingSticker(emoji) {
    const container = document.getElementById('sticker-container');
    const sticker = document.createElement('div');
    sticker.className = 'sticker-float';
    sticker.textContent = emoji;
    sticker.style.left = Math.random() * 100 + '%';
    sticker.style.animationDuration = (Math.random() * 3 + 3) + 's';
    sticker.style.fontSize = (Math.random() * 20 + 20) + 'px';
    container.appendChild(sticker);
    
    setTimeout(() => sticker.remove(), 4000);
}

// Fungsi global untuk HTML buttons
window.nextDialogue = function() {
    if (indexCeritaSekarang < ceritaMaruko.length - 1) {
        indexCeritaSekarang++;
    } else {
        indexCeritaSekarang = 0;
        totalBunga = 0;
        document.getElementById('flower-counter').textContent = '0';
    }
    updateDialog();
};

window.toggleAutoPlay = function() {
    autoPlay = !autoPlay;
    const btn = document.querySelector('.control-btn:nth-child(2)');
    if (autoPlay) {
        btn.innerHTML = '⏸️ Otomatis';
        startAutoPlay();
    } else {
        btn.innerHTML = '⏯️ Otomatis';
        stopAutoPlay();
    }
};

window.toggleMusic = function() {
    const btn = document.querySelector('.control-btn:nth-child(3)');
    btn.innerHTML = btn.innerHTML.includes('🔊') ? '🔇 Musik' : '🔊 Musik';
};

function startAutoPlay() {
    if (autoPlay) {
        autoPlayTimeout = setTimeout(() => {
            window.nextDialogue();
            startAutoPlay();
        }, 6000);
    }
}

function stopAutoPlay() {
    clearTimeout(autoPlayTimeout);
}

// Keyboard control
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        window.nextDialogue();
        if (autoPlay) {
            stopAutoPlay();
            startAutoPlay();
        }
    }
});

// ---------- ANIMASI ----------
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;
    
    // Animasi karakter
    maruko.position.y = Math.sin(time * 2) * 0.05;
    teman.position.y = Math.cos(time * 2) * 0.05;
    
    // Animasi tangan
    maruko.children.forEach(child => {
        if (child.position.x === -0.35 && child.geometry.type === 'CylinderGeometry') {
            child.rotation.z = 0.4 + Math.sin(time * 3) * 0.1;
        }
        if (child.position.x === 0.35 && child.geometry.type === 'CylinderGeometry') {
            child.rotation.z = -0.4 + Math.cos(time * 3) * 0.1;
        }
    });
    
    controls.update();
    renderer.render(scene, camera);
}

animate();

// ---------- INIT ----------
updateDialog();
startAutoPlay();

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader">
            <div class="maruko-loader">👧</div>
            <h2>Chibi Maruko-chan</h2>
            <p>Loading... Mohon tunggu ya~</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 500);
    }, 2000);
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

console.log('🌸 Selamat datang di dunia Chibi Maruko-chan yang super imut! 🌸');
