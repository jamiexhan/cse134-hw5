const themeButton = document.getElementById('theme-toggle');

let currentTheme = 'light';

//try/catch if something goes wrong
function getSavedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (error) {
    return null;
  }
}

//saves theme & if fails, we warn in the console
function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('The theme preference could not be saved.');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;

  if (theme === 'dark') {
    themeButton.textContent = 'Light Mode';
  } else {
    themeButton.textContent = 'Dark Mode';
  }
}

const savedTheme = getSavedTheme();
if (savedTheme === 'dark') {
  applyTheme('dark');
} else {
  applyTheme('light');
}

//switches the theme with cross-fade animation
function changeTheme(theme) {
  //for users who asked their device to reduce motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  //if the browser has no View Transition API or reduced motion is on, just apply theme directly
  if (!document.startViewTransition || reduceMotion) {
    applyTheme(theme);
    return;
  }

  document.startViewTransition(function () {
    applyTheme(theme);
  });
}

//flip theme on click
themeButton.addEventListener('click', function () {
  let newTheme = 'light';
  if (currentTheme === 'light') {
    newTheme = 'dark';
  }
  changeTheme(newTheme);
  saveTheme(newTheme);
});


themeButton.hidden = false;