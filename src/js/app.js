/**
 * Entry point of app:
 */

import Widjet from './FormVidjet.js';

const buttonWidjet = new Widjet(document.querySelector('#button-container'));
buttonWidjet.bindToDOM();
