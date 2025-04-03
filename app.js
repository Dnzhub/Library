const addButton = document.querySelector("#add-button")
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector("main");
const closeButton = document.querySelector(".closebtn");
const submit = document.querySelector("#submit-button");
const cards = document.querySelector(".cards");
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
function addBookToArr(title, author, pages, read) {
    if (myLibrary.some((book) => book.title.toLowerCase() === title.toLowerCase())) {
        alert("This book is already exists in library!");
        return;
    }


    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}




addButton.addEventListener("click", openSidebar)
closeButton.addEventListener("click", closeSidebar)
submit.addEventListener("click", submitNewBook);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("read-button")) {
        changeCardRead(e);
    }
    if (e.target.classList.contains("remove-button")) {
        const bookCard = e.target.closest('.book-card');
        const id = bookCard.querySelector('p');
        removeBookFromArray(id.innerText);
        removeBookFromUI(bookCard);
    }


})

function removeBookFromArray(id) {
    myLibrary.splice(myLibrary.findIndex(item => item.id === id), 1);
    console.log(myLibrary);
}

function removeBookFromUI(bookCard) {
    bookCard.remove();
}


//**** Book Card ****//
function showBooks() {

    myLibrary.forEach((item) => {

        createBookCard(item.title, item.author, item.pages, item.read, item.id)
    });

}

function clearBookCardDisplays() {
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
}

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
    card.appendChild(cardRemove)

}

function submitNewBook(event) {
    const title = document.querySelector("#newTitle").value;
    const author = document.querySelector("#newAuthor").value;
    const page = document.querySelector("#newPage").value;
    const read = document.querySelector("#read").value;
    if (!title || !author || page < 0 || !read) return;
    clearBookCardDisplays();
    addBookToArr(title, author, page, read);
    showBooks();
    event.preventDefault();
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
}

//******************//



//Helpers
function openSidebar() {
    sidebar.style.width = "350px";
    main.style.marginLeft = "350px";
}

function closeSidebar() {
    sidebar.style.width = "0";
    main.style.marginLeft = "0";
}


addBookToArr("title", "author", 3, "read");
showBooks();