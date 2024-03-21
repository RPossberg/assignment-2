console.log("index.js loaded");
/*
CPSC1520 Client-Side Development
*Task 1: Data Fetch and Display Templating
    Fetch the album data from the projects data folder (albums.json).
    1. Create an async function to load the album data.
    2. Create a variable called albumStore and assign the album data to it.
    Do not edit the albumStore variable using any of the array methods, it is the single source of truth for the application data. then make a copy using the spread operator and assign it to new variable.
    3. Create a copy of the array data then use display templating to render the data and template into the table. add the album data into the table. Add the template data to the correct section of the table element.
*Task 2:
Add a submit event listener to the form element.
Get the search query and minimum rating.
* Text input field for the search query.
  Create a function that searches the objects in the JSON array. Use the input text field value as the search term. Function should search the objects in the array for the artist and artistName properties for each album object. Return the results of the search as an array. If no data is found, then return null. The data query search should be case insensitive.
*Number Text Field Search
  Create a function that searches the objects in the JSON array based on the minimum rating input. Use this value to search the objects in the albums array against the numberRating property of the data objects. Return the search results as an array. If no data is found, then return null.
*Render Function
  Create a render function that takes the search results from the either of the two functions created as an argument. The render function should update the table display with then results passed as an array of object when the render function was called. Use the template provided. The template should be added to the correct section of the table element.
*Task 3:
  Order the album data based on the average rating and minimum reviews fields in the table. Add an event to the two cells and listen for the click event. Sort the data from highest to lowest value. If the data is already sorted, then reverse the order of the data. Use the sort method to sort the data. Use the reverse method to reverse the order of the data. Use the render function to update the table display with the sorted data.
*Task 4:
  Sort the data by release date field. The data should be sorted from the highest to lowest (lowest means the date closes to today). Sort the data from highest to lowest value. If the data is already sorted, then reverse the order of the data. Use the sort method to sort the data. Use the reverse method to reverse the order of the data. Use the render function to update the table display with the sorted data.
*/
/*
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr>;
*/

// Create an async function to load the album data.
async function loadAlbumData() {
  const response = await fetch("./public/data/albums.json");
  const data = await response.json();
  return data;
}

// Fetch the album data from the projects data folder (albums.json).
const albumData = await loadAlbumData();
let albumStore = [...albumData];

// Create a function to sort the album data based on the average rating and minimum reviews fields in the table.
function orderAlbumData() {
  albumStore.sort((a, b) => {
    if (a.averageRating < b.averageRating) {
      return 1;
    }
    if (a.averageRating > b.averageRating) {
      return -1;
    }
    return 0;
  });
}
// Call the function to order the album data based on the average rating and minimum reviews fields in the table.
orderAlbumData();

// Create a store variable as a data backup.
let albumStoreCopy = [...albumStore];

// Create a copy of the array data then use display templating to render the data and template into the table. add the album data into the table. Add the template data to the correct section of the table element.
const table = document.querySelector("table");

// Add header fields
let header = `
  <tr>
    <th>Album Name</th>
    <th>Release Date</th>
    <th>Artist Name</th>
    <th>Genre</th>
    <th>Average Rating</th>
    <th>Number of Ratings</th>
  </tr>
`;

let template = "";
albumStore.forEach((album) => {
  template += `
    <tr>
      <td>${album.album}</td>
      <td>${album.releaseDate}</td>
      <td>${album.artistName}</td>
      <td>${album.genres}</td>
      <td>${album.averageRating}</td>
      <td>${album.numberRatings}</td>
    </tr>
  `;
});

table.innerHTML = header + template;

// After the table has been rendered
const tableCells = document.querySelectorAll("td");

// Add event listeners to the table cells
tableCells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    // Handle the click event here
    console.log("Cell clicked: ", event.target.textContent);
  });
});

// Add event listeners to the average rating and number of ratings cells for sorting
const averageRatingCell = document.querySelector("#average-rating-cell");
const numberOfRatingsCell = document.querySelector("#number-of-ratings-cell");

averageRatingCell.addEventListener("click", () => {
  sortDataByField("averageRating");
});

numberOfRatingsCell.addEventListener("click", () => {
  sortDataByField("numberRating");
});

// Sort the data by a specific field in the table
function sortDataByField(field) {
  albumStore.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  });

  render(albumStore);
}

// Sort the data by release date field
const releaseDateCell = document.querySelector("#release-date-cell");
releaseDateCell.addEventListener("click", () => {
  sortDataByReleaseDate();
});

function sortDataByReleaseDate() {
  albumStore.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB - dateA;
  });

  render(albumStore);
}

// Add submit event listener to the form element
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchQueryValue = searchQuery.value.trim();
  const minRatingValue = parseInt(minRating.value);

  const searchResults = searchAlbums(searchQueryValue);
  const ratingResults = searchByRating(minRatingValue);

  if (searchResults && ratingResults) {
    const filteredResults = searchResults.filter((album) =>
      ratingResults.includes(album)
    );
    render(filteredResults);
    console.log(filteredResults);
  } else if (searchResults) {
    render(searchResults);
    console.log(searchResults);
  } else if (ratingResults) {
    render(ratingResults);
    console.log(ratingResults);
  } else {
    render(albumStore);
  }
});

// Get the search query and minimum rating.
const searchQuery = document.querySelector("#search");
const minRating = document.querySelector("#rating");

// Text input field for the search query.
function searchAlbums(query) {
  const searchResults = albumStore.filter((album) => {
    return (
      album.artist.toLowerCase().includes(query.toLowerCase()) ||
      album.artistName.toLowerCase().includes(query.toLowerCase())
    );
  });
  return searchResults;
}

// Number Text Field Search
function searchByRating(rating) {
  const searchResults = albumStore.filter((album) => {
    return album.numberRating >= rating;
  });
  return searchResults;
}

// Render Function
function render(data) {
  const table = document.querySelector("table");
  let template = "";
  data.forEach((album) => {
    template += `
      <tr>
        <td>${album.albumName}</td>
        <td>${album.releaseDate}</td>
        <td>${album.artistName}</td>
        <td>${album.genre}</td>
        <td>${album.averageRating}</td>
        <td>${album.numberRating}</td>
      </tr>
    `;
  });
  table.innerHTML = template;
}
