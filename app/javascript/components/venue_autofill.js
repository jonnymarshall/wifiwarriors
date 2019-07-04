// TODO: Autocomplete the input with AJAX calls.
const venueAutofill = () => {
  console.log("hello from venue_autofill.js");

  // Assign DOM elements to variables
  const searchBar = document.getElementById("venueNameInput");
  const dropdown = document.getElementById("myDropdown");
  const address = document.getElementById("address");
  const description = document.getElementById("description");
  const longitude = document.getElementById("longitude");
  const latitude = document.getElementById("latitude");
  const fourSquareId = document.getElementById("fourSquareId");

  // Assign FourSquare URL variables
  const urlRoot = "https://api.foursquare.com/v2/venues/"
  const urlRootSearch = `${urlRoot}search?`;
  const location = "bali";
  const credentials = "&client_id=REDACTED&client_secret=REDACTED"
  const versionDate = "&v=20190703";
  const limit = "&limit=10";
  const foodCategoryId = "4d4b7105d754a06374d81259"
  const barCategoryId = "4bf58dd8d48988d116941735"
  const hotelCategoryId = "4bf58dd8d48988d1fa931735"
  const corporateCoffeeShopId = "5665c7b9498e7d8a4f2c0f06"
  const coworkingSpaceId = "4bf58dd8d48988d174941735"
  const categoryIds = `${foodCategoryId},${barCategoryId},${hotelCategoryId},${corporateCoffeeShopId},${coworkingSpaceId}`


  // Begin Search Query
  let searchQuery = "";

  // Add keydown event listener
  searchBar.addEventListener('keydown', (event) => {
    console.log (event);
    // Kill previous reults on every keydown event
    dropdown.innerHTML = "";

    // Capture keydown character
    const character = event.key;
    // Remove last character from search query if character is backspace
    if (character === "Backspace"){
      searchQuery = searchQuery.slice(0, -1);
      if (searchQuery.length > 0)
        myDropdown.classList.remove("invisible");
    } else {
      searchQuery += event.key;
      myDropdown.classList.remove("invisible");
    }
    // Log the search query
    console.log(searchQuery);

    // Call the FourSquare API
    fetch(`${urlRootSearch}near=${location}&query=${searchQuery}&categoryId=${categoryIds}${limit}${credentials}${versionDate}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        // Generate html list
        data.response.venues.forEach((venue) => {
          dropdown.insertAdjacentHTML("afterbegin", `<li class="list-group-item" id=${venue.id}>${venue.name}</li>`);
        });
        // list item highlighting
        const listItems = document.querySelectorAll("li");
        listItems.forEach((listItem) => {
          listItem.addEventListener("mouseover", (mouseover) => {
            const prevSelection = document.querySelector(".dropdown-hover");
            if (prevSelection) {
              prevSelection.classList.remove("dropdown-hover");
            }
            mouseover.target.classList.add("dropdown-hover");
          });
        });

        // list item selection
        listItems.forEach((listItem) => {
          listItem.addEventListener("click", (click) => {
            // Get the FourSquare id from the <li>
            let clickedListItemId = listItem.id;
            // Reassign searchQuery to be the name of the selected venue
            searchQuery = listItem.innerHTML;
            // Make the value attribute of venueNameInput field to be the same as the venue
            venueNameInput.value = searchQuery;
            // Kill the venue results list
            myDropdown.classList.add("invisible");
            // Check the clickedListItemId against the venue results to rematch object
            data.response.venues.forEach((venue) => {
              if (clickedListItemId == venue.id){
                // Console log the matched venue
                console.log(venue);
                // Assign other form values with object data for venue
                venue.location.formattedAddress.forEach((line) => {
                  address.value += `${line}, `;
                });
                address.value = address.value.slice(0, -2);
                description.value = venue.categories[0].name;
                longitude.value = venue.location.lat;
                latitude.value = venue.location.lng;
                fourSquareId.value = venue.id;
                // findVenueOpeningTimes(venue.id)



                // Fetch opening hours information with venue specific search
                // fetch(`${urlRoot}${venue.id}/hours?${credentials}${versionDate}`)
                //   .then(response => response.json())
                //   .then((data) => {
                //     console.log(data);
                //     console.log(data.response.hours.timeframes[0]);

                // });
              }
            });
          });
        });
      });
  });
}

export { venueAutofill }
