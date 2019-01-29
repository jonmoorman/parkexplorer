export const elements = {
    entranceStatus: document.querySelectorAll('.status'),
    searchBar: document.getElementById('searchBar'),
    searchInput: document.querySelector('#searchBar'),
    parkTitle: document.querySelector('.parkName'),
    weatherDesc: document.querySelector('#weatherDesc'),
    operatingDesc: document.querySelector('#operatingHours'),
    directionInfo: document.querySelector('#directionInfo'),
    feeContainer: document.querySelector('#fee-container'),
    annualPassSection: document.querySelector('#annualPassSection'),
    map: document.querySelector('#map'),
    entranceBtns: document.querySelector('#entranceSelect'),
    entranceDesc: document.querySelector('#entranceDesc')
}

export const parksList = ['Acadia', 'Arches', 'Badlands', 'Big Bend', 'Biscayne', 'Black Canyon of the Gunnison', 'Bryce Canyon', 'Canyonlands', 'Capitol Reef', 'Carlsbad Caverns', 'Channel Islands', 'Congaree', 'Crater Lake', 'Cuyahoga Valley', 'Denali', 'Death Valley', 'Dry Torungas', 'Everglades', 'Gates of the Arctic', 'Glacier', 'Glacier Bay', 'Great Basin', 'Grand Canyon', 'Great Sand Dunes', 'Great Smoky Mountains', 'Grand Teton', 'Guadalupe Mountains', 'Haleakala', 'Hawaii Volcanoes', 'Hot Springs', 'Isle Royale', 'Gateway Arch', 'Joshua Tree', 'Katmai', 'Kenai Fjords', 'Kings Canyon', 'Kobuk Valley', 'Lake Clark', 'Lassen Volcanic', 'Mammoth Cave', 'Mesa Verde', 'Mount Rainier', 'North Cascades', 'National Park of American Samoa', 'Olympic', 'Petrified Forest', 'Pinnacles', 'Redwood', 'Rocky Mountain', 'Saguaro', 'Sequoia', 'Shenandoah', 'Theodore Roosevelt', 'Virgin Islands', 'Voyageurs', 'Wind Cave', 'Wrangell-St. Elias', 'Yellowstone', 'Yosemite', 'Zion'];

export const unitCode = ['acad', 'arch', 'badl', 'bibe', 'bisc', 'blca', 'brca', 'cany', 'care', 'cave', 'chis', 'cong', 'crla', 'cuva', 'dena', 'deva', 'drto', 'ever', 'gaar', 'glac', 'glba', 'grba', 'grca', 'grsa', 'grsm', 'grte', 'gumo', 'hale', 'havo', 'hosp', 'isro', 'jeff', 'jotr', 'katm', 'kefj', 'seki', 'kova', 'lacl', 'lavo', 'maca', 'meve', 'mora', 'noca', 'npsa', 'olym', 'pefo', 'pinn', 'redw', 'romo', 'sagu', 'seki', 'shen', 'thro', 'viis', 'voya', 'wica', 'wrst', 'yell', 'yose', 'zion'];