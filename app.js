const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.template = document.querySelector(selectors.templateSelector)
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.flicks.unshift(flick)

    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstChild)

    ++ this.max
    f.reset()
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.querySelector(".flick-name").textContent = flick.name
    item.querySelector('button.remove').addEventListener('click', this.removeFlick)
    item.classList.remove('template')
    item.dataset.id = flick.id
    return item
  },

  removeFlick(ev){
    ev.target.closest(".flick").remove()
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: ".flick.template"
})