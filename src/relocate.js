import Vue from 'vue'

const getWindowSize = () => {
  let ww = window.innerWidth
  let wh = window.innerHeight
  return {
    width: ww,
    height: wh
  }
}

const getPosition = (el) => {
  let rect = el.getBoundingClientRect()
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  }
}

const removeClassByPrefix = (el, prefix) => {
  let regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g')
  el.className = el.className.replace(regx, '')
  return el
}

const relocate = (el) => {
  let pos = getPosition(el)
  let win = getWindowSize()
  let pos1 = 'right'
  let pos2 = 'bottom'

  if (pos.width + pos.left > win.width - 20) {
    pos1 = 'left'
  }

  if (pos.height + pos.top > win.height) {
    pos2 = 'top'
  }

  el.classList.add('position-' + pos1 + '-' + pos2)
}

export default {
  componentUpdated (el, binding) {
    if (!binding.value && !binding.value.show) {
      setTimeout(() => {
        removeClassByPrefix(el, 'position-')
      }, 400)
      return
    }
    console.log('bindingvalueShow', binding.value.show)
    console.log('bindingoldvalueShow', binding.oldValue.show)
    if (binding.value.show !== binding.oldValue.show) {
      Vue.nextTick(() => {
        if (binding.value.position) {
            console.dir('binding.value.position')
            console.dir(binding.value.position)
          el.classList.add(`position-${binding.value.position}`)
        } else {
            console.dir('relocate')
          relocate(el)
        }
      })
    }
  }
}
