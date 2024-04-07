// addEventListener (recherche)
document.getElementById('websiteSearch').addEventListener('keyup', e => { // addEventListener de la search bar
    if (e.code === "Enter") {
        let country = document.getElementById('websiteSearch').value;
        clearHomePageContent();
        fetchCountryData(country);
        displayCountryPreview(country);
    }
    const searchBar = document.getElementById('websiteSearch');
    const searchTerm = searchBar.value.trim();
    if (searchTerm === '') {
        showHomePageCountries();
        clearPreviewContent();
    }
});

// addEventListener (affichage recherche)
document.getElementById('showPreview').addEventListener('click', async function () { // addEventListener click on flag
    clearPreviewContent();
    await displayCountryDetails();
});

// addEventListener (tri)


//// API call (recherche)
async function fetchCountryData(country) { // Récupération des informations demandées par l'utilisateur
    let url = `https://restcountries.com/v3.1/name/${country}`;

    try {
        const data = await fetch(url);
        const response = await data.json();

        if (response) {
            const countryInfos = response[0];
            showCountriesInfos = {
                flag: countryInfos.flags.svg,
                name: countryInfos.name.common,
                nativeName: countryInfos.name.nativeName,
                population: countryInfos.population,
                region: countryInfos.region,
                subregion: countryInfos.subregion,
                capital: countryInfos.capital,
                tld: countryInfos.tld,
                currencies: countryInfos.currencies,
                languages: countryInfos.languages,
                borders: countryInfos.borders
            };
            return showCountriesInfos;
        }
        else {
            console.error('Aucune information trouvée pour la ville spécifiée.');
            return null;
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données: ', error);
        return null;
    }
}

async function displayCountryPreview(country) { // Affichage preview des données récupérées

    const showCountriesInfos = await fetchCountryData(country);
    if (showCountriesInfos) {
        document.getElementById('showPreview').innerHTML = `
        <div class="bg-white my-8 w-[80%] shadow-md rounded-md">
            <img class="mb-6 rounded-t-lg" src="${showCountriesInfos.flag}">
            <div class="pl-6 pb-12">
                <p class="font-bold text-lg mb-4">${showCountriesInfos.name}</p>
                <p class="text-sm"><span class="font-semibold">Population:</span> ${showCountriesInfos.population}</p>
                <p class="text-sm"><span class="font-semibold">Region:</span> ${showCountriesInfos.region}</p>
                <p class="text-sm"><span class="font-semibold">Capital:</span> ${showCountriesInfos.capital}</p>
            </div>
        </div>`;
    }
}

//// Fonction retour (recherche)
function clearPreviewContent() { // Supprime le contenu de la div de la preview des données
    document.getElementById('showPreview').innerHTML = ``;
}

//// Fonction retour (homepage)


async function displayCountryDetails() { // Pour ensuite afficher le contenu entier des données récupérées

    let country = document.getElementById('websiteSearch').value;

    let currency = showCountriesInfos.currencies ? Object.keys(showCountriesInfos.currencies)[0] : "Not specified";
    let languages = showCountriesInfos.languages ? Object.keys(showCountriesInfos.languages) : ["Not specified"];
    let nativeName = showCountriesInfos.nativeName ? Object.values(showCountriesInfos.nativeName)[0].common : "Not specified";
    let borders = showCountriesInfos.borders ? Object.values(showCountriesInfos.borders).join(", ") : "None";
    let borderCountriesHtml = "";
    if (Array.isArray(showCountriesInfos.borders) && showCountriesInfos.borders.length > 0) {
        showCountriesInfos.borders.forEach(border => {
            borderCountriesHtml += `<p class="shadow-md rounded px-4 py-1 mr-2">${border}</p>`;
        });
    } else {
        borderCountriesHtml = `<p class="text-sm">No bordering countries</p>`;
    }

    document.getElementById('showCountries').innerHTML = `
    <div class="my-8 flex-col justify-center lg:flex-row w-[85%]">
        <button id="backButton" class="flex mb-10 bg-white py-2 px-4 shadow-md w-[35%] lg:w-[8%]">
            <img class="mr-2" src="assets/img/arrow_back.png">
            <span class="">Back</span>
        </button>

        <div class="lg:flex w-[65%]">
        <div class="mr-[8%]">
        <img class="" src="${showCountriesInfos.flag}">
        </div>
        <div class="">
            <div class="lg:grid lg:grid-cols-2 lg:gap-16">
                <div class="mt-8 text-sm lg:mt-4">
                    <p class="text-lg font-bold mb-4">${showCountriesInfos.name}</p>
                    <p class=""><span class="font-semibold">Native Name:</span> ${nativeName}</p>
                    <p class=""><span class="font-semibold">Population:</span> ${showCountriesInfos.population}</p>
                    <p class=""><span class="font-semibold">Region:</span> ${showCountriesInfos.region}</p>
                    <p class=""><span class="font-semibold">Sub Region:</span> ${showCountriesInfos.subregion}</p>
                    <p class=""><span class="font-semibold">Capital:</span> ${showCountriesInfos.capital}</p>
                </div>

            <div class="text-sm mt-8 lg:grid lg:place-items-center">
                <p class=""><span class="font-semibold">Top Level Domain:</span> ${showCountriesInfos.tld}</p>
                <p class=""><span class="font-semibold">Currencies:</span> ${currency}</p>
                <p class=""><span class="font-semibold">Languages:</span> ${languages}</p>
                </div>
            </div>

            <div class="text-base mt-8 flex items-center">
            <h2 class="font-semibold mr-4">Border Countries:</h2>
            <p class="flex">${borderCountriesHtml}</p>
            </div>
        </div>
    </div>
    `;
    document.getElementById('backButton').addEventListener('click', function () {
        showContent();
    });
}

function showContent() { // Vide la div du contenu entier pour recharger la div de la preview des données
    document.getElementById('showCountries').innerHTML = ``;
    document.getElementById('showPreview').innerHTML = `
    <div class="bg-white my-8 w-[80%] shadow-md rounded-md">
        <img class="mb-6 rounded-t-lg" src="${showCountriesInfos.flag}">
        <div class="pl-6 pb-12">
            <p class="font-bold text-lg mb-4">${showCountriesInfos.name}</p>
            <p class="text-sm"><span class="font-semibold">Population:</span> ${showCountriesInfos.population}</p>
            <p class="text-sm"><span class="font-semibold">Region:</span> ${showCountriesInfos.region}</p>
            <p class="text-sm"><span class="font-semibold">Capital:</span> ${showCountriesInfos.capital}</p>
        </div>
    </div>`;
}

// API call (homepage)
// let responseHomePage;
async function fetchCountriesForHomePage() { // Récupération des informations pour la homepage
    let url = "https://restcountries.com/v3.1/all";
    try {
        const data = await fetch(url);
        const response = await data.json();
        // responseHomePage = response;
        if (response) {
            return response;
        }
        else {
            console.error('Aucune information trouvée pour la ville spécifiée.');
            return null;
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données: ', error);
        return null;
    }
}

async function displayCard(countryPara) {
    const country = await fetchCountryData(countryPara);
    let currency = country.currencies ? Object.keys(country.currencies)[0] : "Not specified";
    let languages = country.languages ? Object.keys(country.languages) : ["Not specified"];
    let nativeName = country.nativeName ? Object.values(country.nativeName)[0].common : "Not specified";
    let borders = country.borders ? Object.values(country.borders).join(", ") : "None";
    let borderCountriesHtml = "";
    if (Array.isArray(country.borders) && country.borders.length > 0) {
        country.borders.forEach(border => {
            borderCountriesHtml += `<p class="shadow-md rounded px-4 py-1 mr-2">${border}</p>`;
        });
    } else {
        borderCountriesHtml = `<p class="text-sm">No bordering countries</p>`;
    }
    document.getElementById('showCountries').innerHTML = `
    <div class="my-8 flex-col justify-center lg:flex-row w-[85%]">
        <button id="backButton" class="flex mb-10 bg-white py-2 px-4 shadow-md w-[35%] lg:w-[8%]">
            <img class="mr-2" src="assets/img/arrow_back.png">
            <span class="">Back</span>
        </button>
        
        <div class="lg:flex w-[65%]">
            <div class="mr-[8%]">
                <img class="" src="${country.flag}">
            </div>
            <div class="">
                <div class="lg:grid lg:grid-cols-2 lg:gap-16">
                    <div class="mt-8 text-sm lg:mt-4">
                        <p class="text-lg font-bold mb-4">${country.name}</p>
                        <p class=""><span class="font-semibold">Native Name:</span> ${nativeName}</p>
                        <p class=""><span class="font-semibold">Population:</span> ${country.population}</p>
                        <p class=""><span class="font-semibold">Region:</span> ${country.region}</p>
                        <p class=""><span class="font-semibold">Sub Region:</span> ${country.subregion}</p>
                        <p class=""><span class="font-semibold">Capital:</span> ${country.capital}</p>
                    </div>

                    <div class="text-sm mt-8 lg:grid lg:place-items-center">
                        <p class=""><span class="font-semibold">Top Level Domain:</span> ${country.tld}</p>
                        <p class=""><span class="font-semibold">Currencies:</span> ${currency}</p>
                        <p class=""><span class="font-semibold">Languages:</span> ${languages}</p>
                    </div>
                </div>
                
                    <div class="text-base mt-8 flex items-center">
                        <h2 class="font-semibold mr-4">Border Countries:</h2>
                        <p class="flex">${borderCountriesHtml}</p>
                    </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById('backButton').addEventListener('click', function () {
        deleteDisplayCard();
        showHomePageCountries();
    });
}

function deleteDisplayCard() {
    document.getElementById('showCountries').innerHTML = ``;
}

async function showHomePageCountries() { // Affichage des informations pour la homePage
    const countries = await fetchCountriesForHomePage();
    if (countries) {
        const countriesDiv = document.getElementById('homePage');
        countries.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.innerHTML = `
            <img class="mb-6 rounded-t-lg" src="${country.flags.svg}">
            <div class="pl-6 pb-12">
                <p class="text-lg mb-4"><span class="font-bold">${country.name.common}</span></p>
                <p class="text-sm"><span class="font-semibold">Population: </span>${country.population}</p>
                <p class="text-sm"><span class="font-semibold">Region: </span>${country.region}</p>
                <p class="text-sm"><span class="font-semibold">Capital: </span>${country.capital}</p>
            </div>
            `;
            countryDiv.className = "bg-white mb-20 w-[80%] mx-auto shadow-md rounded-md justify-center lg:w-[100%] lg:mb-0";
            countryDiv.id = country.name.common;
            countriesDiv.appendChild(countryDiv);

            //addEventListener (affichage des cartes de la homePage)
            countryDiv.addEventListener('click', async function (e) {
                clearHomePageContent();
                displayCard(country.name.common);
            });
        });
    }
}

showHomePageCountries();

// Fonction permettant de supprimer les pays de la homepage en cas de recherche
function clearHomePageContent() {
    document.getElementById('homePage').innerHTML = ``;
}
