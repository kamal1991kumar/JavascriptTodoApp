class Todos {
    constructor(root){
        this.root = this.el(root);
        this.init();
        this.liCount = 0;
    }

    el(id){
        return document.getElementById(id);
    }

    init() {
        this.root.classList.add('container');
        const elements = `
            <div class="todo">
                <h2 class="todo__heading">
                    Todos - <span class="todo__heading__count" id='todoCount'>0</span>
                </h2>
                <div class="todo__form">
                    <input type="text" class="todo__form__input" id='inputField' />
                    <button class="todo__form__btn" id='addTodo' onClick="todo.addTodo()">Add Todo</button>
                </div>
                <div class="todo__body">
                    <ul id='listing' class="todo__list"></ul>
                </div>
            </div>
        `;
        this.root.innerHTML = elements;
        this.ul = this.el('listing');
        this.inputField = this.el('inputField');
        this.todoCount = this.el('todoCount');
        this.addBtn = this.el('addTodo');
    }

    updateCount() {
        this.todoCount.innerText = this.ul.children.length;
    }

    addLi(value){
        const li = `
            <li class='todo__list__item'>
                <div class="todo__list__title" id='title${[this.liCount]}'>
                ${value}
            </div>
            <div class="todo__list__action">
                <button class="todo__list__btn" onClick="todo.edit('title${this.liCount}', '${value}')">Edit</button>
                <button class="todo__list__btn" onClick="todo.delete(this)">Delete</button>
            </div>
            </li>
        `;
        this.ul.innerHTML = this.ul.innerHTML + li;
        this.liCount++;
        this.updateCount();
    }

    addTodo() {
        const value = this.inputField.value;
        if(value.length){
            this.addLi(value);
            this.inputField.value = '';
        }
    }
    
    updateTodo(id) {
        const value = this.inputField.value;
        if(value.length){
            const li = this.el(id);
            li.innerText = value;
            this.inputField.value = '';
            this.addBtn.innerText = 'Add Todo';
            this.addBtn.setAttribute('onclick',`todo.addTodo()`);
            
        }
        this.updateCount();
    }

    edit(id, value){
        this.addBtn.innerText = 'Update Todo';
        this.addBtn.setAttribute('onclick',`todo.updateTodo('${id}')`);
        this.inputField.value = value;
        this.updateCount();
    }

    delete(e){
        e.parentElement.parentElement.remove();
        this.updateCount();
    }

};
const todo = new Todos('app');