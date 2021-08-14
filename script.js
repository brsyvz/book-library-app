const addBook = document.querySelector("#form");
const removeBook = document.querySelector(".wrapper");
const searchBook = document.querySelector("#search");
const closeForm = document.querySelector("#closeForm-Btn");
const displayForm = document.querySelector("#newBook-Btn");

addBook.addEventListener("submit", addBookToLibrary);
removeBook.addEventListener("click", removeBookFromLibrary);
searchBook.addEventListener("keyup", searchForBook);
displayForm.addEventListener("click", displayBookForm);
closeForm.addEventListener("click", closeBookForm);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

(function storeBooks() {
  const books = getBooks_Local();
  books.forEach((book) => displayLibrary(book));
})();

function displayLibrary(book) {
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

function addBookToLibrary(e) {
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
    displayLibrary(book);
    setBooks_Local(book);
    clearFormFields();
    showStatusMessage("add");
    closeBookForm();
  }
}

function removeBookFromLibrary(e) {
    if (e.target.className == "remove-Btn") {
      e.target.parentElement.parentElement.remove();
    } else {
      return;
    }
    removeBooks_Local(e.target.parentElement.firstElementChild.textContent);
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

function displayBookForm() {
  form.classList.remove("animate__backOutUp");
  form.classList.add("animate__backInDown");
  form.style.display = "block";
}

function closeBookForm() {
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
function getBooks_Local() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
}

function setBooks_Local(book) {
  const books = getBooks_Local();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function removeBooks_Local(title) {
  const books = getBooks_Local();
  books.forEach((book, index) => {
    if (book.title === title) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
}
