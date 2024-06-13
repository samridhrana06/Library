const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'Read' ? 'Not Read' : 'Read';
};

// Prototype method to delete book from library
Book.prototype.deleteBook = function(index) {
    myLibrary.splice(index, 1);
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks(); // Call displayBooks after adding a new book
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear previous content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;

        const bookRead = document.createElement('p');
        bookRead.textContent = `Read: ${book.read}`;

        // Toggle read status button
        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read';
        toggleReadBtn.classList.add('toggle-read-btn');
        toggleReadBtn.setAttribute('data-index', index); // Set data-index attribute for identifying book index

        // Add click event listener to toggle read status button
        toggleReadBtn.addEventListener('click', () => {
            toggleReadStatus(index);
        });

        // Delete book button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data-index', index); // Set data-index attribute for identifying book index

        // Add click event listener to delete button
        deleteBtn.addEventListener('click', () => {
            deleteBook(index);
        });

        // Append book details, toggle button, delete button to book card
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(toggleReadBtn);
        bookCard.appendChild(deleteBtn);

        libraryDiv.appendChild(bookCard); // Append book card to library container
    });
}

// Function to toggle read status of a book
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus(); // Toggle read status using Book prototype method
    displayBooks(); // Update the display after toggling read status
}

// Function to delete a book from the library
function deleteBook(index) {
    myLibrary[index].deleteBook(index); // Delete book using Book prototype method
    displayBooks(); // Update the display after deleting the book
}

// Sample books for initial display
myLibrary.push(new Book("Book One", "Author One", 300, "Read"));
myLibrary.push(new Book("Book Two", "Author Two", 150, "Not Read"));
myLibrary.push(new Book("Book Three", "Author Three", 200, "Read"));
myLibrary.push(new Book("Book Four", "Author Four", 500, "Not Read"));
displayBooks(); // Display initial set of books

// Event listener for the "NEW BOOK" button
const newBookButton = document.getElementById('new-book-btn');
newBookButton.addEventListener('click', () => {
    createBookForm();
});

function createBookForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''; // Clear any existing form

    const form = document.createElement('form');
    form.id = 'book-form';

    // Title input
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.required = true;
    form.appendChild(titleInput);
    form.appendChild(document.createElement('br'));

    // Author input
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author: ';
    form.appendChild(authorLabel);

    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'author';
    authorInput.required = true;
    form.appendChild(authorInput);
    form.appendChild(document.createElement('br'));

    // Pages input
    const pagesLabel = document.createElement('label');
    pagesLabel.textContent = 'Pages: ';
    form.appendChild(pagesLabel);

    const pagesInput = document.createElement('input');
    pagesInput.type = 'number';
    pagesInput.id = 'pages';
    pagesInput.required = true;
    form.appendChild(pagesInput);
    form.appendChild(document.createElement('br'));

    // Read input
    const readLabel = document.createElement('label');
    readLabel.textContent = 'Read: ';
    form.appendChild(readLabel);

    const readInput = document.createElement('input');
    readInput.type = 'text';
    readInput.id = 'read';
    readInput.required = true;
    form.appendChild(readInput);
    form.appendChild(document.createElement('br'));

    // Submit Button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Add Book';
    form.appendChild(submitBtn);

    formContainer.appendChild(form);

    // Form submission handler
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').value;

        addBookToLibrary(title, author, pages, read);

        // Clear and hide the form
        formContainer.innerHTML = '';
    });
}
