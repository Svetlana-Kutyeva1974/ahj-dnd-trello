// import paySistem from '../paySystem.js';
import Widjet from '../FormVidjet.js';

const formVidjet = new Widjet(document.querySelector('#form-container'));
formVidjet.bindToDOM();

test('Метод creatButton должен создать и вставить элемент кнопки в DOM', () => {
  expect(document.body.firstElementChild.innerHTML).toBe(formVidjet.constructor.markup);
  // expect(document.body.firstchildren.innerHTML).toBe(formVidjet.markup);
});
