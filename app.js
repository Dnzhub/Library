const addButton = document.querySelector("#add-button")
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector("main");
const closeButton = document.querySelector(".close-btn");
const cards = document.querySelector(".cards");
const bookForm = document.querySelector("#book-form");
const myLibrary = [];
let isFormValid = false;

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}



//------Delegates-----//
addButton.addEventListener("click", openSidebar)
closeButton.addEventListener("click", closeSidebar)
bookForm.addEventListener("submit", submitNewBook);
document.addEventListener("click", (e) => {
    //Get clicked card elements

    //Read - Not Read toggle 
    if (e.target.classList.contains("read-button")) {
        changeCardRead(e);
    }
    //Remove card
    if (e.target.classList.contains("remove-button")) {
        const bookCard = e.target.closest('.book-card');
        const id = bookCard.querySelector('p');
        removeBookFromArray(id.innerText);
        removeBookFromUI(bookCard);
    }
})


//------Add-Remove------//

function addBookToArr(title, author, pages, read, id) {
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
}


function removeBookFromArray(id) {
    myLibrary.splice(myLibrary.findIndex(item => item.id === id), 1);
}

function removeBookFromUI(bookCard) {
    bookCard.remove();
}

function submitNewBook(event) {
    event.preventDefault();
    const title = document.querySelector("#newTitle").value;
    const author = document.querySelector("#newAuthor").value;
    const page = document.querySelector("#newPage").value;
    const read = document.querySelector("#read").value;
    const id = crypto.randomUUID();

    checkBookFormValidation();
    if (!(isBookExists(title))) {
        addBookToArr(title, author, page, read, id);
        createBookCard(title, author, page, read, id)
        clearForm(title, author, page, read);

    }
}

function clearForm() {
    const submitForm = document.querySelector("form");
    submitForm.reset();
}

//**** Book Card ****//
function createBookCard(title, author, pages, read, id) {

    const card = document.createElement("div");
    card.classList.add("book-card");
    cards.appendChild(card);

    const cardID = document.createElement("p");
    cardID.classList.add("card-id");
    cardID.innerText = id;
    card.appendChild(cardID);

    const cardTitle = document.createElement("div");
    cardTitle.innerText = title;
    cardTitle.classList.add("book-card-textfield");
    card.appendChild(cardTitle);

    const cardAuthor = document.createElement("div");
    cardAuthor.innerText = author;
    cardAuthor.classList.add("book-card-textfield");
    card.appendChild(cardAuthor);

    const cardPages = document.createElement("div");
    cardPages.innerText = pages;
    cardPages.classList.add("book-card-textfield");
    card.appendChild(cardPages);

    const buttonContainer = document.createElement("div");
    card.appendChild(buttonContainer);

    const cardRead = document.createElement("button");
    cardRead.innerText = read;
    buttonContainer.appendChild(cardRead);

    if (cardRead.innerText === "Read") {

        cardRead.classList.add("btn-success");
    }
    else cardRead.classList.add("btn-danger");
    cardRead.classList.add("read-button");


    const cardRemove = document.createElement("button");
    cardRemove.innerText = "×";
    cardRemove.classList.add("remove-button");
    card.appendChild(cardRemove);

}


function changeCardRead(event) {



    if (event.target.innerText === "Read") {
        event.target.classList.remove("btn-success");
        event.target.classList.add("btn-danger");
        event.target.innerText = "Not Read"
    }
    else {
        event.target.classList.remove("btn-danger");
        event.target.classList.add("btn-success");
        event.target.innerText = "Read"
    }

    //Change read status on array
    const bookCard = event.target.closest('.book-card');
    const id = bookCard.querySelector('p');
    myLibrary.forEach(item => {

        if (item.id === id.innerText) {
            item.read = event.target.innerText;
            console.log(item);
        }
    });
}




//Helpers
function openSidebar() {
    sidebar.style.width = "350px";
    main.style.marginLeft = "350px";
}

function closeSidebar() {
    sidebar.style.width = "0";
    main.style.marginLeft = "0";
}
function isBookExists(title) {
    if (myLibrary.some((book) => book.title.toLowerCase() === title.toLowerCase())) {
        alert("This book is already exists in library!");
        return true;
    }
    return false;
}

function checkBookFormValidation() {
    const inputs = bookForm.querySelectorAll('input');

    // Check if all inputs are valid
    const allValid = Array.from(inputs).every(input => input.checkValidity());

    if (allValid) return true
    else return false;


}