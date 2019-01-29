import {
    elements
} from './base';

// RENDER STATIC RESULTS
export const renderStaticInfo = (title, description, weather, operatingHours, directions) => {
    document.querySelector('#parkNameNav').innerHTML = title;
    elements.parkTitle.innerHTML = title;
    document.querySelector('#parkFees').innerHTML = 'Park Fees';
    const weatherDescMarkup = `
        <div class="flex-container overview">
            <div class="text-container overview-text">
                <h2 class="sub-title">Park Overview <i class="fas fa-info-circle"></i></h2>
                <p class="description body-copy">${description}</p>
            </div>
            <hr class="divider">
            <div class="text-container overview-text">
                <h2 class="sub-title">Weather Overview <i class="fas fa-cloud-sun-rain"></i></h2>
                <p class="weather body-copy">${weather}</p>
            </div>
        </div>
    `;
    elements.weatherDesc.insertAdjacentHTML('afterbegin', weatherDescMarkup);

    const hoursMarkup = `
            <h2 class="sub-title">Operating Hours</h2>
            <p class="body-copy">${operatingHours}</p>
    `;
    if (operatingHours != 'null') {
        elements.operatingDesc.insertAdjacentHTML('afterbegin', hoursMarkup);
    }


    const directionMarkup = `
        <center>
            <h2 class="sub-title white">Getting There</h2>
            <p class="body-copy white">${directions}</p>
        </center>
    `;
    elements.directionInfo.insertAdjacentHTML('afterbegin', directionMarkup);
}

// RENDER IMAGE
export const renderBannerImg = image => {
    document.querySelector('.banner-img').src = image;
}

// RENDER FEE INFO
export const renderAnnualFeeInfo = (annualFee) => {
    const feeSectionMarkup = `
        ${annualFee === 'null' ? `` : `
            <center>
                <p class="body-copy white" id="annualPass">Annual passes are available for $${annualFee}.</p>
            </center>`}
    `;
    elements.annualPassSection.insertAdjacentHTML('afterbegin', feeSectionMarkup);
}

export const renderFeeModules = (passArr) => {
    passArr.forEach(el => {
        const feeModuleMarkup = `
            <div class="fee-module">
                <div class="price-container">
                    <p class="price">$${el.cost}</p>
                </div>
                <h3 class="price-title">${el.title}</h3>
                <p class="price-desc">${el.description}</p>
            </div>
        `;
        document.querySelector('#fee-container').insertAdjacentHTML('beforeend', feeModuleMarkup);
    });
}


// NO ANNUAL PASSES 
export const noAnnualPasses = () => {
    const noPassMarkup = `
    <center>
        <p class="body-copy white" id="annualPass">There are no annual passes available for this park.</p>
    </center>`
    elements.annualPassSection.insertAdjacentHTML('afterbegin', noPassMarkup);
}


// RENDER ENTRANCE BUTTONS
export const renderEntranceBtns = (entrances) => {
    entrances.forEach(el => {
        const newBtn = `
        <div class="btn">${el.name}</div>
        `;
        elements.entranceBtns.insertAdjacentHTML('beforeend', newBtn);
    });
    // loop through and add active class to first button 
    const firstBtn = document.querySelector('.btn');
    firstBtn.classList.add('active');
    elements.entranceDesc.innerHTML = `
        <h2 class="sub-title entrance-title">${entrances[0].name} 
        ${entrances[0].standardHours.monday === 'Closed' ? `<span class="status red">(Closed)</span></h2>` : `<span class="status">(Open)</span></h2>`}
        <p class="operating-hours body-copy">${entrances[0].description}</p>
    `;
    // event listener for active btns
    const allBtns = document.querySelectorAll('.btn');
    allBtns.forEach(e => {
        e.addEventListener('click', function () {
            // 1) remove instance of active class
            if (document.querySelector('.active')) {
                document.querySelector('.active').classList.remove('active');
            }
            elements.entranceDesc.innerHTML = '';
            // 2) add active class to this button
            this.classList.add('active');
            const child = this;
            const parent = this.parentNode;
            const i = entrances[Array.prototype.indexOf.call(parent.children, child)];
            const entranceMarkup = `
                <h2 class="sub-title entrance-title">${i.name} 
                ${i.standardHours.monday === 'Closed' ? `<span class="status red">(Closed)</span></h2>` : `<span class="status">(Open)</span></h2>`}
                <p class="operating-hours body-copy">${i.description}</p>
            `;
            elements.entranceDesc.insertAdjacentHTML('afterbegin', entranceMarkup);
        });
    })
}

export const renderEntranceDesc = (desc) => {
    elements.entranceDesc.innerHTML = `
        <h2 class="sub-title entrance-title">${desc.name} 
        ${desc.standardHours.monday === 'Closed' ? `<span class="status red">(Closed)</span></h2>` : `<span class="status">(Open)</span></h2>`}
        <p class="operating-hours body-copy">${desc.description}</p>
    `;
}


// CLEAR RESULTS 
export const clearPageResults = () => {
    elements.parkTitle.innerHTML = '';
    elements.weatherDesc.innerHTML = '';
    elements.operatingDesc.innerHTML = '';
    elements.directionInfo.innerHTML = '';
    elements.feeContainer.innerHTML = '';
    elements.annualPassSection.innerHTML = '';
    elements.map.innerHTML = '';
    elements.entranceBtns.innerHTML = '';
    elements.entranceDesc.innerHTML = '';
}

// CLEAR INPUT
export const clearSearchInput = () => {
    document.getElementById('searchBar').value = '';
}


// AUTOCOMPLETE SEARCH BAR FUNCTION
export const autocomplete = (inp, arr) => {
    let currentFocus;
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    document.getElementById("searchBar").focus();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        event.preventDefault();
        closeAllLists(e.target);
    });
    document.querySelector('.search-btn').addEventListener("click", function (e) {
        document.getElementById("searchBar").focus();
    });
}

// PARK NAME IN NAV ON SCROLL
window.addEventListener('scroll', function () {
    const headerTxt = document.querySelector('.header-text').offsetTop;
    const pagePosition = document.documentElement.scrollTop;
    if (pagePosition > headerTxt) {
        document.querySelector('#parkNameNav').style.opacity = 1;
    }
    if (pagePosition < headerTxt) {
        document.querySelector('#parkNameNav').style.opacity = 0;
    }
});
