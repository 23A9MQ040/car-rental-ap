/**
 * main.js – AP Car Rentals
 * Shared utilities, API helpers, auth management, and static demo data
 */

const API_BASE = 'http://localhost:8080';

// ══════ API FETCH ══════
async function apiFetch(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('carRentalToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(API_BASE + endpoint, options);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Request failed with status ' + res.status);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ══════ AUTH STATE ══════
function checkAuthState() {
  const user = JSON.parse(localStorage.getItem('carRentalUser') || 'null');
  const guestMenu = document.getElementById('guestMenu');
  const userMenu  = document.getElementById('userMenu');
  const userAvatar = document.getElementById('userAvatar');

  if (user && localStorage.getItem('carRentalToken')) {
    if (guestMenu) guestMenu.style.display = 'none';
    if (userMenu)  userMenu.style.display  = 'flex';
    if (userAvatar) userAvatar.textContent  = user.name[0].toUpperCase();
  } else {
    if (guestMenu) guestMenu.style.display = 'flex';
    if (userMenu)  userMenu.style.display  = 'none';
  }
}

function logout() {
  localStorage.removeItem('carRentalToken');
  localStorage.removeItem('carRentalUser');
  showToast('Logged out successfully', 'info');
  setTimeout(() => window.location.href = 'index.html', 600);
}

// ══════ HAMBURGER MENU ══════
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ══════ TOAST NOTIFICATIONS ══════
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ══════ CAR CARD BUILDER (shared across pages) ══════
function createCarCard(car, showBookBtn = false) {
  const typeBadge = { HATCHBACK:'🚗', SEDAN:'🚙', SUV:'🛻', LUXURY:'💎', MINIVAN:'🚐', TRUCK:'🚛' };
  const fuelBadge = { PETROL:'⛽ Petrol', DIESEL:'🛢️ Diesel', ELECTRIC:'⚡ Electric', HYBRID:'♻️ Hybrid', CNG:'🌿 CNG' };
  const isAvailable = car.available !== false;
  const bookBtn = showBookBtn && isAvailable
    ? `<a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm" id="book-btn-${car.id}">View Details</a>`
    : `<span style="color:var(--text-muted);font-size:0.8rem">${isAvailable ? '' : 'Unavailable'}</span>`;

  return `
    <div class="car-card" id="car-${car.id}">
      <div class="car-image-wrap">
        <img src="${car.imageUrl || 'https://via.placeholder.com/400x200?text=' + car.brand}" alt="${car.brand} ${car.model}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200/161B22/FF6B00?text=' + '${car.brand}'"/>
        <span class="car-availability ${isAvailable ? 'available' : 'unavailable'}">${isAvailable ? '✓ Available' : '✗ Booked'}</span>
      </div>
      <div class="car-body">
        <div class="car-city"><span>📍</span> ${car.city}</div>
        <div class="car-name">${typeBadge[car.type] || '🚗'} ${car.brand} ${car.model} ${car.year || ''}</div>
        <div class="car-specs">
          <div class="spec">${fuelBadge[car.fuelType] || car.fuelType}</div>
          <div class="spec">⚙️ ${car.transmission}</div>
          <div class="spec">👥 ${car.seats || 5} Seats</div>
          <div class="spec">🏷️ ${car.type}</div>
        </div>
        <div class="car-footer">
          <div class="car-price">
            <div class="price-label">Starting from</div>
            <span class="price-val">₹${parseFloat(car.pricePerDay).toLocaleString('en-IN')}</span>
            <span class="price-unit">/day</span>
          </div>
          ${bookBtn || `<a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm">View Details →</a>`}
        </div>
      </div>
    </div>`;
}

// ══════ STATIC FALLBACK DATA (for demo/offline mode) ══════
function getStaticCars() {
  return [
    { id:1, brand:'Maruti Suzuki', model:'Swift', year:2022, type:'HATCHBACK', fuelType:'PETROL', transmission:'MANUAL', seats:5, pricePerDay:1200, city:'Visakhapatnam', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/159073/swift-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80' },
    { id:2, brand:'Hyundai', model:'Creta', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:5, pricePerDay:2500, city:'Visakhapatnam', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/141115/creta-exterior-right-front-three-quarter-15.jpeg?isig=0&q=80' },
    { id:3, brand:'Toyota', model:'Innova Crysta', year:2022, type:'SUV', fuelType:'DIESEL', transmission:'MANUAL', seats:7, pricePerDay:3000, city:'Vijayawada', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80' },
    { id:4, brand:'Honda', model:'City', year:2023, type:'SEDAN', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:1800, city:'Vijayawada', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80' },
    { id:5, brand:'Maruti Suzuki', model:'Dzire', year:2022, type:'SEDAN', fuelType:'PETROL', transmission:'MANUAL', seats:5, pricePerDay:1400, city:'Tirupati', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/162809/dzire-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80' },
    { id:6, brand:'Toyota', model:'Fortuner', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:7, pricePerDay:4500, city:'Tirupati', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg?isig=0&q=80' },
    { id:7, brand:'Hyundai', model:'i20', year:2023, type:'HATCHBACK', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:1500, city:'Guntur', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/156947/i20-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80' },
    { id:8, brand:'Kia', model:'Seltos', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:5, pricePerDay:2800, city:'Guntur', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/144159/seltos-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80' },
    { id:9, brand:'Tata', model:'Nexon EV', year:2023, type:'SUV', fuelType:'ELECTRIC', transmission:'AUTOMATIC', seats:5, pricePerDay:2200, city:'Kakinada', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/142515/nexon-ev-exterior-right-front-three-quarter-70.jpeg?isig=0&q=80' },
    { id:10, brand:'Maruti Suzuki', model:'Ertiga', year:2022, type:'MINIVAN', fuelType:'CNG', transmission:'MANUAL', seats:7, pricePerDay:1900, city:'Rajahmundry', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80' },
    { id:11, brand:'Toyota', model:'Camry', year:2023, type:'LUXURY', fuelType:'HYBRID', transmission:'AUTOMATIC', seats:5, pricePerDay:5000, city:'Visakhapatnam', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/110233/camry-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80' },
    { id:12, brand:'Maruti Suzuki', model:'Alto K10', year:2022, type:'HATCHBACK', fuelType:'PETROL', transmission:'MANUAL', seats:5, pricePerDay:900, city:'Nellore', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/126621/alto-k10-exterior-right-front-three-quarter-56.jpeg?isig=0&q=80' },
    { id:13, brand:'Mahindra', model:'Thar', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'MANUAL', seats:4, pricePerDay:3500, city:'Kurnool', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-35.jpeg?isig=0&q=80' },
    { id:14, brand:'Hyundai', model:'Verna', year:2023, type:'SEDAN', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:2000, city:'Kakinada', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/121943/verna-exterior-right-front-three-quarter-101.jpeg?isig=0&q=80' },
    { id:15, brand:'Kia', model:'Carens', year:2023, type:'MINIVAN', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:7, pricePerDay:2600, city:'Vijayawada', available:true,
      imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/112325/carens-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80' }
  ];
}
