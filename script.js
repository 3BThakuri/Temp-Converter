// DOM Elements
const celsiusEl = document.getElementById('celsius');
const fahrenheitEl = document.getElementById('fahrenheit');
const kelvinEl = document.getElementById('kelvin');
const clearBtn = document.getElementById('clear');
const themeToggleBtn = document.getElementById('theme-toggle');

// Prevents infinite loops
let isUpdating = false;

// Load theme on page load
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadThemePreference();
});

// Setup event listeners
const setupEventListeners = () => {
    celsiusEl.addEventListener('input', () => convertFromCelsius());
    fahrenheitEl.addEventListener('input', () => convertFromFahrenheit());
    kelvinEl.addEventListener('input', () => convertFromKelvin());

    clearBtn.addEventListener('click', clearAllInputs);
    themeToggleBtn.addEventListener('click', toggleTheme);
};

// Function to round numbers
const round = (num, decimals = 2) => {
    return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
};

// Convert from Celsius
const convertFromCelsius = () => {
    if (!celsiusEl.value || isUpdating) return;
    isUpdating = true;

    const celsius = parseFloat(celsiusEl.value);
    fahrenheitEl.value = round((celsius * 9/5) + 32);
    kelvinEl.value = round(celsius + 273.15);

    isUpdating = false;
};

// Convert from Fahrenheit
const convertFromFahrenheit = () => {
    if (!fahrenheitEl.value || isUpdating) return;
    isUpdating = true;

    const fahrenheit = parseFloat(fahrenheitEl.value);
    const celsius = (fahrenheit - 32) * 5/9;
    celsiusEl.value = round(celsius);
    kelvinEl.value = round(celsius + 273.15);

    isUpdating = false;
};

// Convert from Kelvin
const convertFromKelvin = () => {
    if (!kelvinEl.value || isUpdating) return;
    isUpdating = true;

    const kelvin = parseFloat(kelvinEl.value);
    const celsius = kelvin - 273.15;
    celsiusEl.value = round(celsius);
    fahrenheitEl.value = round((celsius * 9/5) + 32);

    isUpdating = false;
};

// Clear all inputs
const clearAllInputs = () => {
    celsiusEl.value = '';
    fahrenheitEl.value = '';
    kelvinEl.value = '';
};

// Theme toggle
const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Load theme preference
const loadThemePreference = () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    }
};
