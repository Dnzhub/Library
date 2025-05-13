class Library {
    // #libraryArr;
    // addButton;
    // sidebar;
    // main;
    // closeButton;
    // cards;
    // bookForm;
    #books = new Map();
    #elements = {};

    constructor() {
        this.#cacheDOMElements();
        this.#setupEventListeners();
    }
    // static createNewBook(title, author, pages, read, id) {
    //     return new Book(title, author, pages, read, id);
    // }
    #cacheDOMElements() {
        this.#elements = {
            addButton: document.querySelector("#add-button"),
            sidebar: document.querySelector(".sidebar"),
            main: document.querySelector("main"),
            closeButton: document.querySelector(".close-btn"),
            cardsContainer: document.querySelector(".cards"),
            bookForm: document.querySelector("#book-form"),
            formInputs: {
                title: document.querySelector("#newTitle"),
                author: document.querySelector("#newAuthor"),
                pages: document.querySelector("#newPage"),
                read: document.querySelector("#read")
            }
        };
    }
    #setupEventListeners() {
        const { addButton, closeButton, bookForm, cardsContainer } = this.#elements;

        addButton.addEventListener("click", this.#openSidebar.bind(this));
        closeButton.addEventListener("click", this.#closeSidebar.bind(this));
        bookForm.addEventListener("submit", this.#handleFormSubmit.bind(this));

        // Event delegation for dynamic elements
        cardsContainer.addEventListener("click", (e) => {
            const card = e.target.closest('.book-card');
            if (!card) return;

            const id = card.dataset.id;

            if (e.target.classList.contains("read-button")) {
                this.#toggleReadStatus(id, e.target);
            } else if (e.target.classList.contains("remove-button")) {
                this.#removeBook(id);
            }
        });
    }
    #openSidebar() {
        this.#elements.sidebar.style.width = "350px";
        this.#elements.main.style.marginLeft = "350px";
    }

    #closeSidebar() {
        this.#elements.sidebar.style.width = "0";
        this.#elements.main.style.marginLeft = "0";
    }

    #handleFormSubmit(event) {
        event.preventDefault();

        if (!this.#validateForm()) return;

        const { title, author, pages, read } = this.#elements.formInputs;
        const titleValue = title.value.trim();
        const readValue = read.value === "Read";
        if (this.#isBookExists(titleValue)) {
            alert("This book already exists in the library!");
            return;
        }

        const book = new Book(
            titleValue,
            author.value.trim(),
            parseInt(pages.value),
            readValue
        );

        this.#addBook(book);
        this.#clearForm();
    }

    #validateForm() {
        // For each element:
        // checks if the element has a validity property (!element.validity)
        // If no validity property exists (like for non-input elements), returns true (considered valid)
        // If validity exists, returns the result of checkValidity()
        return Array.from(this.#elements.bookForm.elements).every(element => {
            return !element.validity ? true : element.checkValidity();
        });
    }

    #isBookExists(title) {
        const searchTitle = title.toLowerCase();
        return Array.from(this.#books.values()).some(
            book => book.title.toLowerCase() === searchTitle
        );
    }

    #addBook(book) {
        this.#books.set(book.id, book);
        this.#renderBook(book);
    }

    #removeBook(id) {
        if (!this.#books.has(id)) return;

        this.#books.delete(id);
        document.querySelector(`[data-id="${id}"]`)?.remove();
    }

    #toggleReadStatus(id, button) {
        if (!this.#books.has(id)) return;

        const book = this.#books.get(id);
        const updatedBook = book.toggleReadStatus();
        this.#books.set(id, updatedBook);

        button.textContent = updatedBook.read ? "Read" : "Not Read";
        button.className = `read-button ${updatedBook.read ? "btn-success" : "btn-danger"}`;
    }

    #renderBook(book) {
        const card = document.createElement("div");
        card.className = "book-card";
        card.dataset.id = book.id;

        const readStatus = book.read ? "Read" : "Not Read";
        const readClass = book.read ? "btn-success" : "btn-danger";

        card.innerHTML = `
          <p class="card-id">${book.id}</p>
          <div class="book-card-textfield">${book.title}</div>
          <div class="book-card-textfield">${book.author}</div>
          <div class="book-card-textfield">${book.pages}</div>
          <div>
            <button class="read-button ${readClass}">
              ${readStatus}
            </button>
          </div>
          <button class="remove-button">×</button>
        `;

        this.#elements.cardsContainer.appendChild(card);
    }

    #clearForm() {
        this.#elements.bookForm.reset();
    }
    // bindEvents() {
    //     this.addButton.addEventListener("click", this.openSidebar.bind(this))
    //     this.closeButton.addEventListener("click", this.closeSidebar.bind(this))
    //     this.bookForm.addEventListener("submit", this.submitNewBook.bind(this));
    //     document.addEventListener("click", (e) => {
    //         //Get clicked card elements

    //         //Read - Not Read toggle 
    //         if (e.target.classList.contains("read-button")) {
    //             this.switchCardRead(e);
    //         }
    //         //Remove card
    //         if (e.target.classList.contains("remove-button")) {
    //             const bookCard = e.target.closest('.book-card');
    //             const id = bookCard.querySelector('p');
    //             this.removeBookFromData(id.innerText);
    //             this.removeBookCardFromUI(bookCard);
    //         }
    //     })

    // }
    // openSidebar() {
    //     this.sidebar.style.width = "350px";
    //     this.main.style.marginLeft = "350px";
    // }

    // closeSidebar() {
    //     this.sidebar.style.width = "0";
    //     this.main.style.marginLeft = "0";
    // }


    // addBookToData(book) {
    //     this.#libraryArr.push(book);
    // }
    // removeBookFromData(id) {
    //     this.#libraryArr.splice(this.#libraryArr.findIndex(item => item.id === id), 1);
    // }
    // removeBookCardFromUI(bookCard) {
    //     bookCard.remove();
    // }
    // isBookExistsInLibrary(title) {
    //     if (this.#libraryArr.some((book) => book.title.toLowerCase() === title.toLowerCase())) {
    //         alert("This book is already exists in library!");
    //         return true;
    //     }
    //     return false;
    // }
    // submitNewBook(event) {
    //     event.preventDefault();
    //     const title = document.querySelector("#newTitle").value;
    //     const author = document.querySelector("#newAuthor").value;
    //     const page = document.querySelector("#newPage").value;
    //     const read = document.querySelector("#read").value;
    //     const id = crypto.randomUUID();

    //     this.checkFormValidation();
    //     if (!(this.isBookExistsInLibrary(title))) {
    //         this.addBookToData(Library.createNewBook(title, author, page, read, id));
    //         this.createBookCard(title, author, page, read, id)
    //         this.clearForm();

    //     }
    // }
    // checkFormValidation() {
    //     const inputs = this.bookForm.querySelectorAll('input');

    //     // Check if all inputs are valid
    //     const allValid = Array.from(inputs).every(input => input.checkValidity());

    //     if (allValid) return true
    //     else return false;
    // }
    // clearForm() {
    //     const submitForm = document.querySelector("form");
    //     submitForm.reset();
    // }
    // switchCardRead(event) {
    //     if (event.target.innerText === "Read") {
    //         event.target.classList.remove("btn-success");
    //         event.target.classList.add("btn-danger");
    //         event.target.innerText = "Not Read"
    //     }
    //     else {
    //         event.target.classList.remove("btn-danger");
    //         event.target.classList.add("btn-success");
    //         event.target.innerText = "Read"
    //     }

    //     //Change read status on array
    //     const bookCard = event.target.closest('.book-card');
    //     const id = bookCard.querySelector('p');
    //     this.#libraryArr.forEach(item => {

    //         if (item.id === id.innerText) {
    //             item.read = event.target.innerText;
    //         }
    //     });
    // }
    // createBookCard(title, author, pages, read, id) {

    //     //Create elements
    //     const card = document.createElement("div");
    //     const cardID = document.createElement("p");
    //     const cardTitle = document.createElement("div");
    //     const cardAuthor = document.createElement("div");
    //     const cardPages = document.createElement("div");
    //     const buttonContainer = document.createElement("div");
    //     const cardRead = document.createElement("button");
    //     const cardRemove = document.createElement("button");

    //     // Set properties
    //     card.className = "book-card";
    //     cardID.className = "card-id";
    //     cardTitle.className = cardAuthor.className = cardPages.className = "book-card-textfield";
    //     cardRead.className = `read-button ${read === "Read" ? "btn-success" : "btn-danger"}`;
    //     cardRemove.className = "remove-button";

    //     // Set content
    //     cardID.textContent = id;
    //     cardTitle.textContent = title;
    //     cardAuthor.textContent = author;
    //     cardPages.textContent = pages;
    //     cardRead.textContent = read;
    //     cardRemove.textContent = "×";

    //     // Build DOM tree
    //     buttonContainer.append(cardRead);
    //     card.append(cardID, cardTitle, cardAuthor, cardPages, buttonContainer, cardRemove);
    //     this.cards.append(card);

    // }

}

class Book {
    #title;
    #author;
    #pages;
    #read;
    #id;
    constructor(title, author, pages, read, id = crypto.randomUUID()) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
        this.#id = id;
    }


    get title() { return this.#title; }
    get author() { return this.#author; }
    get pages() { return this.#pages; }
    get read() { return this.#read; }
    get id() { return this.#id; }
    toggleReadStatus() {
        return new Book(this.#title, this.#author, this.#pages, !this.#read, this.#id);
    }
}
// Initialize library when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new Library();
});

