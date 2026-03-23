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
  const bookBtn = (showBookBtn && isAvailable)
    ? `<a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm" id="book-btn-${car.id}">Book →</a>`
    : (isAvailable ? null : `<span style="color:var(--text-muted);font-size:0.8rem">Unavailable</span>`);

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
    { id:1, brand:'Hyundai', model:'Creta', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:5, pricePerDay:3500, city:'Visakhapatnam', available:true,
      imageUrl:'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop', lat:17.6868, lng:83.2185 },
    { id:2, brand:'Toyota', model:'Innova Crysta', year:2022, type:'MINIVAN', fuelType:'DIESEL', transmission:'MANUAL', seats:7, pricePerDay:4500, city:'Vijayawada', available:true,
      imageUrl:'https://images.unsplash.com/photo-1621359983222-796aa40ca38c?q=80&w=2070&auto=format&fit=crop', lat:16.5062, lng:80.6480 },
    { id:3, brand:'Maruti Suzuki', model:'Swift', year:2023, type:'HATCHBACK', fuelType:'PETROL', transmission:'MANUAL', seats:5, pricePerDay:1800, city:'Tirupati', available:true,
      imageUrl:'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2070&auto=format&fit=crop', lat:13.6285, lng:79.4192 },
    { id:4, brand:'Kia', model:'Seltos', year:2023, type:'SUV', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:3200, city:'Guntur', available:true,
      imageUrl:'https://images.unsplash.com/photo-1630149447720-41071da509c2?q=80&w=2070&auto=format&fit=crop', lat:16.3067, lng:80.4365 },
    { id:5, brand:'Tata', model:'Nexon EV', year:2023, type:'SUV', fuelType:'ELECTRIC', transmission:'AUTOMATIC', seats:5, pricePerDay:3000, city:'Kakinada', available:true,
      imageUrl:'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070&auto=format&fit=crop', lat:16.9891, lng:82.2475 },
    { id:6, brand:'Honda', model:'City', year:2022, type:'SEDAN', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:2500, city:'Rajahmundry', available:true,
      imageUrl:'https://images.unsplash.com/photo-1542362567-b058c02b3cfc?q=80&w=2070&auto=format&fit=crop', lat:17.0005, lng:81.8040 },
    { id:7, brand:'Mahindra', model:'Thar', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'MANUAL', seats:4, pricePerDay:4000, city:'Kurnool', available:true,
      imageUrl:'https://images.unsplash.com/photo-1533558701576-23c65e927342?q=80&w=2070&auto=format&fit=crop', lat:15.8281, lng:78.0373 },
    { id:8, brand:'Maruti Suzuki', model:'Dzire', year:2022, type:'SEDAN', fuelType:'CNG', transmission:'MANUAL', seats:5, pricePerDay:1500, city:'Nellore', available:true,
      imageUrl:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop', lat:14.4426, lng:79.9865 },
    { id:9, brand:'BMW', model:'X5', year:2023, type:'LUXURY', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:5, pricePerDay:12000, city:'Visakhapatnam', available:true,
      imageUrl:'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop', lat:17.7231, lng:83.3013 },
    { id:10, brand:'Mercedes-Benz', model:'E-Class', year:2023, type:'LUXURY', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:15000, city:'Vijayawada', available:true,
      imageUrl:'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=2070&auto=format&fit=crop', lat:16.5150, lng:80.6276 },
    { id:11, brand:'MG', model:'Hector', year:2023, type:'SUV', fuelType:'HYBRID', transmission:'AUTOMATIC', seats:5, pricePerDay:3800, city:'Tirupati', available:true,
      imageUrl:'https://images.unsplash.com/photo-1620215175664-cb6c1737be70?q=80&w=2070&auto=format&fit=crop', lat:13.6285, lng:79.4192 },
    { id:12, brand:'Maruti Suzuki', model:'Ertiga', year:2022, type:'MINIVAN', fuelType:'PETROL', transmission:'MANUAL', seats:7, pricePerDay:2800, city:'Guntur', available:true,
      imageUrl:'https://images.unsplash.com/photo-1615750278713-39ee800e84b7?q=80&w=2070&auto=format&fit=crop', lat:16.3067, lng:80.4365 },
    { id:13, brand:'Hyundai', model:'Verna', year:2023, type:'SEDAN', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:2700, city:'Kakinada', available:true,
      imageUrl:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop', lat:16.9891, lng:82.2475 },
    { id:14, brand:'Toyota', model:'Fortuner', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:7, pricePerDay:6000, city:'Rajahmundry', available:true,
      imageUrl:'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=2070&auto=format&fit=crop', lat:17.0005, lng:81.8040 },
    { id:15, brand:'Mahindra', model:'XUV700', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:7, pricePerDay:5000, city:'Kurnool', available:true,
      imageUrl:'https://images.unsplash.com/photo-1615751072297-5a896d860d5e?q=80&w=2070&auto=format&fit=crop', lat:15.8281, lng:78.0373 }
  ];
}

