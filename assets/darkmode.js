document.addEventListener('DOMContentLoaded', function() {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function enableDarkMode() {
        document.documentElement.classList.add('dark');
    }

    function disableDarkMode() {
        document.documentElement.classList.remove('dark');
    }

    if (prefersDarkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    const toggleDarkModeButton = document.getElementById('toggleDarkmode');
    if (toggleDarkModeButton) {
        toggleDarkModeButton.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
});
