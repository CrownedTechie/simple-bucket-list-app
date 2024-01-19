const addButton = document.querySelector('#add-btn');
const inputList = document.querySelector('#input-list');
const ul = document.querySelector('.bucket-lists');
const date = document.querySelector('#date');
const timeOfDay = document.querySelector('#time');


//FUNCTIONS
const displayLists = () => {
    const listFromStorage = getListsFromStorage();
   
    listFromStorage.forEach((list) => addListToDOM(list));
}

const addInputValue = () => {
    const newList = inputList.value;
    
    if (inputList.value === '') {
        alert('Please add a list')
    }
    else {
        addListToDOM(newList);

        addListsToStorage(newList);

        inputList.value = '';
    }
   
    return newList
};


const addListToDOM = (list) => {
    const li = document.createElement('li');
    li.id = 'list';
    li.className = 'list';

    const listText = createListCheck(list);
    const deleteBtn = createDeleteBtn();

    li.appendChild(listText);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
}


const createListCheck = (list) => {
    const div = document.createElement('div');
    div.className = 'list-text'

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox'
    checkBox.id = 'list-check';
    checkBox.className = 'list-check';

    checkBox.addEventListener('change', (list) => {
    checkBox.checked
        ? list.target.parentElement.style.textDecoration = 'line-through'
        : list.target.parentElement.style.textDecoration = 'none';
   });

    div.appendChild(checkBox);

    div.appendChild(document.createTextNode(list));

    return div;
};


const createDeleteBtn = () => {
    const div = document.createElement('div');
    div.id = 'delete-btn';
    div.className = 'delete-btn';

    //create Delete Image
    const deleteImg = document.createElement('img');
    deleteImg.setAttribute('src', './images/delete-2.png');
    deleteImg.className = 'delete-img'

    div.appendChild(deleteImg);

    return div;
};


const removeButtonClick = (e) => {
    e.target.parentElement.classList.contains('delete-btn')
        ? removeLists(e.target.parentElement.parentElement)
        : null
}


const removeLists = (item) => {
    confirm('Are you sure?')
        ? item.remove()
        : null

    
    removeFromStorage(item.textContent);
};
    

const removeFromStorage = (item) => {
    let listFromStorage = getListsFromStorage();

    listFromStorage = listFromStorage.filter(i => i !== item);

    localStorage.setItem('list-Item', JSON.stringify(listFromStorage));
}


//TIME ADJUSTMENTS
let d = new Date();

date.innerText = d.toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
});

timeOfDay.innerText = d.toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric'
});



//FUNCTION TO ADD ITEMS TO STORAGE
const addListsToStorage = (list) => {
    const listFromStorage = getListsFromStorage();

    listFromStorage.push(list);

    localStorage.setItem('list-Item', JSON.stringify(listFromStorage));
}


//FUCNTION TO GET ITEMS FROM THE STORAGE
const getListsFromStorage = () => {
    let listFromStorage;

    localStorage.getItem('list-Item') === null
        ? listFromStorage = []
        : listFromStorage = JSON.parse(localStorage.getItem('list-Item'));
    
    return listFromStorage
}


//EVENT LISTENERS
addButton.addEventListener('click', addInputValue);

ul.addEventListener('click', removeButtonClick);

document.addEventListener('DOMContentLoaded', displayLists)