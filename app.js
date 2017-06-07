const app = {
  init(formSelector) {
    this.max = 0
    document
      .querySelector(formSelector)
      .addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    console.log(flick.name, flick.id)
    ++ this.max
  },
}

app.init('#flickForm')