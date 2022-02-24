// import isValid from './Validate.js';

export default class Trello {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.title = 'Тематическая подсказка';
    this.storage = {
      desk1: [],
      desk2: [],
      desk3: [],
    };
  }

  static get markup() {
    return `
    <div class="board">
      <div id= "1" class="desk desk-1">
        <div class="desk-title">
          <span> To Do </span>
        </div>
        <div class="desk-body drop-area" data-id="drop-area">
        </div>
        <div class="desk-link">
          <a  href="#" id = "teg" class="teg-link">+ Add another card</a>
          <form data-widget="form-widget" class="flex" style = "display: none">
              <div class="form-control">
              <textarea id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
              placeholder = "Enter title for this card..."></textarea>
              </div>
              <div class="buttons">
                <button class = "button" data-id="form-submit">Add card</button>
                <a  href="#" id = "close" class="close-link">&#10006;</a>
              </div>
          </form>
        </div>
      </div>

      <div id= "2" class="desk desk-2">
        <div class="desk-title">
          <span> To Procesing </span>
        </div>
        <div class="desk-body drop-area" data-id="drop-area">
        </div>
        <div class="desk-link">
          <a  href="#" id = "teg" class="teg-link">+ Add another card</a>
          <form data-widget="form-widget" class="flex" style = "display: none">
              <div class="form-control">
                <textarea id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
                placeholder = "Enter title for this card..."></textarea>
              </div>
              <div class="buttons">
                <button class = "button" data-id="form-submit">Add card</button>
                <a  href="#" id = "close" class="close-link">&#10006;</a>
              </div>
          </form>
        </div>
      </div>

      <div id= "2" class="desk desk-3">
        <div class="desk-title">
          <span> To Finish </span>
        </div>
        <div class="desk-body drop-area" data-id="drop-area">
        </div>
        <div class="desk-link">
          <a  href="#" id = "teg" class="teg-link">+ Add another card</a>
          <form data-widget="form-widget" class="flex" style = "display: none">
            <div class="form-control">
              <textarea id="form-input" data-id="form-input" type="text" minlength="1" maxlength="19"
              placeholder = "Enter title for this card..."></textarea>
            </div>
            <div class="buttons">
              <button class = "button" data-id="form-submit">Add card</button>
              <a  href="#" id = "close" class="close-link">&#10006;</a>
            </div>
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

  cardDelete() {
    const cards = Array.from(document.querySelectorAll('.div-body'));
    console.log('cards i this', this, cards);
    for (const card of cards) {
      card.onmouseenter = function (e) {
        e.preventDefault();
        if (e.target.classList.contains('div-body') && e.target.children[0].classList.contains('visible')) {
          e.target.children[0].classList.remove('visible');
          card.children[0].addEventListener('click', (event) => {
            event.preventDefault();
            console.log('===========', event.target.children[0]);
            event.target.closest('.div-body').remove();
            // card.onDrag();// изменился массив ссылок, поэтому переделываем обработчики!
            // this.onDrag.bind(this);
          });
        }
      };
      //
      card.onmouseleave = function (ev) {
        ev.preventDefault();
        if (ev.target.classList.contains('div-body')
        && !ev.target.children[0].classList.contains('visible')) {
          ev.target.children[0].classList.add('visible');
          // e.target.style.background = 'blue';
        }
        return false;
      };
      // this.onDrag();
      // card.onDrag();// изменился массив ссылок, поэтому переделываем обработчики!
      // this.onDrag.bind(this);
    }
  }

  onDrag() {
  // обработка Drag
    const desks = Array.from(document.querySelectorAll('.desk-body')); //  доскb 3
    // const desks = document.querySelectorAll('[data-id=drop-area]');
    const cards = Array.from(document.querySelectorAll('.div-body')); // карточки в досках
    console.log('cards i desks this drog-------', this, cards, '\n', desks);
    /*
    let draggedEl = null;
    let ghostEl = null;
    */
    // for (const element of cards) {
    for (const element of desks) {
      let draggedEl = null;
      let ghostEl = null;

      element.addEventListener('dragstart', (e) => {
        e.preventDefault();
        e.target.classList.add('selected');
        draggedEl = element;
      });

      element.addEventListener('dragend', (e) => {
        e.preventDefault();
        e.target.classList.remove('selected');
      });

      element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('div-body')) {
          return;
        }
        draggedEl = e.target;
        console.log('тянем это', draggedEl);
        ghostEl = e.target.cloneNode(true);
        ghostEl.classList.add('dragged');
        document.body.appendChild(ghostEl);
        ghostEl.style.position = 'absolute';
        ghostEl.style.zIndex = 1000;
        ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
        ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
        console.log('скопировали это', ghostEl);
      });
      // тянем
      element.addEventListener('mousemove', (e) => {
        e.preventDefault(); // не даём выделять элементы
        if (!draggedEl) {
          return;
        }
        ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
        ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
      });

      element.addEventListener('mouseleave', (e) => {
        // при уходе курсора за границы контейнера - отменяем перенос
        console.log(e);
        if (!draggedEl) {
          return;
        }
        document.body.removeChild(ghostEl);
        ghostEl = null;
        draggedEl = null;
      });

      element.addEventListener('mouseup', (e) => {
        if (!draggedEl) {
          return;
        }
        /*
        const closest = document.elementFromPoint(e.clientX, e.clientY);
        e.currentTarget.insertBefore(draggedEl, closest);
        document.body.removeChild(ghostEl);
        ghostEl = null;
        draggedEl = null;
        */
        const closest = document.elementFromPoint(e.clientX, e.clientY);
        const { top } = closest.getBoundingClientRect();
        if (e.pageY > window.scrollY + top + closest.offsetHeight / 2) {
          e.currentTarget.insertBefore(draggedEl, closest.nextElementSibling);
        } else {
          e.currentTarget.insertBefore(draggedEl, closest);
        }
        document.body.removeChild(ghostEl);
        ghostEl = null;
        draggedEl = null;
      });
      //
      // const drop = document.querySelector('[data-id=drop-area]');
      element.addEventListener('dragover', (evt) => {
        evt.preventDefault();
        // const activeElement = element.querySelector('.selected');
      });
      element.addEventListener('drop', function (evt) {
        evt.preventDefault();
        this.style.backgroundColor = 'rgba(0,0,0,0)';
        this.append(draggedEl);
      });
      //
      // для всех досок принятие элемента
      /*
      for (const desk of desks) {
        // const dropEl = document.querySelector('[data-id=drop-area]');
        const dropEl = desk;
        dropEl.addEventListener('dragover', (evt) => {
          evt.preventDefault();
        });

        dropEl.addEventListener('dragenter', function (ev) {
          ev.preventDefault();
          this.style.backgroundColor = 'rgba(0,0,0,.3)';
        });

        dropEl.addEventListener('dragleave', function (e) {
          // ev.preventDefault();
          this.style.backgroundColor = 'rgba(0,0,0,0)';
        });
        dropEl.addEventListener('drop', function (e) {
          this.style.backgroundColor = 'rgba(0,0,0,0)';
          this.append(draggedEl);
        });
      }
      */
    }// for  карточки
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    // обработчики ссылок 1
    const arrLink = Array.from(document.querySelectorAll('.teg-link'));
    // вызов формы добавления
    console.log('arrlink i this', this, arrLink);
    for (const link of arrLink) {
      // document.getElementById('teg').onclick = function goAddWindow() {
      link.onclick = function goAddWindow() {
        console.log('link i this', this, link);
        link.style.display = 'none';
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
    // обработчики ссылок 2
    const arrLink2 = Array.from(document.querySelectorAll('.close-link'));
    // ccskrb1
    console.log('arrlink i this', this, arrLink2);
    for (const link of arrLink2) {
      // document.getElementById('teg').onclick = function goAddWindow() {
      link.onclick = function closeWindow() {
        console.log('link i this', this, link);
        // form.style = 'text-align :left';
        link.closest('.desk-link').children[0].style.display = 'block';
        link.closest('.flex').style.display = 'none';
        // предотвращаем переход по ссылке href
        return false;
      };
    }

    // 2

    // обработка Drag
    /*
    const cards = Array.from(document.querySelectorAll('.div-body'));
    console.log('cards i this', this, cards);

    for (const element of cards) {
      let draggedEl = null;
      let ghostEl = null;

      element.onmouseover = function (e) {
        // const target = event.target;
        e.target.style.background = 'green';
      };
      element.onmouseout = function (e) {
        // const target = event.target;
        e.target.style.background = '';
      };

      element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('items-item')) {
          return;
        }
        draggedEl = e.target;
        console.log('тянем это', draggedEl);
        ghostEl = e.target.cloneNode(true);
        ghostEl.classList.add('dragged');
        document.body.appendChild(ghostEl);
        ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
        ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
        console.log('скопировали это', ghostEl);
      });
      // тянем
      element.addEventListener('mousemove', (e) => {
        e.preventDefault(); // не даём выделять элементы
        if (!draggedEl) {
          return;
        }
        ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
        ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
      });

      element.addEventListener('mouseleave', (e) => {
        // при уходе курсора за границы контейнера - отменяем перенос
        console.log(e);
        if (!draggedEl) {
          return;
        }
        document.body.removeChild(ghostEl);
        ghostEl = null;
        draggedEl = null;
      });

      element.addEventListener('mouseup', (e) => {
        if (!draggedEl) {
          return;
        }
        const closest = document.elementFromPoint(e.clientX, e.clientY);
        e.currentTarget.insertBefore(draggedEl, closest);
        document.body.removeChild(ghostEl);
        ghostEl = null;
        draggedEl = null;
      });
    }
    */
  }

  onClick(e) {
    e.preventDefault();
    const parentBody = e.target.closest('div.desk').children;
    if (parentBody[2].children[1][0].value) {
    // создание карточки и ссылки ее удаления
      const card = document.createElement('div');
      const link = document.createElement('a');
      link.href = '#';
      link.innerHTML = '&#10006;';
      link.classList.add('task__remove', 'visible');
      card.classList.add('div-body');

      card.draggable = 'true';
      card.innerText = parentBody[2].children[1][0].value;
      // card.innerHTML = `<span class="text">${parentBody[2].children[1][0].value}</span>`;
      console.log('arrlink i this', this, parentBody, '\n', e.target, '\n', card);
      parentBody[1].insertAdjacentElement('afterBegin', card);
      card.insertAdjacentElement('beforeEnd', link);
      // none
      e.target.closest('.desk-link').children[1].style.display = 'none';
      e.target.closest('.desk-link').children[0].style.display = 'block';
      e.target.closest('.buttons').previousElementSibling.children[0].value = '';// closest('#form-input').value = '';
      this.cardDelete();
      // card.onDrag();                    //  this.onDrag.bind(this);работает но не на том элементе
      // this.onDrag.bind(card);
      this.onDrag();
      /*
      if (e.target.parentElement.children.length === 1) {
        this.createPopover();
      } else {
        e.target.parentElement.children[1].remove();
      }
      */
    }
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
