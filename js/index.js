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
// Add event listeners to the table cells
/*
  Top Level References
</tr>;
*/

let store;

let tbody = document.querySelector("tbody").cloneNode(true);
const reviewFilter = document.getElementById("reviews");
const ratingsFilter = document.getElementById("ratings");
const albumForm = document.querySelector("form");
albumForm.addEventListener("submit", onAlbumSearch);

function onAlbumSearch(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const query = formData.get("search");
  const rating = formData.get("rating");

  const albums = searchFilter(query, store);
}

function searchFilter(query, data) {
  const queryString = query.toLowerCase();

  const results = data.filter((album) => {
    return (
      album.album.toLowerCase().includes(queryString) ||
      album.artistName.toLowerCase().includes(queryString)
    );
  });
  renderAlbums(results);
}

async function appInit() {
  const res = await fetch("public/data/albums.json");
  store = await res.json();
  renderAlbums(store);
}

appInit();

function renderAlbums(data) {
  const container = tbody.cloneNode(true); // clone the node when you need one
  data.forEach(
    ({
      album,
      artistName,
      releaseDate,
      genres,
      averageRating,
      numberRatings,
    }) => {
      const template = `
    <tr>
    <td>${album}</td>
    <td>${artistName}</td>
    <td>${releaseDate}</td>
    <td>${genres}</td>
    <td>${averageRating}</td>
    <td>${numberRatings}</td>
  </tr>
    `;
      container.insertAdjacentHTML("beforeend", template); // add the template to the container
    }
  );
  // replace the tbody with the container that has the template
  document.querySelector("tbody").replaceWith(container);
}
