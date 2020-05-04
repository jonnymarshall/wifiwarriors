import { Controller } from "stimulus"

export default class extends Controller {

  controllerName = "mobile-menu"

  static targets = ["hamburger", "menu"]

  menuIsExpanded = false
  menuToggleInProgress = false
  menuTransitionDuration = 1000
  

  connect() {
    console.log(`${this.controllerName} connected.`)
  }

  disconnect() {
    console.log(`${this.controllerName} disconnected.`)
  }

  toggleScreenLock() {
    document.body.classList.toggle('u-lock-scrolling')
  }

  doThisThing() {
    self = this
    
    if (!this.menuToggleInProgress) {
      this.toggleScreenLock()
      document.body.scrollTo(0,0);
      this.menuToggleInProgress = true
      this.hamburgerTarget.classList.toggle('is-active');

      const toggleMenu = () => {
        if (!this.menuIsExpanded) {
          this.menuTarget.style.left = '0%';
        }
        else {
          this.menuTarget.style.left = '-100%';
        }
        this.menuIsExpanded = !this.menuIsExpanded
      }

      const toggleMenuActiveClass = () => {
        this.menuTarget.classList.toggle('is-active');
      }

      const reassignMenuToggleInProgress = () => {
        this.menuToggleInProgress = false
      }

      if (!this.menuIsExpanded) {
        toggleMenuActiveClass()
        setTimeout(toggleMenu, 10);
        setTimeout(this.menuToggleInProgress = false, this.menuTransitionDuration + 10);
        setTimeout(this.toggleScreenLock, this.menuTransitionDuration + 10);
      } else {
        toggleMenu();
        setTimeout(toggleMenuActiveClass, this.menuTransitionDuration);
        setTimeout(reassignMenuToggleInProgress, this.menuTransitionDuration);
        setTimeout(this.toggleScreenLock, this.menuTransitionDuration);
      }
    }
  }
    
}