

export default class Trello {
  constructor(parentEl) {
    this.parentEl = parentEl;
    // this.title = 'Тематическая подсказка';
    this.storage = {
      // desk1: [],
      // desk2: [],
      // desk3: [],
    };
    // this.onDrag = this.onDrag.bind(this);
    // this.cardDelete = this.cardDelete.bind(this);
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
          <a  href="#" id = "teg" class="teg-link" onmousedown="return false">+ Add another card</a>
          <form data-widget="form-widget" class="flex" style = "display: none">
              <div class="form-control">
              <textarea id="form-input" data-id="form-input" type="text" minlength="1" maxlength="100"
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
          <a  href="#" id = "teg" class="teg-link" onmousedown="return false">+ Add another card</a>
          <form data-widget="form-widget" class="flex" style = "display: none">
              <div class="form-control">
                <textarea id="form-input" data-id="form-input" type="text" minlength="1" maxlength="100"
                placeholder = "Enter title for this card..."></textarea>
              </div>
              <div class="buttons">
                <button class = "button" data-id="form-submit">Add card</button>
                <a  href="#" id = "close" class="close-link">&#10006;</a>
              </div>
          </form>
        </div>
      </div>

      <div id= "3" class="desk desk-3">
        <div class="desk-title">
          <span> To Finish </span>
        </div>
        <div class="desk-body drop-area" data-id="drop-area">
        </div>
        <div class="desk-link">
          <a  href="#" id = "teg" class="teg-link" draggable ="false">+ Add another card</a>
          <form data-widget="form-widget" class="flex" style = "display: none">
            <div class="form-control">
              <textarea id="form-input" data-id="form-input" type="text" minlength="1" maxlength="100"
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

  init(arrExample) {
    if (localStorage.getItem('trello') === null) {
      this.storage = arrExample;
    } else {
      this.storage = JSON.parse(localStorage.getItem('trello'));
    }
  }

  cardDelete() {
    const cards = Array.from(document.querySelectorAll('.div-body'));
    console.log('cards i this', this, cards);
    for (const card of cards) {
      card.onmouseenter = function Enter(e) {
        e.preventDefault();// если без span  то везде children 0!!!
        if (e.target.classList.contains('div-body') && e.target.children[1].classList.contains('visible')) {
          e.target.children[1].classList.remove('visible');
          card.children[1].addEventListener('click', (event) => {
            event.preventDefault();
            console.log('===========', e.target.children[1], card.children[1]);
            event.target.closest('.div-body').remove();
            // const id = event.target.closest('.desk').attribute('id');
            // const desk = `desk${id}`;
            // this.storage.desk1.innexOf('');
            // card.onDrag();// изменился массив ссылок, поэтому переделываем обработчики!
            // setTimeout(() => this.onDrag, 0);
            // this.onDrag();
          });
          // !!! this.onDrag(event);сюда слушатель зажатия кнопки, вызов на event
          // setTimeout(() => this.onDrag, 0);
        }
      };

      //
      card.onmouseleave = function Leave(ev) {
        ev.preventDefault();
        if (ev.target.classList.contains('div-body')
        && !ev.target.children[1].classList.contains('visible')) {
          ev.target.children[1].classList.add('visible');
          // e.target.style.background = 'blue';
        }
        // return false;
      };
      // setTimeout(() => this.onDrag, 0);
      // card.onDrag();// изменился массив ссылок, поэтому переделываем обработчики!
      // this.onDrag.bind(this);
      // this.parentElement.onDrag();
    }
    // this.onDrag();
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
        
      };
    }
    // обработка кнопок добавления
    const buttons = Array.from(document.querySelectorAll('.button'));
    console.log('arrlink i this', this, buttons);
    for (const button of buttons) {
      button.addEventListener('click', (e) => this.onClick(e));
    }
    // обработчики ссылок 2 закрытие формы добавления
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
    // обработка Drag убрала пока
    //const desks = Array.from(document.querySelectorAll('.desk-body')); //  прлощадь доскb 3
    // const desks = document.querySelectorAll('[data-id=drop-area]');
    //const cards = Array.from(document.querySelectorAll('.div-body')); // карточки в досках
    //console.log('cards i desks this drog!!!-------', this, cards, '\n', desks);
    /*for (const element of desks) {
      element.addEventListener('click', (e) => this.onDrag(e));
    }*/
     // card. element.addEventListener('', (e) => this.onDrag(e));
  }// bind

  onClick(e) {
    e.preventDefault();
    const parentBody = e.target.closest('div.desk').children;
    if (parentBody[2].children[1][0].value) {
    // создание карточки и ссылки ее удаления
      const card = document.createElement('div');
      const link = document.createElement('a');
      const text = document.createElement('span');
      link.href = '#';
      link.innerHTML = '&#10006;';
      link.classList.add('task__remove', 'visible');
      card.classList.add('div-body');
      text.classList.add('texts');
      text.innerHTML = parentBody[2].children[1][0].value;
      card.draggable = 'true';
      // card.innerText = parentBody[2].children[1][0].value;
      // card.innerHTML = `<span class="text">${parentBody[2].children[1][0].value}</span>`;
      console.log('arrlink i this', this, parentBody, '\n', e.target, '\n', card, '\n', text);
      parentBody[1].insertAdjacentElement('afterBegin', card);
      card.insertAdjacentElement('beforeEnd', link);
      card.insertAdjacentElement('afterBegin', text);
      // none
      e.target.closest('.desk-link').children[1].style.display = 'none';
      e.target.closest('.desk-link').children[0].style.display = 'block';
      e.target.closest('.buttons').previousElementSibling.children[0].value = '';
      // closest('#form-input').value = '';
      // this.cardDelete();

      this.cardDelete();
      // this.onDrag();
      // card.onDrag();                    //  this.onDrag.bind(this);работает но не на том элементе
      // this.onDrag.bind(card);
      // this.onDrog(); // не надо тк вызывается в делите
      // this.onDrag();
    }
    // this.onDrag();// ---------------------------
  }// onClick

  onDrag(ev) {
    const desks = Array.from(document.querySelectorAll('.desk-body')); //  прлощадь доскb 3
    // const desks = document.querySelectorAll('[data-id=drop-area]');
    const cards = Array.from(document.querySelectorAll('.div-body')); // карточки в досках
    console.log('cards i desks this drog!!!-------', this, cards, '\n', desks, ev);
    /*
        let draggedEl = null;
        let ghostEl = null;
        */
    // for (const element of cards) {
    let draggedEl = null;
    let ghostEl = null;

    // const element = document.querySelector('#trello-container'); //  прлощадь доскb 3
    // const element = document.querySelector('.board');
    /*
    const element = this.parentEl.querySelector('.board');
    */

    const element = ev.target.closest('.desk-body');
    // const element = ev.target;
    console.log('desk drog!!!-------', element);
    element.addEventListener('dragstart', (e) => {
      e.preventDefault();
      // e.target.closest('.div-body').classList.add('selected');
      e.target.classList.add('selected');
      console.log('selected-------', this, e.target, e.carrentTarget, '\n');
      e.target.style.backgroundColor = 'green';
      draggedEl = element;
    });

    element.addEventListener('dragend', (e) => {
      e.preventDefault();
      e.target.classList.remove('selected');
    });

    element.addEventListener('mousedown', (e) => {
      // e.preventDefault();
      /*
      if (e.target.classList.contains('desk-link') || e.target.classList.contains('flex')
      || e.target.closest('#form-input') || e.target.classList.contains('button')
      || e.target.classList.contains('close-link')) {
        return;
      }
      */

      // if (e.target.closest('.desk-link')) { return; }
      /*
        const target = e.target.closest('div.div-body');
        if (!target) {

      */
      e.preventDefault();
      if (!e.target.classList.contains('div-body')) {
        return;
      }
      if (e.target.classList.contains('div-body')) {
        e.target.style.cursor = 'grabbing';
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
      }
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
    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      // const activeElement = element.querySelector('.selected');
    }, { capture: true });

    element.addEventListener('drop', function (e) {
      e.preventDefault();
      // this.style.backgroundColor = 'rgba(0,0,0,0)';
      this.append(draggedEl);
    });
    // }// for desks
  } // on Drog
}

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
/*

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
  </svg>
</span>
*/
