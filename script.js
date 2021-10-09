const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
// ^ url for the google books api

const getBooks = async (searchTerm) => {
  const response = await fetch(`${BOOKS_URL}${searchTerm}&maxResults=5`);
  const data = await response.json();
  console.log(data);
  return data.items;
};
// ^

// setting DOM for my button (placeholder magnifying glass)
const button = document.querySelector(".search__button");

button.addEventListener("click", async (event) => {
  // setting DOM for my input to collect search terms from the users input
  const input = document.querySelector("#input");

  // user input gets stored
  const searchTerm = input.value;

  // alert user to use a search term
  if (!searchTerm) {
    alert("Put in here what you're looking for");
    return;
  }

  // get the books using a function specified above
  const books = await getBooks(searchTerm);

  const grid = document.querySelector(".books__grid");

  // create list elements for each book
  const listItems = books.map((book) => {
    // ^ list of book item objects that match search terms
    const element = document.createElement("li");
    // ^creating the list items once the 'search' occurs

    // styling for how element is displayed
    element.style.fontFamily = "Verdana";
    // ^ book title for searched book
    element.style.width = "20%";
    element.style.listStyle = "none";
    // ^ REMOVING LIST DOTS AS ITS UGLY TO KEEP EM FOR IMAGES
    element.style.display = "flex";
    // ^ telling the books how to behave when displayed
    element.style.flexDirection = "column";
    element.style.alignItems = "center";
    element.style.padding = "3px";
    element.style.textAlign = "center";
    // ^ book display being de-uglified

    // sourcing the book thumbnails and creating their element (document(root).createElement(bringingit).("img")(the image))
    const bookCover = document.createElement("img");
    bookCover.src = `${book.volumeInfo.imageLinks.smallThumbnail}`;

    // Styling the Book Covers width + height when they're shown
    bookCover.style.width = "50%";
    bookCover.style.height = "80%";

    //
    const bookText = `${book.volumeInfo.title} by ${book.volumeInfo.authors}`;
    const textNode = document.createTextNode(bookText);

    // 'appendchild' aka sticking the book cover and the text node together for what the dear user has put in their search.
    element.appendChild(bookCover);
    element.appendChild(textNode);
    return element;
  });

  //   FROM const listItems = books.map((book) => {  TO element.appendChild(bookCover);
  // element.appendChild(textNode);
  // return element; THIS SECTION IS dictating how the book grid results are displayed

  // attaching list items to the unordered list
  const list = document.querySelector(".books__grid--list");
  const append = (parent) => (child) => parent.appendChild(child);
  listItems.forEach(append(list));
});

// Execute a function when the user releases a key on the keyboard
document.querySelector("#input").addEventListener("keyup", function (event) {
  // Number 13 references 'enter'
  if (event.keyCode === 13) {
    // Cancel the default action
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".search__button").click();
  }
});
