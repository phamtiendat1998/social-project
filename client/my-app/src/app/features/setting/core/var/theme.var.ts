import { Theme } from '../interfaces/theme.interface';

export const light: Theme = {
    name: 'light-theme',
    properties: {
        '--color-background-primary': 'white',
        '--color-background-secondary': '#f7f8fa',
        '--color-background-primary-contrast': 'black',
        '--color-background-secondary-contrast': 'black',
        '--color-opacity-primary': '#999ea2'
    }
};

export const dark: Theme = {
    name: 'dark-theme',
    properties: {
        '--color-background-primary': '#303030',
        '--color-background-secondary': '#262626',
        '--color-background-primary-contrast': 'white',
        '--color-background-secondary-contrast': 'white',
        '--color-opacity-primary': '#3a3b3c'
    }
};

export const indigo: Theme = {
    name: 'indigo-color',
    properties: {
        '--color-primary-500': '#2691de',
        '--color-primary-500-opacity': '#2691deab',
        '--color-primary-600': '#1e84d1',
        '--color-primary-700': '#1472bf',
        '--color-primary-contrast-500': '#ffffff',
        '--color-primary-contrast-600': '#ffffff',
        '--color-primary-contrast-700': '#ffffff',
    }
};
export const purple: Theme = {
    name: 'purple-color',
    properties: {
        '--color-primary-500': '#9c27b0',
        '--color-primary-500-opacity': '#9c27b0ab',
        '--color-primary-600': '#8e24aa',
        '--color-primary-700': '#7b1fa2',
        '--color-primary-contrast-500': '#ffffff',
        '--color-primary-contrast-600': '#ffffff',
        '--color-primary-contrast-700': '#ffffff',
    }
};
