// import isValid from './Validate.js';

// import { Linter } from "eslint";

export default class Widget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.title = 'Тематическая подсказка';
    /*
    this.button = () => {
      this.bindToDOM();
      return this.parentEl.querySelector(this.constructor.buttonSelector);
    };
    */
    // this.body = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus';
    /*
    get button() {
      this.bindToDOM();
      this._button = this.parentEl.querySelector(this.constructor.buttonSelector);
    }
    */
  }

  static get markup() {
    return `
    <div class="button-relative">
    
    <div class="desk desk-1">
      <div class="desk-title">
        <strong> ToDo </strong>
      </div>
      <div class="desk-body">
      
      </div>
      <div class="desk-link">
      <a  href="#" id = "teg" class="teg-link">+ Add another card</a>
      <form data-widget="form-widget" class="flex" style = "display: none">
          <div class="form-control">
            <input id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
            placeholder = "Enter title for this card...">
          </div>
          <button class = "button" data-id="form-submit">Add card</button>
      </form>
      </div>
    </div>

    <div class="desk desk-2">
      <div class="desk-title">
        <strong> ToProcesing </strong>
      </div>
      <div class="desk-body">
      
      </div>
      <div class="desk-link">
      <a  href="#" id = "teg" class="teg-link">+ Add another card</a>
      <form data-widget="form-widget" class="flex" style = "display: none">
          <div class="form-control">
            <input id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
            placeholder = "Enter title for this card...">
          </div>
          <button class = "button" data-id="form-submit">Add card</button>
      </form>
      </div>
    </div>

    <div class="desk desk-3">
      <div class="desk-title">
        <strong> ToFinish </strong>
      </div>
      <div class="desk-body">
      
      </div>
      <div class="desk-link">
      <a  href="#" id = "teg" class="teg-link">+ Add another card</a>
      <form data-widget="form-widget" class="flex" style = "display: none">
          <div class="form-control">
            <input id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
            placeholder = "Enter title for this card...">
          </div>
          <button class = "button" data-id="form-submit">Add card</button>
      </form>
      </div>
    </div>
    
    </div>
    `;
  }

  static get markupForm() {
    return `
    <form data-widget="form-widget" class="flex">
      <div class="form-control">
        <input id="form-input" data-id="form-input" type="text" minlength="13" maxlength="19">
      </div>
      <button class = "button" data-id="form-submit">Проверить</button>
    </form>
    `;
  }

  static get inputSelector() {
    return '[data-id=form-input]';
  }

  static get buttonSelector() {
    return '[data-id=button-widjet]';
  }

  static get widjetSelector() {
    return '[data-widget=button-widget]';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    // обработчики ссылок
    const arrLink = Array.from(document.querySelectorAll('.teg-link'));
    console.log('arrlink i this', this, arrLink);
    for (const link of arrLink) {
      // document.getElementById('teg').onclick = function goAddWindow() {
      link.onclick = function goAddWindow() {
        console.log('link i this', this, link);
        // const form = this.constructor.markupForm;
        /*
        const form = document.createElement('div');
        form.innerHTML = `
        <form data-widget="form-widget" class="flex">
          <div class="form-control">
            <input id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
            placeholder = "Enter title for this card...">
          </div>
          <button class = "button" data-id="form-submit">Add card</button>
        </form>
        `;
        */
        // form.innerHTML = this.constructor.markupForm;
        // form.style = 'text-align :left';
        link.style.display = 'none';
        // document.getElementById('teg').closest('div.desk-link')
        // link.closest('div.desk-link').insertAdjacentElement('beforeEnd', form);
        link.nextElementSibling.style.display = 'block';
        // предотвращаем переход по ссылке href
        return false;
      };
    }
    // обработка кнопок добавления
    const buttons = Array.from(document.querySelectorAll('.button'));
    console.log('arrlink i this', this, buttons);
    for (const button of buttons) {
      button.addEventListener('click', (e) => this.onClick(e));
    }
  }

  onClick(e) {
    e.preventDefault();
    const parentBody = e.target.closest('div.desk').children;
    const card = document.createElement('div');
    const link = document.createElement('a');
    link.href = '#';
    link.innerHTML = '&#10006;';
    link.classList.add('task__remove', 'visible');
    card.classList.add('div-body');
    card.innerText = parentBody[2].children[1][0].value;
    console.log('arrlink i this', this, parentBody, '\n', e.target, '\n', card);
    parentBody[1].insertAdjacentElement('afterBegin', card);
    card.insertAdjacentElement('beforeEnd', link);
    // none
    e.target.closest('.desk-link').children[1].style.display = 'none';
    e.target.closest('.desk-link').children[0].style.display = 'block';
    e.target.previousElementSibling.children[0].value = '';// closest('#form-input').value = '';
    /*
    if (e.target.parentElement.children.length === 1) {
      this.createPopover();
    } else {
      e.target.parentElement.children[1].remove();
    }
    */
  }

  createPopover() {
    const first = this.parentEl.querySelector(this.constructor.buttonSelector);// = button
    const popover = document.createElement('div');
    popover.className = 'popover fade show bs-popover-top';// 'div-propover';
    // popover.textContent = 'Большой текст сообщения об ошибке';

    const popoverBody = document.createElement('div');
    popoverBody.className = 'popover-body';
    popoverBody.textContent = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus';

    const popoverHead = document.createElement('h3');
    popoverHead.className = 'popover-header';
    popoverHead.textContent = this.title;

    const arrow = document.createElement('div');
    arrow.className = 'arrow';

    popover.appendChild(arrow);
    popover.appendChild(popoverHead);
    popover.appendChild(popoverBody);

    first.offsetParent.appendChild(popover);
    popover.style.top = `${first.offsetTop - popover.offsetHeight - 20}px`;
    popover.style.left = `${first.offsetLeft + first.offsetWidth / 2 - popover.offsetWidth / 2}px`;
    arrow.style.left = 'calc(50% - 10px)';
    arrow.style.top = `${popover.offsetHeight - 3}px`;
    arrow.classList.add('top');
    // console.log('кнопка', this.button);
  }
}
/*
<button type="button" class="btn btn-secondary"
data-id= "button-widjet" data-container="body"
data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel
augue laoreet rutrum faucibus.">
Popover on top
</button>

<span class="SVGInline components-lms-Execution-components-Menu--openIcon--3UvUz"><svg class="SVGInline-svg components-lms-Execution-components-Menu--openIcon--3UvUz-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g opacity="0.5">
  <path d="M1 8H15" stroke="#333333" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M1 2H15" stroke="#333333" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M1 14H15" stroke="#333333" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round"></path>
  <ellipse rx="2" ry="2" transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 4 2)"
  fill="#333333"></ellipse>
  <ellipse rx="2" ry="2" transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 12 8)"
  fill="#333333"></ellipse>
  <ellipse rx="2" ry="2" transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 4 14)"
  fill="#333333"></ellipse>
  </g>
</svg></span>
*/
