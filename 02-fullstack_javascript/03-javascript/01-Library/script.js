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
}

function updateLogs() {
    logs.firstElementChild.textContent = `Total books: ${myLibrary.length}`;
    document.querySelector('.logs > :nth-child(2)').textContent = `Read books: ${readBooks}`;
    document.querySelector('.logs > :last-child').textContent = `Unread books: ${unreadBooks}`;
}


function bookCount(book){
    if (book.read_or_not == true){
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books: ${++readBooks}`
    }
    else if (book.read_or_not == false){
        document.querySelector('.logs > :nth-child(2)').textContent = `Unread books: ${++unreadBooks}`
    }
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

function updateCount(book){
    if(book.read_or_not == true && readBooks != 0){
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books : ${--readBooks}`
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${++unreadBooks}`
    }
    else if(book.read_or_not == false && unreadBooks != 0){
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${--unreadBooks}`
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books : ${++readBooks}`
    }
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

    read_check.onclick = function(){
        book.read_or_not = !book.read_or_not; 
        updateCount(book);
        read_check.textContent = book.read_or_not ? 'Read' : 'Not Read';
        read_check.classList.toggle('read');
        read_check.classList.toggle('unread');
    }

    delete_btn.src = 'https://www.svgrepo.com/show/459913/delete-alt.svg'
    delete_btn.onclick = function(){
        collection.removeChild(bookCard)
        myLibrary.splice(myLibrary.indexOf(book),1)
        removeCount(book)
    } 

    bookCard.append(bookTitle, bookAuthor, bookPages, read_check, delete_btn);
}


createBook(book1.title, book1.author, book1.page_numbers, book1.read_or_not);
createBook(book2.title, book2.author, book2.page_numbers, book2.read_or_not);
createBook(book3.title, book3.author, book3.page_numbers, book3.read_or_not);
createBook(book4.title, book4.author, book4.page_numbers, book4.read_or_not);


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