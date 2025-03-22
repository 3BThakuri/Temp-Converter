// DOM Elements
const celsiusEl = document.getElementById('celsius');
const fahrenheitEl = document.getElementById('fahrenheit');
const kelvinEl = document.getElementById('kelvin');
const clearBtn = document.getElementById('clear');
const themeToggleBtn = document.getElementById('theme-toggle');

//  page loads
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadThemePreference();
});

// all event listeners
const setupEventListeners = () => {
    // Temperature convert
    celsiusEl.addEventListener('input', () => convertFromCelsius());
    fahrenheitEl.addEventListener('input', () => convertFromFahrenheit());
    kelvinEl.addEventListener('input', () => convertFromKelvin());

    // Button
    clearBtn.addEventListener('click', clearAllInputs);
    themeToggleBtn.addEventListener('click', toggleTheme);
};

//  function to round numbers
const round = (num, decimals = 2) => {
    return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
};

// Convert from Celsius to other units
const convertFromCelsius = () => {
    if (!celsiusEl.value) return;

    const celsius = parseFloat(celsiusEl.value);
    fahrenheitEl.value = round((celsius * 9/5) + 32);
    kelvinEl.value = round(celsius + 273.15);
};

// Convert from Fahrenheit to other units
const convertFromFahrenheit = () => {
    if (!fahrenheitEl.value) return;

    const fahrenheit = parseFloat(fahrenheitEl.value);
    const celsius = (fahrenheit - 32) * 5/9;
    fahrenheitEl.value = round(celsius);
    kelvinEl.value = round(celsius + 273.15);
};

// Convert from Kelvin to other units
const convertFromKelvin = () => {
    if (!kelvinEl.value) return;

    const kelvin = parseFloat(kelvinEl.value);
    const celsius = kelvin - 273.15;
    fahrenheitEl.value = round((celsius * 9/5) + 32);
    celsiusEl.value = round(celsius);
};

// Clear all input
const clearAllInputs = () => {
    celsiusEl.value = '';
    fahrenheitEl.value = '';
    kelvinEl.value = '';
};

// theme
const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

const loadThemePreference = () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    }
};
