// Declaring myLibrary
const myLibrary = []


function Book(title, author, page_numbers, read_or_not) {
    this.title = title;
    this.author = author;
    this.page_numbers = parseInt(page_numbers);
    this.read_or_not = read_or_not;

    this.info = function() {
        return `${title} by ${author}, ${page_numbers} pages, ${read_or_not}`
    }
}

// Declaring some books to myLibrary
const book1 = new Book("Jurassic Park", "Michael Crichton", "458", false);
const book2 = new Book("1984", "George Orwell", "311", false);
const book3 = new Book("Designing Data-Intensive Applications", "Martin Kleppmann", "552", true);
const book4 = new Book("Clean Code", "Robert C Martin 'Uncle Bob'", "411", true);

// Dom Element modifications
let openForm = document.getElementById('openForm')
let closeButton = document.getElementById('closeButton')
let overlay = document.getElementById('overlay')
let PopWindow = document.querySelector('.popup_form')
let saveBook = document.getElementById('saveBook')
let collection = document.querySelector('.collection')

let bookTitle = document.getElementById('title')
let bookAuthor = document.getElementById('author')
let bookPages = document.getElementById('page_numbers')
let readCheck = document.getElementById('read_or_not')
let logs = document.querySelector('.logs')


openForm.onclick = function(){
    overlay.classList.add('active')
    PopWindow.classList.add('active')
}

closeButton.onclick = function(){
    overlay.classList.remove('active')
    PopWindow.classList.remove('active')
}

let readBooks = 0;
let unreadBooks = 0;

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateBookCount(book, true);
    createBook(book.title, book.author, book.page_numbers, book.read_or_not);
    updateLogs();
}

function updateLogs() {
    const logElements = document.querySelectorAll('.logs p');
    logElements[0].textContent = `Total books: ${myLibrary.length}`;
    logElements[1].textContent = `Read books: ${readBooks}`;
    logElements[2].textContent = `Unread books: ${unreadBooks}`;
}


function removeCount(book) {
    if (book.read_or_not) {
        readBooks--;
    } else {
        unreadBooks--;
    }
    updateLogs();
}

function updateBookCount(book, isAdding) {
    if (isAdding) {
        if (book.read_or_not) {
            readBooks++;
        } else {
            unreadBooks++;
        }
    } else {
        if (book.read_or_not) {
            readBooks--;
        } else {
            unreadBooks--;
        }
    }
    updateLogs();
}

function updateCount(book) {
    // Update the counts only if the book status is actually changing
    if (book.read_or_not === true) {
        if (unreadBooks > 0) {
            unreadBooks--;
            readBooks++;
        }
    } else {
        if (readBooks > 0) {
            readBooks--;
            unreadBooks++;
        }
    }
    updateLogs();
}

function createBook(name, author, pages, read) {
    let pageCount = parseInt(pages);

    // Check if page count is valid (positive number)
    if (pageCount <= 0) {
        alert("The page count must be a positive number.");
        return;
    }

    let book = new Book(name, author, pages, read);
    let bookCard = document.createElement('div');
    bookCard.classList.add('books');
    collection.appendChild(bookCard);

    let bookTitle = document.createElement('p')
    let bookAuthor = document.createElement('p')
    let bookPages = document.createElement('p')
    let read_check = document.createElement('button')
    let delete_btn = document.createElement('img')

    bookTitle.textContent = book.title
    bookAuthor.textContent = `By ${book.author}`;
    bookPages.textContent = `${book.page_numbers} pages`;

    read_check.textContent = book.read_or_not ? 'Read' : 'Not Read';
    read_check.classList.add(book.read_or_not ? 'read' : 'unread');


    read_check.onclick = function() {
        // Only update count if the status is toggling from read to unread or vice versa
        let previousStatus = book.read_or_not;
        book.read_or_not = !book.read_or_not;
    
        if (previousStatus !== book.read_or_not) {
            updateCount(book);  // Update count only if status changed
            read_check.textContent = book.read_or_not ? 'Read' : 'Not Read';
            read_check.classList.toggle('read');
            read_check.classList.toggle('unread');
        }
    }

    delete_btn.src = 'https://www.svgrepo.com/show/459913/delete-alt.svg'
    delete_btn.onclick = function(){
        collection.removeChild(bookCard);
        myLibrary.splice(myLibrary.indexOf(book),1);
        removeCount(book);
        updateLogs();
    } 

    bookCard.append(bookTitle, bookAuthor, bookPages, read_check, delete_btn);
}


// Create an array of books as placeholders and loop through the creation
const books = [
    new Book("Jurassic Park", "Michael Crichton", "458", false),
    new Book("1984", "George Orwell", "311", false),
    new Book("Designing Data-Intensive Applications", "Martin Kleppmann", "552", true),
    new Book("Clean Code", "Robert C Martin 'Uncle Bob'", "411", true)
];

books.forEach(book => {
    createBook(book.title, book.author, book.page_numbers, book.read_or_not);
    updateBookCount(book, true);
});

// Add books to myLibrary and update logs
myLibrary.push(...books);
updateLogs();


saveBook.onclick = function () {
    console.log('Save button clicked');
    let pageCount = parseInt(bookPages.value);


    if (bookTitle.value && bookAuthor.value && bookPages.value) {
        if (pageCount <= 0) {
            alert("The page count must be a positive number.");
            return; // Exit function if page count is invalid
        }

        let newBook = new Book(bookTitle.value, bookAuthor.value, pageCount, readCheck.checked);
        addBookToLibrary(newBook);

        // Close and reset the form input fields
        overlay.classList.remove('active');
        PopWindow.classList.remove('active');
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        readCheck.checked = false;
        updateLogs();
    }
}