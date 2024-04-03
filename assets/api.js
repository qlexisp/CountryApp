let showCountriesInfos;

document.getElementById('websiteSearch').addEventListener('keyup', e => { // addEventListener de la search bar
    if (e.code === "Enter") {
        let country = document.getElementById('websiteSearch').value;
        showCountries(country);
        getCountries(country);
    }
});

document.getElementById('showCountries').addEventListener('click', c => { // addEventListener click on flag
    if (c) {
        deleteContent();
        countryCard();
    }
});

async function getCountries(country) { // Récupération des informations
    let url = `https://restcountries.com/v3.1/name/${country}`;
    try {
        const call = await fetch(url);
        const response = await call.json();

        if (response) {
            const countryInfos = response[0];
            console.log(countryInfos.borders);
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

async function showCountries(country) { // Affichage des données récupérées
    const showCountriesInfos = await getCountries(country);
    if (showCountriesInfos) {
        document.getElementById('showCountries').innerHTML = `
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

function deleteContent() { // Supprime le contenu de la div "showCountries" en cas d'event
    document.getElementById('showCountries').innerHTML = ``;
};

function countryCard() { // Contenu 
    document.getElementById('showCountries').innerHTML = `
    <div class"my-20 bg-white shadow-md">
        <div class="">
            <img class="" src="assets/img/arrow_back.png">
            <p class="font-bold">Back</p>
        </div>

        <img class="" src="${showCountriesInfos.flag}">
        <div class="">
            <p class="">${showCountriesInfos.name}</p>
            <p class="">${showCountriesInfos.name.nativeName}</p>
            <p class="">${showCountriesInfos.population}</p>
            <p class="">${showCountriesInfos.region}</p>
            <p class="">${showCountriesInfos.subregion}</p>
            <p class="">${showCountriesInfos.capital}</p>
        </div>
    </div>
    `;
}