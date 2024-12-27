// Declaring myLibrary
const myLibrary = []


function Book(title, author, page_numbers, read_or_not) {
    this.title = title;
    this.author = author;
    this.page_numbers = page_numbers;
    this.read_or_not = read_or_not;

    this.info = function() {
        return `${title} by ${author}, ${page_numbers} pages, ${read_or_not}`
    }
}

// Declaring some books to myLibrary
let book1 = new Book("Jurassic Park", "Michael Crichton", "458", false);
let book2 = new Book("1984", "George Orwell", "311", false);
let book3 = new Book("Designing Data-Intensive Applications", "Martin Kleppmann", "552", true);
let book4 = new Book("Clean Code", "Robert C Martin 'Uncle Bob'", "411", true);

function addBookToLibrary(book) {
    myLibrary.push(book)
}



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

let readBooks = 0
let unreadBooks = 0

function bookCount(book){
    if (book.read_or_not == true){
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books: ${++readBooks}`
    }
    else if (book.read_or_not == false){
        document.querySelector('.logs > :nth-child(2)').textContent = `Unread books: ${++unreadBooks}`
    }
}


function removeCount(book){
    logs.firstElementChild.textContent = `Total books: ${myLibrary.length}`
    if (book.read_or_not == true) {
        document.querySelector('.logs > :nth-child(2)').textContent = `Read Books: ${--readBooks}`
    }
    else if (book.read_or_not == false){
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${--unreadBooks}`
    }
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

function createBook(name,author,pages,read){
    let bookCard = document.createElement('div')
    bookCard.classList.add('books')
    collection.appendChild(bookCard)
    let book = new Book(name,author,pages,read)
    addBookToLibrary(book)

    let bookTitle = document.createElement('p')
    let bookAuthor = document.createElement('p')
    let bookPages = document.createElement('p')
    let read_check = document.createElement('button')
    let delete_btn = document.createElement('img')



    bookTitle.innerHTML = book.title
    bookAuthor.innerHTML = `By ${book.author}`;
    bookPages.innerHTML = `${book.pages} pages`;

    read == true ? read_check.textContent = 'Read' : read_check.textContent = 'Not read';

    if(read == true){
        read_check.textContent = 'Read'
        read_check.classList.add('read')
        bookCount(book)
    }
    else {
        read_check.textContent = 'Not read'
        read_check.classList.add('unread')
        bookCount(book)
    }


    read_check.onclick = function(){
        updateCount(book);
        book.read_or_not = !book.read_or_not;
        if (book.read_or_not) {
            read_check.textContent = 'Read';
            read_check.classList.remove('unread');
            read_check.classList.add('read');
        } else {
            read_check.textContent = 'Not read';
            read_check.classList.remove('read');
            read_check.classList.add('unread');
        }
    }

    delete_btn.src = 'https://www.svgrepo.com/show/459913/delete-alt.svg'
    delete_btn.onclick = function(){
        collection.removeChild(bookCard)
        myLibrary.splice(myLibrary.indexOf(book),1)
        removeCount(book)
    } 
                                     
    bookCard.append(bookTitle,bookAuthor,bookPages,read_check,delete_btn)
    logs.firstElementChild.textContent = `Total books : ${myLibrary.length}`
}

createBook(book1.name,book1.author,book1.page_numbers,book1.read_or_not);
createBook(book2.name,book2.author,book2.page_numbers,book2.read_or_not);
createBook(book3.name,book3.author,book3.page_numbers,book3.read_or_not);
createBook(book4.name,book4.author,book4.page_numbers,book4.read_or_not);


saveBook.onclick = function () {
    if (bookTitle.value && bookAuthor.value && bookPages.value) {
        createBook(bookTitle.value, bookAuthor.value, bookPages.value, readCheck.checked);
        overlay.classList.remove('active');
        PopWindow.classList.remove('active');
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        readCheck.checked = false;
    }
};
