//tüm elementleri seçme

const form = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


function eventListeners() {// tüm event listenerlar
    form.addEventListener = ("submit", addTodo); // todoları göndermek için event
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI); // todoları sayfa yüklendiğinde geri almak için event
    secondCardBody.addEventListener("click", deleteTodo);// 2. card kısmına deletetodo özelliğini capturing ile ekliyoruz
    filter.addEventListener("keydown", "filterTodos");
    clearButton.addEventListener("click", "clearAllTodos");

}

function loadAllTodosToUI(){
    let todos = getTodoFromStorage();// storage daki todoları alır
    todos.forEach(function (todo) {// bu todoların herbirini gezdi
        addTodoToUI(todo);// bu todoların herbirini arayüze ekledi
    })
}


function addTodo(e) {


    const newTodo = todoInput.value.trim();// string ifadenin baş ve sonundaki boşlukları silerek newTodo isminde ekler
    if (newTodo === "") {
            /** <div class="alert alert-info" role="alert">
                       Lütfen bir todo  <a href="#" class="alert-link">giriniz</a>
                    </div> */
        showAlert("danger","lütfen bir todo giriniz..");
    }
    else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success","todo eklendi..")
    }

    console.log(newTodo);

      e.preventDefault();
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    console.log(alert);

    firstCardBody.appendChild(alert);

    //setTimeout sayesinde alert bir süre sonra kaybolacak

    window.setTimeout(function () {
        alert.remove();
    }, 3000);
        
    }


function addTodoToUI(newTodo) {// aldığı string değerini list item olarak UI'ya ekleyecek

    //list item oluşturma
    const listItem = document.createElement("li");
    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class= 'fa-remove'></i>";

    listItem.className ="list-group-item d-flex justify-content-between";
    
    // list Item a text node ekleme, onu ve linki list ıtema child olarak ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // todo List e list Item ı child olarak ekleme

    todoList.appendChild(listItem);

    // Listeye eklendikten sonra input alanını boş bırakma

    todoInput.value = "";

    
}
function addTodoStorage(newTodo){
    let todos = getTodoFromStorage();// todolar alındı
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));// localeStroge.setItem("key","value"); şeklinde çalışır
}                                                       // JSON.Stringyfy() metodu arrayi stringe çevirir
                                                        // yeni todo eklendikten sonra Local Storage'a gönderildi yani Local Storage güncellendi
function getTodoFromStorage(newTodo) { // Storagedan tüm todoları al
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));// JSON.parse() içindeki ifadeyi arraye çevirir
    }

    return todos;
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {// tıkladığımız yer silme simgesi mi?
        console.log("silme işlemi");// consol kısmına yazdırır
        e.target.parentElment.parentElment.remove();// tıklanan yerin parentı= href, onun da parentı=list item. list itemı UI dan kaldıracak
        showAlert("success", "todo başarıyla silindi..");
        deleteTodoFromStorage(e.target.parentElment.parentElment.textContent());// list item ın text yazısını fonksiyona gönder
    }

}

function deleteTodoFromStorage(todo) {
    let todos = getTodoFromStorage();
    todos.forEach(function (todo) {
        if (todo === deleteTodo) {
            todos.splice(index,1); // indexten itibaren 1 elemanı siler
        }
        localStorage.setItem("todos", JSON.stringify(todos));// dizi olan todos'u stringe çevirip Local Storage a gönderdi
    })
}

function filterTodos(e) { // todoları girilen harfe göre arama/filtreleme
    const filterValue = e.target.value.toLowerCase();// harf uyumu olması için todoları küçük harf yaptık
    const listItems = document.querySelectorAll(".list-group-item");// liste elemanlarını seçtik
    listItems.forEach(function (listItem) {// liste elemanları içinde arama yaptık
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {// aranan harf liste elemanında yoksa display none özelliği verdik
            listItem.setAttribute("style", "display: none !important");
        }
        else {
            listItem.setAttribute("style", "display: block !important");// aranan harf mevcutsa display block özelliği verdik
        }
        
    })
    console.log(e.target.value);
}

function clearAllTodos(e) {
    if (confirm("Tümünü silmek isteiğinizden emin misiniz?")) {
        // arayüzden todoları temizleme
       //  todoList.innerHTML = ""; // yavaş yöntem
       
        while (todoList.firstElementChild != null) { // değeri null olana kadar ilk çocuğu sil
            todoList.removeChild(todoList.firstElementChild);
    
        }
        localStorage.removeItem("todos");// local Storage dan sil
    }

}