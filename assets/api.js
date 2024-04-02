// addEventListener de la search bar
document.getElementById('websiteSearch').addEventListener('keyup', e => {
    if (e.code === "Enter") {
        let country = document.getElementById('websiteSearch').value;
        showCountries(country);
    }
});

async function getCountries(country) { // Récupération des informations
    let url = `https://restcountries.com/v3.1/name/${country}`;
    try {
        const call = await fetch(url);
        const response = await call.json();

        if (response) {
            const countryInfos = response[0];
            // console.log(countryInfos.flags.svg);
            return {
                flag: countryInfos.flags.svg,
                name: countryInfos.name.common,
                population: countryInfos.population,
                region: countryInfos.continents[0],
                capital: countryInfos.capital
            };
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

async function showCountries(country) {
    const showCountriesInfos = await getCountries(country);
    if (showCountriesInfos) {
        document.getElementById('showCountries').innerHTML = `
        <div class="bg-white my-8 w-[80%] mx-8 shadow-md rounded-md">
        <img class="mb-6" src="${showCountriesInfos.flag}">
        <div class="pl-6 pb-12">
        <p class="font-bold text-lg mb-4">${showCountriesInfos.name}</p>
        <p class="text-sm"><span class="font-semibold">Population:</span> ${showCountriesInfos.population}</p>
        <p class="text-sm"><span class="font-semibold">Region:</span> ${showCountriesInfos.region}</p>
        <p class="text-sm"><span class="font-semibold">Capital:</span> ${showCountriesInfos.capital}</p>
        </div>
        </div>`;
    }
}