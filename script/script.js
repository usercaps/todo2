let dataInput = document.querySelector("#taskInput"),
    searchInput = document.querySelector('#search'),
    ulSpisok = document.getElementById("list"),
    spans = document.getElementsByClassName("delete-button"),
    favSpan = document.getElementsByClassName('favoriteBtn'),
    saveBtn = document.getElementById("save"),
    clearBtn = document.getElementById("clear"),
    closeBtn = document.getElementById("close-modal"),
    complete = document.querySelector('.completeSpan'),
    favorite = document.querySelector('.favoriteSpan'),
    allBtn = document.querySelector('#all'),
    complBtn = document.querySelector('#complete'),
    favoriteBtn = document.querySelector('#favorite');

complete.innerHTML = '0';
favorite.innerHTML = '0';

let favArr = [],
    complArr = [];




function favorTodo() {
    for (let i of favSpan) {
        i.addEventListener('click', function () {
            let d = i.parentNode;
            li = d.parentNode;
            if (d.parentNode.style.color == 'yellow') {
                // почему-то если ставить не ЖЕЛТЫЙ то начинается баг 
                // если одну задачу то в счетчик 0
                // если 2 задачи и наживать на первую то добавляется 2 если во вторую то 1
                // если 3 =3 2 1 и тд
                d.parentNode.style.color = 'black';
                favArr.pop(i);
                favorite.innerHTML = favArr.length;
                li.classList.remove('fav');
            } else {
                d.parentNode.style.color = 'yellow';
                favArr.push(i);
                favorite.innerHTML = favArr.length;
                li.classList.add('fav');
            }
        })
    }
}

function deleteTodo() {
    for (let span of spans) {
        span.addEventListener("click", function () {
            let d = span.parentNode;
            li = d.parentNode;

            li.remove();
            event.preventDefault();
        })
    }
};

function loadTodo() {
    if (localStorage.getItem("todoApplication")) {
        ulSpisok.innerHTML = localStorage.getItem("todoApplication");
        deleteTodo();
    }
};

function toComplete() {
    document.getElementById('list').addEventListener('click', function (e) {

        if (e.target.tagName === 'P') {
            e.target.classList.toggle('line');
            e.target.parentNode.classList.toggle('compl');
        }
    })
}

function completeCounter() {
    for (let li of document.getElementsByClassName('compl')) {
        if (li.className === 'compl') {
            complArr.push(li);
            complete.innerHTML = complArr.length;
        } else {
            complArr.pop(li);
            complete.innerHTML = complArr.length;
        }
    }
}



// addEventListener - обработчик события с последующим вызовом функции

searchInput.addEventListener('keyup', function () {
    let filter = searchInput.value.toLowerCase(),
        filterEl = document.querySelectorAll('#list li');

    filterEl.forEach(item => {
        if (item.innerHTML.toLowerCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
})

dataInput.addEventListener("keypress", function (keyPressed) {
    if (keyPressed.which === 13) {
        let newLi = document.createElement("li");
        let div = document.createElement('div');
        let newSpan = document.createElement("span");
        let newTask = document.createElement('p');
        let fBtn = document.createElement('span');

        fBtn.classList.add('favoriteBtn');
        fBtn.innerHTML = '&#9733;';
        newSpan.innerHTML = "&#10006;";
        newSpan.classList.add("delete-button");

        let newTodo = this.value; // текущее значение input


        if (this.value.trim() !== "") {
            newTask.append(newTodo);
            div.append(newSpan, fBtn);
            ulSpisok.appendChild(newLi).append(newTask, div);

        }

        this.value = ""; // очищаем поле ввода
        deleteTodo();
        toComplete();
        favorTodo();
        completeCounter();
        
    }
});

saveBtn.addEventListener("click", function () {
    localStorage.setItem("todoApplication", ulSpisok.innerHTML)
});

clearBtn.addEventListener("click", function () {
    ulSpisok.innerHTML = "";
    localStorage.setItem("todoApplication", ulSpisok.innerHTML);
});

favoriteBtn.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for (let i of allLi) {
        if (i.className !== 'fav') {
            i.style.display = 'none';
        }
    }
});

allBtn.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for (let i of allLi) {
        i.style.display = 'flex';
    }
});

complBtn.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for (let i of allLi) {
        if (i.className !== 'compl') {
            i.style.display = 'none';
        }
    }
});

deleteTodo();
loadTodo();
toComplete();
favorTodo();
completeCounter();