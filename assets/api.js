// addEventListener (recherche)
document.getElementById('websiteSearch').addEventListener('keyup', e => { // addEventListener de la search bar
    if (e.code === "Enter") {
        let country = document.getElementById('websiteSearch').value;
        deleteContenthomePage();
        getCountries(country);
        countryPreview(country);
    }
    const searchBar = document.getElementById('websiteSearch');
    const searchTerm = searchBar.value.trim();
    if (searchTerm === '') {
        showCountriesHomePage();
    }
});

// addEventListener (affichage recherche)
document.getElementById('showPreview').addEventListener('click', async function () { // addEventListener click on flag
    deleteContent();
    await countryCard();
});

// addEventListener (tri)


//addEventListener (affichage des cartes de la homePage)
document.getElementById('')

//// API call (recherche)
async function getCountries(country) { // Récupération des informations demandées par l'utilisateur
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

async function countryPreview(country) { // Affichage preview des données récupérées
    
    const showCountriesInfos = await getCountries(country);
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

//// Fonction retour
function deleteContent() { // Supprime le contenu de la div de la preview des données
    document.getElementById('showPreview').innerHTML = ``;  
}

async function countryCard() { // Pour ensuite afficher le contenu entier des données récupérées

    let country = document.getElementById('websiteSearch').value;
    
    const rawCountryData = await getCountries(country);
    // const preparedCountryData = await prepareCountryData(rawCountryData);
    let currency = Object.keys(showCountriesInfos.currencies)[0];
    let languages = Object.keys(showCountriesInfos.languages);
    let nativeName = Object.values(showCountriesInfos.nativeName)[0].common;
    document.getElementById('showCountries').innerHTML = `
    <div class="my-8 flex-col justify-center w-[85%]">
        <button id="backButton" class="flex mb-10 bg-white py-2 px-4 shadow-md w-[35%]">
            <img class="mr-2" src="assets/img/arrow_back.png">
            <span class="">Back</span>
        </button>

        <img class="" src="${showCountriesInfos.flag}">
        <div class="mt-8 text-sm">
            <p class="text-lg font-bold mb-4">${showCountriesInfos.name}</p>
            <p class=""><span class="font-semibold">Native Name:</span> ${nativeName}</p>
            <p class=""><span class="font-semibold">Population:</span> ${showCountriesInfos.population}</p>
            <p class=""><span class="font-semibold">Region:</span> ${showCountriesInfos.region}</p>
            <p class=""><span class="font-semibold">Sub Region:</span> ${showCountriesInfos.subregion}</p>
            <p class=""><span class="font-semibold">Capital:</span> ${showCountriesInfos.capital}</p>
        </div>

        <div class="text-sm mt-8">
            <p class=""><span class="font-semibold">Top Level Domain:</span> ${showCountriesInfos.tld}</p>
            <p class=""><span class="font-semibold">Currencies:</span> ${currency}</p>
            <p class=""><span class="font-semibold">Languages:</span> ${languages}</p>
        </div>

        <div class="text-base mt-8">
            <h2 class="font-semibold">Border Countries:</h2>
            <p class=""></p>
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
async function getCountriesHomePage() { // Récupération des informations pour la homepage
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

async function showCountriesHomePage() { // Affichage des informations pour la homePage
     const countries = await getCountriesHomePage();
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
            countryDiv.className = "bg-white my-8 w-[80%] shadow-md rounded-md justify-center mx-auto";
            countriesDiv.appendChild(countryDiv);
        });
    }
}

showCountriesHomePage();

// Fonction permettant de supprimer les pays de la homepage en cas de recherche
function deleteContenthomePage(){
    document.getElementById('homePage').innerHTML = ``;
}