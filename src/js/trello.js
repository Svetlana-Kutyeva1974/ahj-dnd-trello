// import isValid from './Validate.js';

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
          });// cлушали щелчок на удаление
        
        }
        //drag
        //if (e.target.classList.contains('div-body')) {
          //if (e.target.closest('.div-body').classList.contains('div-body')) {
          
          card.addEventListener('mousedown', (event) => {
            
            if (event.target.classList.contains('task__remove')) {
              return;
            }
            event.preventDefault();
            let draggedEl = null;
            let ghostEl = null;
            let element2 = event.target.closest('.div-body');
            console.log('===========', e.target, element2 );
            // event.target.closest('.div-body').remove();
            if (!e.target.classList.contains('div-body')) {
              return;
            }
            if (event.target.closest('.div-body').classList.contains('div-body')) {
              // event.target.style.cursor = 'grabbing';
              element2.style.cursor = 'grabbing';
              // draggedEl = e.target;
              draggedEl = element2;
              console.log('тянем это', draggedEl);
              // ghostEl = event.target.cloneNode(true);
              ghostEl = element2.cloneNode(true);
              ghostEl.classList.add('dragged');
              document.body.appendChild(ghostEl);
              ghostEl.style.position = 'absolute';
              ghostEl.style.zIndex = 1000;
              ghostEl.style.width = `${element2.offsetWidth}px`;
              ghostEl.style.left = `${event.pageX - ghostEl.offsetWidth / 2}px`;
              ghostEl.style.top = `${event.pageY - ghostEl.offsetHeight / 2}px`;
              ghostEl.style.backgroundColor = 'green';
              ghostEl.style.opacity = 0.6;
              console.log('скопировали это', ghostEl);
            }

            //
            card.closest('.board').addEventListener('mousemove', (e) => {
              e.preventDefault(); // не даём выделять элементы
              if (!draggedEl) {
                return;
              }
              ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
              ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
            });

            //
            card.closest('.board').addEventListener('mouseup', (e) => {
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
              const closestParent = closest.closest('.div-body');
              const parent = closest.closest('.desk');

              console.log('кидаем это на e.currentTarget', ghostEl, draggedEl, '\n etarget', e.target, '\n closest', closest, '\n carrenttag', e.currentTarget);
              console.log('childrene.currentTarget', e.currentTarget.children);
              console.log('parent', parent);
              console.log('parent', closestParent);
              const { top } = closest.getBoundingClientRect();
              if (e.pageY > window.scrollY + top + closest.offsetHeight / 2) {
                parent.children[1].appendChild(draggedEl, closest.nextElementSibling);
                // e.currentTarget.insertBefore(draggedEl, closest.nextElementSibling);
              } else {
                // e.currentTarget.insertBefore(draggedEl, closest);
                parent.children[1].appendChild(draggedEl, closest);
              }
              document.body.removeChild(ghostEl);
              ghostEl = null;
              draggedEl = null;
            });

          });// cлушали щелчок на удаление
        
        //}
      };

      //
      card.onmouseleave = function Leave(ev) {
        ev.preventDefault();
        if (ev.target.classList.contains('div-body')
        && !ev.target.children[1].classList.contains('visible')) {
          ev.target.children[1].classList.add('visible');
          // e.target.style.background = 'blue';
        }
      };
    }
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    // обработчики ссылок 1
    const arrLink = Array.from(document.querySelectorAll('.teg-link'));
    // вызов формы добавления
    console.log('arrlink i this', this, arrLink);
    for (const link of arrLink) {
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
      link.onclick = function closeWindow() {
        console.log('link i this', this, link);
        link.closest('.desk-link').children[0].style.display = 'block';
        link.closest('.flex').style.display = 'none';
      };
    }
    // 2
    // обработка Drag
    //const desks = Array.from(document.querySelectorAll('.desk-body')); //  прлощадь доскb 3
    // const desks = document.querySelectorAll('[data-id=drop-area]');
    //const cards = Array.from(document.querySelectorAll('.div-body')); // карточки в досках
    //console.log('cards i desks this drog!!!-------', this, cards, '\n', desks);
    //for (const element of desks) {
   //   element.addEventListener('dragstart', (e) => this.onDrag(e));
   // }
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

      console.log('arrlink i this', this, parentBody, '\n', e.target, '\n', card, '\n', text);
      parentBody[1].insertAdjacentElement('afterBegin', card);
      card.insertAdjacentElement('beforeEnd', link);
      card.insertAdjacentElement('afterBegin', text);
      // none
      e.target.closest('.desk-link').children[1].style.display = 'none';
      e.target.closest('.desk-link').children[0].style.display = 'block';
      e.target.closest('.buttons').previousElementSibling.children[0].value = '';

      this.cardDelete();
      // this.onDrag.bind(card);
    }
    // this.onDrag();// ---------------------------
  }// onClick

  onDrag(ev) {
    const desks = Array.from(document.querySelectorAll('.desk-body')); //  прлощадь доскb 3
    // const desks = document.querySelectorAll('[data-id=drop-area]');
    const cards = Array.from(document.querySelectorAll('.div-body')); // карточки в досках
    console.log('cards i desks this drog!!!-------', this, cards, '\n', desks, ev);
    // for (const element of cards) {
    let draggedEl = null;
    let ghostEl = null;

    // const element = document.querySelector('#trello-container'); //  прлощадь доскb 3
    // const element = document.querySelector('.board');
    /*
    const element = this.parentEl.querySelector('.board');
    */

    // const element = ev.target.closest('.desk-body');
    // const element = ev.target.closest('.div-body');
    const element = ev.target;
    console.log('desk drog!!!-------', element);

    element.addEventListener('dragstart', (e) => {
      e.preventDefault();
      // e.target.closest('.div-body').classList.add('selected');
      e.target.classList.add('selected');
      console.log('selected-------', this, e.target, e.carrentTarget, '\n');
      // e.target.style.backgroundColor = 'green';
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
