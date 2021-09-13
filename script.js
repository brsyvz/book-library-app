(function() {

const addBook = document.querySelector("#form");
const library = document.querySelector(".wrapper");
const searchBook = document.querySelector("#search");
const closeForm = document.querySelector("#closeForm-Btn");
const newBookForm = document.querySelector("#newBook-Btn");

addBook.addEventListener("submit", createBook);
library.addEventListener("click", removeBook);
searchBook.addEventListener("keyup", searchForBook);
newBookForm.addEventListener("click", toggleNewBookForm);
closeForm.addEventListener("click", closeNewBookForm);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

(function storeBooks() {
  const books = Ls_getBooks();
  books.forEach((book) => renderBook(book));
})();


function createBook(e) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
 
  let readStatus = read;
  if(readStatus === true) {
    readStatus = "&#9989;";
  }
  else {
    readStatus = "&#10060;";
  }
  const book = new Book(title, author, pages, readStatus);
  e.preventDefault();
  if (title === "" || author === "" || pages === "") {
    showStatusMessage("noBlank");
  } else {
    renderBook(book);
    Ls_setBooks(book);
    clearFormFields();
    showStatusMessage("add");
    closeNewBookForm();
  }
}


function renderBook(book) {
  const list = document.querySelector(".wrapper");
  const containerBox = document.createElement("div");
  containerBox.className = "bookContainer";
  const row = document.createElement("ol");
  const delButton = document.createElement("button");
  delButton.className = "remove-Btn";
  delButton.textContent = "Remove";
  row.innerHTML = `
  <li>${book.title}<li>
  <li>Author: ${book.author}</li>
  <li>Pages: ${book.pages}</li>
  <li>Read: ${book.read}</li>
  `;
  list.appendChild(containerBox);
  containerBox.appendChild(row); 
  row.appendChild(delButton);
  row.firstElementChild.style.cssText = "text-align:center; margin-top:15px; margin-bottom:15px";
}



function removeBook(e) {
    if (e.target.className == "remove-Btn") {
      e.target.parentElement.parentElement.remove();
    } else {
      return;
    }
    Ls_removeBook(e.target.parentElement.firstElementChild.textContent);
    showStatusMessage("remove");
  }
  
function searchForBook(e) {
  let text = e.target.value.toLowerCase();
  let liItems = document.querySelectorAll(".bookContainer>ol");
  Array.from(liItems).forEach((el) => {
    const title = el.firstElementChild.textContent;
    if (title.toLowerCase().includes(text)) {

        showStatusMessage("bookFound")
      el.parentElement.style.display = "block";
     
    } else {
     showStatusMessage("notFound");
      el.parentElement.style.display = "none";
    }
  });
}

function clearFormFields() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
}

function toggleNewBookForm() {
  form.classList.remove("animate__backOutUp");
  form.classList.add("animate__backInDown");
  form.style.display = "block";
}

function closeNewBookForm() {
  form.classList.remove("animate__backInDown");
  form.classList.add("animate__backOutUp");
  setTimeout(() => {
    form.style.display = "none";
  }, 500);
}

function showStatusMessage(status) {
  const statusText = document.querySelector("#statusText");
  if (status === "add") {
    statusText.style.display = "block";
    statusText.textContent = "Book added";
    statusText.style.background = "#198754";
    setTimeout(() => (statusText.style.display = "none"), 3500);
  } else if (status === "remove") {
    statusText.style.display = "block";
    statusText.textContent = "Book removed";
    statusText.style.background = "#DC3545";
    setTimeout(() => (statusText.style.display = "none"), 3500);
  } else if (status === "noBlank") {
    statusText.style.display = "block";
    statusText.textContent = "No blank fields";
    statusText.style.background = "#DC3545";
    setTimeout(() => (statusText.style.display = "none"), 3500);
  }
  else if (status === "bookFound") {
    statusText.style.display = "block";
    statusText.textContent = "Book found";
    statusText.style.background = "#198754";
    setTimeout(() => (statusText.style.display = "none"), 4000);
  }
  else if (status === "notFound")
  {
    statusText.style.display = "block";
    statusText.textContent = "Book not found";
    statusText.style.background = "#DC3545";
    setTimeout(() => (statusText.style.display = "none"), 4000);
  }
}

/* Handles Local Storage */
function Ls_getBooks() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
}

function Ls_setBooks(book) {
  const books = Ls_getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function Ls_removeBook(title) {
  const books = Ls_getBooks();
  books.forEach((book, index) => {
    if (book.title === title) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
}

})();