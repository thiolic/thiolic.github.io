window.addEventListener('load', () => {
    let mainWrapper = document.querySelector('.todo');
    let todoList = document.querySelector('.todo__list');
    let counter = 0;
    let todo;

    let toLocal = () => {
        todo = todoList.innerHTML;
        localStorage.setItem('todo', todo);
    };

    let createElement = () => {
        let input = document.querySelector('.todo__input');
        let inputValue = input.value;
        let newLi = document.createElement('li');
        let liStructure = '<span class="todo__item-text" contenteditable="false"></span>' +
                        '<div class="todo__item-buttons">' +
                        '<button class="todo__item-button -edit">Edit</button>' +
                        '<button class="todo__item-button -remove">Remove</button>' +
                        '<button class="todo__item-button -done">Done</button>' +
                        '</div>';
        if (inputValue.trim().length !== 0) {
            newLi.innerHTML = liStructure;
            newLi.classList.add('todo__item');
            newLi.querySelector('.todo__item-text').innerHTML = inputValue;
            todoList.appendChild(newLi);
            input.value = '';
            counter++;
        }
    };

    let removeElement = (elem) => {
        todoList.removeChild(elem.parentNode.parentNode);
    };

    let editElement = (elem) => {
        let elemParent = elem.parentNode.parentNode;
        let editingField = elemParent.querySelector('.todo__item-text');

        if (editingField.classList.contains('js-todo-active')) {
            editingField.classList.remove('js-todo-active');
            editingField.setAttribute('contenteditable', 'false');
            elem.innerHTML = 'Edit';
        } else {
            editingField.classList.add('js-todo-active');
            editingField.setAttribute('contenteditable', 'true');
            elem.innerHTML = 'Save';
        }
    };

    let completeElement = (elem) => {
        let elemParent = elem.parentNode.parentNode;
        let text = elemParent.querySelector('.todo__item-text');

        return text.classList.contains('js-todo-checked') ? text.classList.remove('js-todo-checked') : text.classList.add('js-todo-checked');
    };

    mainWrapper.addEventListener('click', (event) => {
        let target = event.target;

        if (target.tagName.toLowerCase() === 'button') {
            if (target.classList.contains('todo__add')) {
                createElement();
            }

            if (target.classList.contains('-remove')) {
                removeElement(target);
            }

            if (target.classList.contains('-edit')) {
                editElement(target);
            }

            if (target.classList.contains('-done')) {
                completeElement(target);
            }

            toLocal();
        }
    });

    if (localStorage.getItem('todo')) {
        todoList.innerHTML = localStorage.getItem('todo');
    }
});
