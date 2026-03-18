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
    { id:1, brand:'Hyundai', model:'Creta', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:5, pricePerDay:3500, city:'Visakhapatnam', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2020_Hyundai_Creta_1.4_Turbo_SX_%28O%29_%28India%29_front_view.png/800px-2020_Hyundai_Creta_1.4_Turbo_SX_%28O%29_%28India%29_front_view.png', lat:17.6868, lng:83.2185 },
    { id:2, brand:'Toyota', model:'Innova Crysta', year:2022, type:'MINIVAN', fuelType:'DIESEL', transmission:'MANUAL', seats:7, pricePerDay:4500, city:'Vijayawada', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/2016_Toyota_Innova_2.0_G_wagon_%28TGN140R%3B_05-18-2023%29.jpg/800px-2016_Toyota_Innova_2.0_G_wagon_%28TGN140R%3B_05-18-2023%29.jpg', lat:16.5062, lng:80.6480 },
    { id:3, brand:'Maruti Suzuki', model:'Swift', year:2023, type:'HATCHBACK', fuelType:'PETROL', transmission:'MANUAL', seats:5, pricePerDay:1800, city:'Tirupati', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2024_Suzuki_Swift_%28New_Zealand%29.jpg/800px-2024_Suzuki_Swift_%28New_Zealand%29.jpg', lat:13.6285, lng:79.4192 },
    { id:4, brand:'Kia', model:'Seltos', year:2023, type:'SUV', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:3200, city:'Guntur', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/2020_Kia_Seltos_1.4_T-GDi_EX_wagon_%28SP2%3B_05-18-2023%29.jpg/800px-2020_Kia_Seltos_1.4_T-GDi_EX_wagon_%28SP2%3B_05-18-2023%29.jpg', lat:16.3067, lng:80.4365 },
    { id:5, brand:'Tata', model:'Nexon EV', year:2023, type:'SUV', fuelType:'ELECTRIC', transmission:'AUTOMATIC', seats:5, pricePerDay:3000, city:'Kakinada', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tata_Nexon_EV_facelift_in_India.jpg/800px-Tata_Nexon_EV_facelift_in_India.jpg', lat:16.9891, lng:82.2475 },
    { id:6, brand:'Honda', model:'City', year:2022, type:'SEDAN', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:2500, city:'Rajahmundry', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Honda_City_1.5_RS_sedan_%28GN5%3B_05-18-2023%29.jpg/800px-2021_Honda_City_1.5_RS_sedan_%28GN5%3B_05-18-2023%29.jpg', lat:17.0005, lng:81.8040 },
    { id:7, brand:'Mahindra', model:'Thar', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'MANUAL', seats:4, pricePerDay:4000, city:'Kurnool', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mahindra_Thar_2020.jpg/800px-Mahindra_Thar_2020.jpg', lat:15.8281, lng:78.0373 },
    { id:8, brand:'Maruti Suzuki', model:'Dzire', year:2022, type:'SEDAN', fuelType:'CNG', transmission:'MANUAL', seats:5, pricePerDay:1500, city:'Nellore', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/2017_Maruti_Suzuki_Dzire_VXi_%28India%29.jpg/800px-2017_Maruti_Suzuki_Dzire_VXi_%28India%29.jpg', lat:14.4426, lng:79.9865 },
    { id:9, brand:'BMW', model:'X5', year:2023, type:'LUXURY', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:5, pricePerDay:12000, city:'Visakhapatnam', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg/800px-2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg', lat:17.7231, lng:83.3013 },
    { id:10, brand:'Mercedes-Benz', model:'E-Class', year:2023, type:'LUXURY', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:15000, city:'Vijayawada', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Mercedes-Benz_E_220_d_Avantgarde_%28W_213%29_%E2%80%93_Frontansicht%2C_28._Juni_2016%2C_Ratingen.jpg/800px-Mercedes-Benz_E_220_d_Avantgarde_%28W_213%29_%E2%80%93_Frontansicht%2C_28._Juni_2016%2C_Ratingen.jpg', lat:16.5150, lng:80.6276 },
    { id:11, brand:'MG', model:'Hector', year:2023, type:'SUV', fuelType:'HYBRID', transmission:'AUTOMATIC', seats:5, pricePerDay:3800, city:'Tirupati', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/MG_Hector_Sharp_%28front_view%29.jpg/800px-MG_Hector_Sharp_%28front_view%29.jpg', lat:13.6285, lng:79.4192 },
    { id:12, brand:'Maruti Suzuki', model:'Ertiga', year:2022, type:'MINIVAN', fuelType:'PETROL', transmission:'MANUAL', seats:7, pricePerDay:2800, city:'Guntur', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2019_Suzuki_Ertiga_GL_wagon_%28NC22S%3B_05-18-2023%29.jpg/800px-2019_Suzuki_Ertiga_GL_wagon_%28NC22S%3B_05-18-2023%29.jpg', lat:16.3067, lng:80.4365 },
    { id:13, brand:'Hyundai', model:'Verna', year:2023, type:'SEDAN', fuelType:'PETROL', transmission:'AUTOMATIC', seats:5, pricePerDay:2700, city:'Kakinada', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/2018_Hyundai_Accent_GL_sedan_%281%29.jpg/800px-2018_Hyundai_Accent_GL_sedan_%281%29.jpg', lat:16.9891, lng:82.2475 },
    { id:14, brand:'Toyota', model:'Fortuner', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:7, pricePerDay:6000, city:'Rajahmundry', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/2021_Toyota_Fortuner_2.4_VRZ_wagon_%28GUN165R%3B_05-18-2023%29_%282%29.jpg/800px-2021_Toyota_Fortuner_2.4_VRZ_wagon_%28GUN165R%3B_05-18-2023%29_%282%29.jpg', lat:17.0005, lng:81.8040 },
    { id:15, brand:'Mahindra', model:'XUV700', year:2023, type:'SUV', fuelType:'DIESEL', transmission:'AUTOMATIC', seats:7, pricePerDay:5000, city:'Kurnool', available:true,
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mahindra_XUV700_AX7_%28India%29_front_view.jpg/800px-Mahindra_XUV700_AX7_%28India%29_front_view.jpg', lat:15.8281, lng:78.0373 }
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
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  if (!localStorage.getItem('demo_cars')) {
    localStorage.setItem('demo_cars', JSON.stringify(getStaticCars()));
  }
  startTrackingSimulation();
});
