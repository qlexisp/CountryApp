let showCountriesInfos;
let currentCountry;

document.getElementById('websiteSearch').addEventListener('keyup', e => { // addEventListener de la search bar
    if (e.code === "Enter") {
        let country = document.getElementById('websiteSearch').value;
        currentCountry = country;
        getCountries(country);
        countryPreview(country);
    }
});

document.getElementById('showPreview').addEventListener('click', function () { // addEventListener click on flag
    deleteContent();
    countryCard();
});

function deleteContent() { // Supprime le contenu de la div de la preview des données
    document.getElementById('showPreview').innerHTML = ``;
}

function countryCard() { // Pour ensuite afficher le contenu entier des données récupérées
    document.getElementById('showCountries').innerHTML = `
    <div class="my-8 flex justify-center w-[85%]">
        <div class="" id="backButton">
            <button class="flex mb-10 bg-white py-2 px-4 shadow-md w-[35%]">
                <img class="mr-2" src="assets/img/arrow_back.png">
                <p class="">Back</p>
            </button>

            <img class="" src="${showCountriesInfos.flag}">
            <div class="mt-8 text-sm">
                <p class="text-lg font-bold mb-4">${showCountriesInfos.name}</p>
                <p class=""><span class="font-semibold">Native Name:</span> ${showCountriesInfos.name.nativeName}</p>
                <p class=""><span class="font-semibold">Population:</span> ${showCountriesInfos.population}</p>
                <p class=""><span class="font-semibold">Region:</span> ${showCountriesInfos.region}</p>
                <p class=""><span class="font-semibold">Sub Region:</span> ${showCountriesInfos.subregion}</p>
                <p class=""><span class="font-semibold">Capital:</span> ${showCountriesInfos.capital}</p>
            </div>

            <div class="text-sm mt-8">
                <p class=""><span class="font-semibold">Top Level Domain:</span> ${showCountriesInfos.tld}</p>
                <p class=""><span class="font-semibold">Currencies:</span> ${showCountriesInfos.currencies}</p>
                <p class=""><span class="font-semibold">Languages:</span> ${showCountriesInfos.languages}</p>
            </div>

            <div class="text-base mt-8">
                <h2 class="font-semibold">Border Countries:</h2>
                <p class=""></p>
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

async function getCountries(country) { // Récupération des informations demandées par l'utilisateur
    let url = `https://restcountries.com/v3.1/name/${country}`;
    try {
        const call = await fetch(url);
        const response = await call.json();

        if (response) {
            const countryInfos = response[0];
            showCountriesInfos = {
                flag: countryInfos.flags.svg,
                name: countryInfos.name.common,
                nativeName: countryInfos.name.nativeName, // pas sûr
                population: countryInfos.population,
                region: countryInfos.region,
                subregion: countryInfos.subregion,
                capital: countryInfos.capital,
                tld: countryInfos.tld,
                currencies: countryInfos.currencies, // pas sûr
                languages: countryInfos.languages,
                borders: countryInfos.borders // pas sûr
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

let responseHomePage;
async function getCountriesHomepage() { // Récupération des informations pour la homepage
    let url = "https://restcountries.com/v3.1/all";
    try {
        const call = await fetch(url);
        const response = await call.json();
        responseHomePage = response.length;

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

async function getCountriesHomePageView() { // Affichage des informations pour la homepage
    const countries = await getCountriesHomepage(); {
        if (countries) {
            const countriesDiv = document.getElementById('homePage');
            countries.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.innerHTML = `ll
                ${country.name.common}
                `;
                countryDiv.appendChild(countriesDiv);
            })
        }
    }
}

window.onload = getCountriesHomePageView();