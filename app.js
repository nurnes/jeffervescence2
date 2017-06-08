const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.template = document.querySelector(selectors.templateSelector)
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(".button.clear").addEventListener("click", function() {
      localStorage.removeItem("flicks")
      localStorage.removeItem("max")
      location.reload()
    })
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlick.bind(this))
    this.load()
    this.max = JSON.parse(localStorage.getItem("max"))
  },

  load(){
    const fload = JSON.parse(localStorage.getItem("flicks"))
    if(fload != null){
      this.flicks =fload
    } 
    for(let i = this.flicks.length-1; i>=0; i--){
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
      year: f.flickYear.value,
      fav: false,
    }

    this.flicks.unshift(flick)
    this.save()

    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstChild)

    ++ this.max
    localStorage.setItem("max", JSON.stringify(this.max))
    f.reset()
  },

  save(){
    localStorage.setItem('flicks', JSON.stringify(this.flicks))
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.querySelector(".flick-name").textContent = flick.name
    item.querySelector(".flick-name").addEventListener('input', this.changeName.bind(this))
    item.querySelector(".flick-year").textContent = flick.year
    if(flick.fav === true){
      item.className += " fave"
    }
    item.querySelector('button.fav').addEventListener('click', this.favFlick.bind(this))
    item.querySelector('button.remove').addEventListener('click', this.removeFlick.bind(this))
    item.querySelector('button.up').addEventListener('click', this.moveUp.bind(this))
    item.querySelector('button.down').addEventListener('click', this.moveDown.bind(this))
    item.classList.remove('template')
    item.dataset.id = flick.id
    return item
  },

  favFlick(ev){
    const li = ev.target.closest(".flick")
    if(li.classList.contains("fave")){
      li.classList.remove("fave")
      for(let i = 0; i<this.flicks.length; i++){
        if(this.flicks[i].id.toString() === li.dataset.id){
          this.flicks[i].fav = false
          break
        }
      }
    }else{
      li.classList.add("fave")
      for(let i = 0; i<this.flicks.length; i++){
        if(this.flicks[i].id.toString() === li.dataset.id){
          this.flicks[i].fav = true
          break
        }
      }
    }
    this.save()
  },

  removeFlick(ev){
    console.log(ev.target.closest(".flick"))
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

  moveUp(ev){
      const li = ev.target.closest(".flick")
      if(this.flicks[0].id.toString() === li.dataset.id){
        return
      }
      let f = 0
      for(let i = 0; i<this.flicks.length; i++){
        if(this.flicks[i].id.toString() === li.dataset.id){
          f = i
          const temp = this.flicks[i-1]
          this.flicks[i-1] = this.flicks[i]
          this.flicks[i] = temp
          break
        }
      }
      this.list.insertBefore(li, this.list.childNodes[f-1])
      this.save()
  },

  moveDown(ev){
      const li = ev.target.closest(".flick")
      if(this.flicks[this.flicks.length-1].id.toString() === li.dataset.id){
        return
      }
      let f = 0
      for(let i = 0; i<this.flicks.length; i++){
        if(this.flicks[i].id.toString() === li.dataset.id){
          f = i
          const temp = this.flicks[i+1]
          this.flicks[i+1] = this.flicks[i]
          this.flicks[i] = temp
          break
        }
      }
      li.parentNode.insertBefore(li, li.nextSibling.nextSibling);
      this.save()
  },
  changeName(ev){
    const li = ev.target.closest(".flick")
    for(let i = 0; i<this.flicks.length; i++){
        if(this.flicks[i].id.toString() === li.dataset.id){
          this.flicks[i].name = ev.target.textContent
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