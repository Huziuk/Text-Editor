'use strict';

// ! Доступ до форм
const FORM_BTN = document.forms.formBtn;
const FORM_RADIO = document.forms.radioForm;
const FORM_FONT_FAMILY = document.forms.fontFamilyForm;
const COLORS_FORM = document.forms.colorsForm;
const STYLE_TEXT_FORM = document.forms.styleTextForm;

// ! Доступ до кнопок
const EDIT_BTN = document.querySelector('.edit-btn');
const STYLE_BTN = document.querySelector('.style-btn');
const SAVE_BTN = document.querySelector('.save-btn');
const ADD_BTN = document.querySelector('.add-btn');
const CREATE_TABLE = document.querySelector('.create-table-btn')

// ! Доступ до блоків
const TEXT_BLOCK = document.querySelector('.text-block');
const EDIT_BLOCK = document.querySelector('.edit-block');
const STYLE_BLOCK = document.querySelector('.style-block')
const EDIT_TEXTAREA = document.querySelector('.edit-textarea');
const PALETTE_FONT = document.querySelector('.palette-font');
const PALETTE_BACK = document.querySelector('.palette-back');
const ADD_BLOCK = document.querySelector('.back_modal')

// ! Доступ до елементів 
let colors = document.querySelectorAll('.color');
let colorsBack = document.querySelectorAll('.color-back');
let colorName = ['#DA433F', '#0076FB', '#1F9642', '#30383C', '#F5B600', '#E95085', ' #FFFFFF', ':#704FC4', '#0A97BB',]

// ! Доступ до елементів блоку ADD
const CHOOSE_ADD = document.forms.chooseAddElem;
const ADD_TABLE_FORM = document.forms.addTable;
const ADD_LIST_FORM = document.forms.createList;
const ADD_ELEM_BLOCK = document.querySelector('.add-element-block');
let borderType = ADD_TABLE_FORM.borderType;
let borderColor = ADD_TABLE_FORM.borderColor;
let marksType = ADD_LIST_FORM.marksType;

// ! Функції

const createTable = function(){ // ? Функція для створення таблиці
    let table = document.createElement('table');
    for (let index = 0; index < ADD_TABLE_FORM.countTR.value; index++) {
        let tr = document.createElement('tr');
        let type;
        let color;
        for (let index = 0; index < borderType.length; index++) {
            if (borderType.options[index].selected) {
                type = borderType.options[index].value
            }
        }
        for (let index = 0; index < borderColor.length; index++) {
            if (borderColor.options[index].selected) {
                color = borderColor.options[index].value
            }
        }
        for (let index = 0; index < ADD_TABLE_FORM.countTD.value; index++) {
            let td = document.createElement('td')
            td.style.cssText = `width: ${ADD_TABLE_FORM.widthTD.value}px; height: ${ADD_TABLE_FORM.heightTD.value}px;
            border: ${ADD_TABLE_FORM.borderWidth.value}px ${type} ${color}`;
            td.textContent = 'TD'
            tr.appendChild(td)
        }
        //table.setAttribute('cellspacing', '0')
        table.appendChild(tr)
    }
    return table
}

const createList = function () { // ? Функція для створення списку
    let list = document.createElement('ul')
    let mark;
    for (let index = 0; index < marksType.length; index++) {
        if (marksType.options[index].selected) {
            mark = marksType.options[index].value
        }
    }
    for (let index = 0; index < ADD_LIST_FORM.countLi.value; index++) {
        let li = document.createElement('li')
        li.textContent = `Item ${index + 1}`
        list.appendChild(li)
    }
    list.setAttribute('type', mark)
    return list;
}

// ! Події

EDIT_BTN.addEventListener('click', function(){  // ? Подія для кнопки Edit
    EDIT_BLOCK.classList.toggle('display__block');
    STYLE_BLOCK.classList.remove('display__block');
    EDIT_TEXTAREA.textContent = TEXT_BLOCK.innerHTML;
})

STYLE_BTN.addEventListener('click', function(){ // ? Подія для кнопки Style
    STYLE_BLOCK.classList.toggle('display__block');
    EDIT_BLOCK.classList.remove('display__block');
})

