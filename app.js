const app = {
  init(formSelector) {
    document
      .querySelector(formSelector)
      .addEventListener('submit', this.addFlick)
  },

  addFlick(ev) {
    ev.preventDefault()
    const flickName = ev.target.flickName.value
    console.log(flickName)
  },
}

app.init('#flickForm')