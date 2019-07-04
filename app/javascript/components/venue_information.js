// const venueInformation = () => {
//   fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJI3fw3n1H0i0RuMkOSYRJueQ&key=AIzaSyBHJdXVlnyzl4sAA1nJbwaBSpizjtGOUV0")
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data);
//   });
// }

const venueSearch = () => {
  const apiURL = "REDACTED";
  const resultsList = document.getElementById("resultsList")

  fetch(apiURL)
    .then(response => response.json())
    .then((data) => {
      data.results.forEach((result) => {
        const resultId = result.id;
        console.log(resultId);
        const resultName = result.name;
        console.log(resultName);
        const resultListItem = `<li><p>${resultName}</p></li>`
        resultsList.insertAdjacentHTML('beforeend', resultListItem);
      });
  });
}

export { venueSearch }