// ══════ LIVE TRACKING SIMULATION ══════
let trackerInterval = null;
function startTrackingSimulation() {
  if (trackerInterval) return;
  trackerInterval = setInterval(() => {
    let cars = JSON.parse(localStorage.getItem('demo_cars') || '[]');
    if (cars.length === 0) {
      cars = getStaticCars();
    }
    cars.forEach(car => {
      // Simulate small movement (±0.0001 to ±0.0005 degrees)
      car.lat += (Math.random() - 0.5) * 0.001;
      car.lng += (Math.random() - 0.5) * 0.001;
    });
    localStorage.setItem('demo_cars', JSON.stringify(cars));
    const event = new CustomEvent('carsUpdated');
    window.dispatchEvent(event);
  }, 3000);
}

// Initialize on load
const CURRENT_DATA_VERSION = 5; // Forces update of old local storage data
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  
  // Cache-busting for local storage data
  const storedVersion = localStorage.getItem('demo_data_version');
  if (storedVersion != CURRENT_DATA_VERSION) {
    console.log('Updating demo data version to ' + CURRENT_DATA_VERSION);
    localStorage.setItem('demo_cars', JSON.stringify(getStaticCars()));
    localStorage.setItem('demo_data_version', CURRENT_DATA_VERSION);
  }

  startTrackingSimulation();
  
  // Proactive image audit (runs once per session to keep UI clean)
  if (!sessionStorage.getItem('audit_performed')) {
    auditAndFixImages().then(() => {
      sessionStorage.setItem('audit_performed', 'true');
    });
  }
});

// ══════ AUTOMATED IMAGE AUDITOR ══════
/**
 * Scans all car images in the application (localStorage + DOM),
 * detects null/broken URLs, and replaces them with a stable placeholder.
 * @param {Object} config { placeholder: string, backup: string }
 */
async function auditAndFixImages(config = {}) {
  const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop';
  const placeholder = config.placeholder || DEFAULT_PLACEHOLDER;
  
  console.log('🚀 Starting Automated Image Audit...');
  const cars = JSON.parse(localStorage.getItem('demo_cars') || '[]');
  let fixedCount = 0;
  let validCount = 0;
  let totalCount = cars.length;

  const results = await Promise.all(cars.map(async (car) => {
    const isBroken = !car.imageUrl || car.imageUrl.trim() === '' || car.imageUrl.includes('via.placeholder.com');
    
    if (isBroken) {
      car.imageUrl = placeholder;
      car._fixed = true;
      fixedCount++;
      return car;
    }

    // Check if URL is actually accessible
    try {
      const isOk = await verifyImageURL(car.imageUrl);
      if (!isOk) {
        car.imageUrl = placeholder;
        car._fixed = true;
        fixedCount++;
      } else {
        validCount++;
      }
    } catch (e) {
      car.imageUrl = placeholder;
      car._fixed = true;
      fixedCount++;
    }
    return car;
  }));

  localStorage.setItem('demo_cars', JSON.stringify(results));
  
  // Apply visual feedback to DOM if on a page with car cards
  applyAuditVisuals();

  console.log('📊 Image Audit Summary:', {
    totalScanned: totalCount,
    fixed: fixedCount,
    valid: validCount,
    placeholderUsed: placeholder
  });

  if (fixedCount > 0) {
    showToast(`Fixed ${fixedCount} broken images!`, 'success');
    // Dispatch event to refresh UI
    window.dispatchEvent(new CustomEvent('carsUpdated'));
  }
  
  return { totalCount, fixedCount, validCount };
}

async function verifyImageURL(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    // Timeout check
    setTimeout(() => resolve(false), 5000);
  });
}

function applyAuditVisuals() {
  const cards = document.querySelectorAll('.car-card');
  const cars = JSON.parse(localStorage.getItem('demo_cars') || '[]');
  
  cards.forEach(card => {
    const id = card.id.split('-')[1];
    const car = cars.find(c => c.id == id);
    if (car && car._fixed) {
      card.style.border = '2px solid #10b981'; // Green border for fixed
      card.style.position = 'relative';
      const badge = document.createElement('div');
      badge.textContent = 'IMAGE FIXED';
      badge.style = 'position:absolute;top:10px;left:10px;background:#10b981;color:white;font-size:10px;padding:2px 6px;border-radius:4px;z-index:5;font-weight:bold';
      card.appendChild(badge);
    }
  });
}
