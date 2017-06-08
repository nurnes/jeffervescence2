const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.template = document.querySelector(selectors.templateSelector)
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlick.bind(this))
    this.load()
  },

  load(){
    const fload = JSON.parse(localStorage.getItem("flicks"))
    if(fload != null){
      this.flicks =fload
    } 
    for(let i = this.flicks.length-1; i>0; i--){
      const li = this.renderListItem(this.flicks[i])
      this.list.insertBefore(li, this.list.firstChild)
    }
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.flicks.unshift(flick)
    this.save()

    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstChild)

    ++ this.max
    f.reset()
  },

  save(){
    localStorage.setItem('flicks', JSON.stringify(this.flicks))
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.querySelector(".flick-name").textContent = flick.name
    item.querySelector('button.remove').addEventListener('click', this.removeFlick.bind(this))
    item.classList.remove('template')
    item.dataset.id = flick.id
    return item
  },

  removeFlick(ev){
    const li = ev.target.closest(".flick")
    li.remove()
    for(let i = 0; i<this.flicks.length; i++){
      if(this.flicks[i].id.toString() === li.dataset.id){
        this.flicks.splice(i, 1)
        break
      }
    }
    this.save()
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: ".flick.template"
})