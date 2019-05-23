window.addEventListener('load', () => {
    let btnAdd = document.querySelector('.todo__add');

    let createElement = () => {
        let input = document.querySelector('.todo__input');
        let inputValue = input.value;
        let todoList = document.querySelector('.todo__list');
        let newLi = document.createElement('li');
        let liStructure = '<span class="todo__item-text"></span>' +
                        '<div class="todo__item-buttons">' +
                        '<button class="todo__item-button -edit">Edit</button>' +
                        '<button class="todo__item-button -remove">Remove</button>' +
                        '</div>';
        if (inputValue.trim().length !== 0) {
            newLi.innerHTML = liStructure;
            newLi.classList.add('todo__item');
            newLi.querySelector('.todo__item-text').innerHTML = inputValue;
            todoList.appendChild(newLi);
            input.value = '';
        }
    };

    btnAdd.addEventListener('click', () => {
        createElement();
    });
});
