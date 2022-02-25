/**
 * Entry point of app:
 */

import Trello from './trello.js';

const trelloWidjet = new Trello(document.querySelector('#trello-container'));
trelloWidjet.bindToDOM();
// trelloWidjet.onDrag();
