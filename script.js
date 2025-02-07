// script.js
document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const modeLabel = document.getElementById('mode-label');
    const body = document.body;

    // Load saved mode from localStorage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'light-mode') {
        body.classList.add('light-mode');
        modeToggle.checked = true;
        modeLabel.textContent = 'Light Mode';
    } else {
        modeLabel.textContent = 'Dark Mode';
    }

    // Toggle dark/light mode
    modeToggle.addEventListener('change', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('mode', 'light-mode');
            modeLabel.textContent = 'Light Mode';
        } else {
            localStorage.setItem('mode', 'dark-mode');
            modeLabel.textContent = 'Dark Mode';
        }
    });
});