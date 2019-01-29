// App Controller
/* NOTE - Carlsbad Caverns entrance fee and virgin islands annual passess are hard-coded at the moment */
import axios from 'axios';
import {
    returnMap
} from './views/mapbox';
import * as searchView from './views/searchView';
import Search from './models/Search';
import {
    elements,
    parksList,
    unitCode
} from './views/base';


const state = {};

const controlSearch = async () => {
    // 1) get query from the view
    const input = elements.searchInput.value;
    const inputPosition = parksList.indexOf(input);
    const query = unitCode[inputPosition];
    //console.log(query);

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results - (clear input, results, and render loader)
        searchView.clearPageResults();
        searchView.clearSearchInput();

        try {
            // 4) Search for park
            await state.search.getData();
            const res = state.search.result;

            // 5) render results on UI 
            searchView.renderBannerImg(res.images[0].url);

            if (res.operatingHours[0]) {
                searchView.renderStaticInfo(res.name, res.description, res.weatherInfo, res.operatingHours[0].description, res.directionsInfo);
            } else {
                searchView.renderStaticInfo(res.name, res.description, res.weatherInfo, 'null', res.directionsInfo);
            }
            // ENTRANCE PASSES
            if (res.entrancePasses[0] != undefined) {
                if (res.entrancePasses[0].cost === 0) {
                    if (res.entrancePasses[1]) {
                        searchView.renderAnnualFeeInfo(res.entrancePasses[2].cost);
                    } else {
                        elements.annualPassSection.innerHTML = `<center><p class="body-copy white" id="annualPass">${res.entrancePasses[0].description}</p></center>`;
                    }
                } else {
                    if (res.parkCode === 'viis') {
                        elements.annualPassSection.innerHTML = `<center><p class="body-copy white" id="annualPass">Trunk Bay annual passes starting at $20.</p></center>`;
                    } else {
                        searchView.renderAnnualFeeInfo(res.entrancePasses[0].cost);
                    }
                }
            } else {
                searchView.noAnnualPasses();
            }

            // ENTRANCE FEES
            if (res.entranceFees[0]) {
                if (res.entranceFees[0].cost != 0) {
                    searchView.renderFeeModules(res.entranceFees);
                } else {
                    elements.feeContainer.innerHTML = `<center><p style="color: white;">${res.entranceFees[0].description}</p></center>`
                }
            } else {
                if (res.parkCode === 'cave') {
                    elements.feeContainer.innerHTML = `<center><p style="color: white;">The entrance fee for adults 16 and older is $12. Children 15 and under are free.</p></center>`
                } else {
                    elements.feeContainer.innerHTML = `<center><p style="color: white;">There are no entrance fees for this park.</p></center>`
                }
            }

            //OPERATING HOURS
            if (res.operatingHours[1]) {
                if (res.operatingHours[2]) {
                    const individualEntrances = res.operatingHours;
                    individualEntrances.shift();
                    searchView.renderEntranceBtns(individualEntrances);
                } else {
                    searchView.renderEntranceDesc(res.operatingHours[1])
                }
            }
            //MAP 
            returnMap(res.latLong, unitCode.indexOf(res.parkCode));
        } catch (err) {
            alert('Something wrong with the search...');
        }
    }
}


document.querySelector('.search-btn').addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

// IF ENTER PRESSED ON SEARCH
document.querySelector('#search-container').addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        controlSearch();
    }
});

// AUTOCOMPLETE SEARCH
searchView.autocomplete(elements.searchBar, parksList);

