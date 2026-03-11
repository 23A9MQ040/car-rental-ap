const https = require('https');

const articles = [
  'Suzuki_Swift', 'Hyundai_Creta', 'Toyota_Innova', 'Honda_City', 
  'Suzuki_Dzire', 'Toyota_Fortuner', 'Hyundai_i20', 'Kia_Seltos', 
  'Tata_Nexon', 'Suzuki_Ertiga', 'Toyota_Camry', 'Suzuki_Alto', 
  'Mahindra_Thar', 'Hyundai_Accent', 'Kia_Carens'
];

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

async function getImages() {
  for (const article of articles) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${article}`;
    await new Promise(resolve => {
      https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages = json.query.pages;
            const pageId = Object.keys(pages)[0];
            const original = pages[pageId].original;
            if (original && original.source) {
               console.log(`${article}: ${original.source}`);
            } else {
               console.log(`${article}: NOT FOUND`);
            }
          } catch(e) {
            console.log(`${article}: ERROR`);
          }
          resolve();
        });
      });
    });
  }
}

getImages();
