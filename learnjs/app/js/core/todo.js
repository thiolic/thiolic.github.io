window.addEventListener('load', () => {
    let mainWrapper = document.querySelector('.todo');
    let todoList = document.querySelector('.todo__list');
    let counter = 0;
    let todo;

    let initButtonsHandlers = () => {
        let handlersWrap = document.querySelector('.handlers');
        handlersWrap.innerHTML = '<button class="js-todo-add-handlers">Add Events</button>' +
            '<button class="js-todo-remove-handlers">Remove Events</button>';
    };

    initButtonsHandlers();

    let toLocal = () => {
        todo = todoList.innerHTML;
        localStorage.setItem('todo', todo);
    };

    function createElement() {
        let input = document.querySelector('.todo__input');
        let inputValue = input.value;
        let newLi = document.createElement('li');
        let liStructure = '<span class="todo__item-text" contenteditable="false"></span>' +
            '<div class="todo__item-buttons">' +
            '<button class="todo__item-button js-todo-edit">Edit</button>' +
            '<button class="todo__item-button js-todo-remove">Remove</button>' +
            '<button class="todo__item-button js-todo-done">Done</button>' +
            '</div>';
        if (inputValue.trim().length !== 0) {
            newLi.innerHTML = liStructure;
            newLi.classList.add('todo__item');
            newLi.querySelector('.todo__item-text').innerHTML = inputValue;
            todoList.appendChild(newLi);
            input.value = '';
            counter++;
        }

        toLocal();
        addHandlers();
        removeHandlers();
    }

    mainWrapper.querySelector('.todo__add').addEventListener('click', createElement);

    function removeElement()  {
        todoList.removeChild(this.parentNode.parentNode);
        toLocal();
    }

    function editElement() {
        let elemParent = this.parentNode.parentNode;
        let editingField = elemParent.querySelector('.todo__item-text');

        if (editingField.classList.contains('js-todo-active')) {
            editingField.classList.remove('js-todo-active');
            editingField.setAttribute('contenteditable', 'false');
            this.innerHTML = 'Edit';
        } else {
            editingField.classList.add('js-todo-active');
            editingField.setAttribute('contenteditable', 'true');
            this.innerHTML = 'Save';
        }

        toLocal();
    }

    function completeElement() {
        let elemParent = this.parentNode.parentNode;
        let text = elemParent.querySelector('.todo__item-text');

        text.classList.contains('js-todo-checked') ? text.classList.remove('js-todo-checked') : text.classList.add('js-todo-checked');

        toLocal();
    }

    let addHandlers = () => {
        document.querySelectorAll('.js-todo-edit').forEach((btn) => {
            btn.addEventListener('click', editElement);
        });

        document.querySelectorAll('.js-todo-done').forEach((btn) => {
            btn.addEventListener('click', completeElement);
        });

        document.querySelectorAll('.js-todo-remove').forEach((btn) => {
            btn.addEventListener('click', removeElement);
        });
    };

    let removeHandlers = () => {
        document.querySelectorAll('.js-todo-edit').forEach((btn) => {
            btn.removeEventListener('click', editElement);
        });

        document.querySelectorAll('.js-todo-done').forEach((btn) => {
            btn.removeEventListener('click', completeElement);
        });

        document.querySelectorAll('.js-todo-remove').forEach((btn) => {
            btn.removeEventListener('click', removeElement);
        });
    };

    if (localStorage.getItem('todo')) {
        todoList.innerHTML = localStorage.getItem('todo');
    }

    document.querySelector('.js-todo-add-handlers').addEventListener('click', addHandlers);
    document.querySelector('.js-todo-remove-handlers').addEventListener('click', removeHandlers);
});
