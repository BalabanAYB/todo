(function () {

  function createAppTitle(title) {                     //создает заголовок с надписью
     let todoAppTitle = document.createElement('h2');
     todoAppTitle.innerHTML = title;
     return todoAppTitle;
  }
  var val = '';
  var input = document.createElement('input');
  var button = document.createElement('button');
  function createTodoItemForm() {                               //создает форму
     let form = document.createElement('form');
     let buttonWrapper = document.createElement('div');

     form.classList.add('input-group', 'mb-3');
     input.classList.add('form-control');
     input.placeholder = 'Введите название нового дела';
     buttonWrapper.classList.add('input-group-append');
     button.classList.add('btn', 'btn-primary');
     button.textContent = 'Добавить дело';


     buttonWrapper.append(button);
     form.append(input);
     form.append(buttonWrapper);

     button.disabled = 'disabled';

     input.addEventListener('input', function () {
        if (input.value !== val) {
           button.disabled = '';
        }
        else {
           button.disabled = 'disabled';
        }
     });


     return {
        form,
        input,
        button,
     };

  }

  function createTodoList() {                    //создает ul с классом list-group
     let list = document.createElement('ul');
     list.classList.add('list-group');
     return list;
  }

  function createTodoItem(name) {                  //создает li с текстом внутри
     let item = document.createElement('li');

     let buttonGroup = document.createElement('div');
     let doneButton = document.createElement('button');
     let deleteButton = document.createElement('button');

     item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
     item.textContent = name;

     buttonGroup.classList.add('btn-group', 'btn-group-sm');
     doneButton.classList.add('btn', 'btn-success');
     doneButton.textContent = 'Готово';
     deleteButton.classList.add('btn', 'btn-danger');
     deleteButton.textContent = 'Удалить';

     buttonGroup.append(doneButton);
     buttonGroup.append(deleteButton);
     item.append(buttonGroup);

     return {
        item,
        doneButton,
        deleteButton,
     };
  }
  let todoList = createTodoList();
  function createListItem(save, session) {
     console.log('loko')
     console.log(save.length)
        for (let j = 0; j < save.length; j++) {
           let todoItem = createTodoItem(save[j].name);
           todoItem.doneButton.addEventListener('click', function () {
              todoItem.item.classList.toggle('list-group-item-success');
              localStorage.setItem(session, JSON.stringify(save));
              if(save[j].done){
                 save[j].done = false;
                 console.log('no')
              }
              else{
                 save[j].done = true;
                 console.log('yes');
              }
              localStorage.setItem(session, JSON.stringify(save));
              var restoredsave = JSON.parse(localStorage.getItem(session));
           });
           todoItem.deleteButton.addEventListener('click', function () {
              if (confirm('Вы уверены?')) {
                 todoItem.item.remove();
                 save.splice(j, 1);
                 console.log(save);
                 localStorage.setItem(session, JSON.stringify(save));
                 var restoredsave = JSON.parse(localStorage.getItem(session));
              }
           });
           todoList.append(todoItem.item);
    };
     return todoList;
  };
  function containsClass(save) {
     let item = document.querySelectorAll('li');
     if(save !== null){
     for (let i = 0; i < save.length; i++) {
       if (item[i]){
        if (!save[i].done) {
           item[i].classList.remove('list-group-item-success');
        }
        else {
           item[i].classList.add('list-group-item-success');
        };
      };
     };
     };
  };
  function createTodoApp(container, title = 'Список дел', save, session) {

    if (!localStorage.length) {
      localStorage.setItem(session, JSON.stringify(save));
   }
   var restoredsave = JSON.parse(localStorage.getItem(session));
   if(!restoredsave){
     save = [];
     localStorage.setItem(session, JSON.stringify(save));
   }
   else{
    save = restoredsave;
    localStorage.setItem(session, JSON.stringify(save));
   }
   var restoredsave = JSON.parse(localStorage.getItem(session));
     let todoTitle = createAppTitle(title);
     let todoItemForm = createTodoItemForm();
     let submit = false;
     container.append(todoTitle);
     container.append(todoItemForm.form);
     container.append(todoList);
    // containsClass(save);
     createListItem(save, session);
     containsClass(save);

     todoItemForm.form.addEventListener('submit', function (e) {
        e.preventDefault();
        submit = true;
        if (!todoItemForm.input.value) {
           return;
        }
        let todoItem = todoItemForm.input.value;
        console.log(todoItem)
        if (save !== null){
        save.push({ name: todoItem, done: false });

        let saveItem = createTodoItem(save[save.length - 1].name);
        if (save[save.length - 1].done) {
           saveItem.item.classList.add('list-group-item-success');
        }
        else {
           saveItem.item.classList.remove('list-group-item-success');
        }



           let item = document.querySelectorAll('li');
           saveItem.doneButton.addEventListener('click', function () {
              saveItem.item.classList.toggle('list-group-item-success');
              localStorage.setItem(session, JSON.stringify(save));
              if(save[save.length - 1].done){
                 save[save.length - 1].done = false;
                 console.log('no')
              }
              else{
                 save[save.length - 1].done = true;
                 console.log('yes');
              }
              localStorage.setItem(session, JSON.stringify(save));
              var restoredsave = JSON.parse(localStorage.getItem(session));
           });
           saveItem.deleteButton.addEventListener('click', function () {
              if (confirm('Вы уверены?')) {
                 saveItem.item.remove();
                 save.splice(save.length - 1, 1);
                 console.log(save);
              }
           });

        todoList.append(saveItem.item);
        todoItemForm.input.value = '';
        localStorage.setItem(session, JSON.stringify(save));
        }
        return {
           save,
           submit,
        }
     });
  };
  window.createTodoApp = createTodoApp;
})();

