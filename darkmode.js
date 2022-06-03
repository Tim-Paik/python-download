'use strict';

/*
    By KuoHuanHuan Studios, licensed under MIT.
    For more info check ./COPYING.
*/

// Automatically detect which theme to use.
var currentHour = new Date().getHours();
if (currentHour >= 18 || currentHour < 7) document.body.className = 'dark'; // Use dark mode.
else document.body.className = 'light'; // Use light mode.
// Manually set the theme.
function switchDarkMode() {
    // Get the current theme.
    var currentTheme = document.body.className;
    // Switch the theme.
    if (currentTheme === 'dark') {
        currentTheme = 'light';
        document.body.className = 'light';
    } else {
        currentTheme = 'dark';
        document.body.className = 'dark';
    };
    console.log(currentTheme);
};
