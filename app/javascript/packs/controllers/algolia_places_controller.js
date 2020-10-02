import { Controller } from "stimulus";

export default class extends Controller {
  controllerName = "algolia_places_controller";

  static targets = ["addressInput", "resultsContainer", "submitButton"];

  baseURL = null;
  searchQuery = null;
  results = null;

  connect() {
    console.log(`${this.controllerName} connected.`);
    this.baseURL = this.addressInputTarget.dataset.requestPath;
  }

  disconnect() {
    console.log(`${this.controllerName} disconnected.`);
  }

  async changeHandler(e) {
    this.searchHandler(e);
  }

  searchHandler = this.debounce(async function(e) {
    let self = this;
    this.searchQuery = e.target.value;
    await this.executeAjaxRequest();
    this.clearResults();
    this.generateResults();
    // let resultItems = document.querySelectorAll("[data-target='resultItem']");
    // resultItems.forEach((resultItem) => {
    //   // Click
    //   resultItem.addEventListener("click", (e) => {
    //     self.setLocation(resultItem);
    //     self.clearResults();
    //     if (self.submitButtonTargets.length > 0) {
    //       self.submitButtonTarget.click();
    //     }
    //   });
    // });
  }, 250);

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  hoverHandler(h) {
    let prevSelection = this.resultsContainerTarget.querySelector(
      ".is-primary"
    );
    if (prevSelection) {
      prevSelection.classList.remove("is-primary");
    }
    h.target.classList.add("is-primary");
  }

  setLocation(resultItem) {
    this.addressInputTarget.value = resultItem.innerText;
    this.addressInputTarget.dataset.selectedVenue = resultItem.innerText;
  }

  async executeAjaxRequest() {
    let self = this;
    let urlString = `${this.baseURL}?query=${this.searchQuery}`;

    await fetch(urlString, { headers: { accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        self.results = data.hits;
      });
  }

  clearResults() {
    this.resultsContainerTarget.innerHTML = "";
  }

  generateResults() {
    console.log("_____");
    this.results.forEach((result) => {
      console.log(result);
      console.log(result.locale_names[0]);
      console.log(result.country);
      // debugger;
      console.log(
        result._highlightResult.locale_names[0].matchedWords[0]
        // .replace("<em>", "<strong>")
        // .replace("</em>", "</strong>")
      );
    });

    this.results.forEach((result) => {
      // const tagReplacedResult = (result) => {
      //   result.locale_names[0]
      //     .replace("<em>", "<strong>")
      //     .replace("</em>", "</strong>");
      // };
      this.resultsContainerTarget.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="control has-icons-left">
          <span
            class="input u-pointer u-padding-tb-30px has-border-primary-on-hover"
            data-target="resultItem"
            type="text"
          >
            <span class="u-no-pointer-events">
              ${result.locale_names[0]}, ${result.country}
            </span>
            <span class="icon is-small is-left u-top-auto">
              <i class="fas fa-city"></i>
            </span>
          </span>
        </div>
        `
      );
    });
  }
}
