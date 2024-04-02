


// addEventListener de la search bar
document.getElementById('websiteSearch').addEventListener('keyup', e => {
    if (e.code === "Enter") {
        let country = document.getElementById('websiteSearch').value;
        console.log(country);
    }
});