// ! Події для блоку Edit

SAVE_BTN.addEventListener('click', function () { // ? Подія для кнопки Save
    TEXT_BLOCK.innerHTML = EDIT_TEXTAREA.value;
    EDIT_BLOCK.classList.remove('display__block')
})

ADD_BTN.addEventListener('click', function () { // ? Подія для кнопки Add
    ADD_BLOCK.classList.add('display__block')
})

// ! Події для блоку Style

FORM_RADIO.addEventListener('click', function (event) {  // ? Вибір шрифту
    if (event.target.name === 'pixel') {
        TEXT_BLOCK.style.fontSize = event.target.value
    }
});

FORM_FONT_FAMILY.addEventListener('change', function (event) { // ? Подія для кнопки Style
    if (event.target.name === 'fontFamiliSelect'){
        for (let index = 0; index < event.target.length; index++) {
            if (event.target[index].selected){
                TEXT_BLOCK.style.fontFamily = event.target[index].textContent;
            }
        }
    }
});

COLORS_FORM.addEventListener('click', function(event){  // ? Події для кнопок Color і Background
    if (event.target.value === 'Text'){
        PALETTE_BACK.classList.remove('display__flex')
        PALETTE_FONT.classList.toggle('display__flex')
    }
    if (event.target.value === 'Background') {
        PALETTE_FONT.classList.remove('display__flex')
        PALETTE_BACK.classList.toggle('display__flex')
    }
})


for (let index = 0; index < colors.length; index++) {  // ? Вибір кольору тексту
    colors[index].addEventListener('click', function (event) {
        TEXT_BLOCK.style.cssText += `color: ${colorName[index]}`;
        PALETTE_FONT.classList.remove('display__flex')
    })
}

for (let index = 0; index < colorsBack.length; index++) {  // ? Вибір кольору фону
    colorsBack[index].addEventListener('click', function (event) {
        TEXT_BLOCK.style.cssText += `background-color: ${colorName[index]}`;
        PALETTE_BACK.classList.remove('display__flex')
    })
}

STYLE_TEXT_FORM.addEventListener('click', function(event){  // ? Жирність і Курсив шрифту
    if(event.target.name === 'bold'){
        event.target.checked ? TEXT_BLOCK.style.fontWeight = event.target.name : TEXT_BLOCK.style.fontWeight = '';
    }
    if (event.target.name === 'italic') {
        event.target.checked ? TEXT_BLOCK.style.fontStyle = event.target.name : TEXT_BLOCK.style.fontStyle = '';
    }
})

// ! Події для блоку ADD

CHOOSE_ADD.addEventListener('click', function(event){  // ? Вибір  між List і Table
    if (event.target.value === 'table' && event.target.checked){
        ADD_TABLE_FORM.classList.remove('display__none')
    } else { ADD_TABLE_FORM.classList.add('display__none')}
    if (event.target.value === 'list' && event.target.checked) {
        ADD_LIST_FORM.classList.add('display__block')
        ADD_ELEM_BLOCK.style.height = '250px'
    } else { 
        ADD_LIST_FORM.classList.remove('display__block') ;
        ADD_ELEM_BLOCK.style.height = '';
    }
})


ADD_TABLE_FORM.addEventListener('submit', function(event){  // ? Create Table Button
    event.preventDefault();
    let table = createTable();
    EDIT_TEXTAREA.value += table.outerHTML;
    ADD_TABLE_FORM.countTR.value = '';
    ADD_TABLE_FORM.countTD.value = '';
    ADD_TABLE_FORM.widthTD.value = '';
    ADD_TABLE_FORM.heightTD.value = '';
    ADD_TABLE_FORM.borderWidth.value = '';
    borderType.options[0].selected = true;
    borderColor.options[0].selected = true;
    ADD_BLOCK.classList.remove('display__block');
})

ADD_LIST_FORM.addEventListener('submit', function (event) {  // ? Create List Button
    event.preventDefault();
    let list = createList();
    EDIT_TEXTAREA.value += list.outerHTML;
    ADD_LIST_FORM.countLi.value = '';
    marksType.options[0].selected = true;
    ADD_BLOCK.classList.remove('display__block');
})
