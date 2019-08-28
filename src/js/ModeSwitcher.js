'use strict'

const ContextMenu = require('./ContextMenu')
const translate = require('./i18n').translate

/**
 * Create a select box to be used in the editor menu's, which allows to switch mode
 * @param {HTMLElement} container
 * @param {String[]} modes  Available modes: 'code', 'form', 'text', 'tree', 'view', 'preview'
 * @param {String} current  Available modes: 'code', 'form', 'text', 'tree', 'view', 'preview'
 * @param {function(mode: string)} onSwitch  Callback invoked on switch
 * @constructor
 */
function ModeSwitcher (container, modes, current, onSwitch) {
  // available modes
  const availableModes = {
    code: {
      text: translate('modeCodeText'),
      title: translate('modeCodeTitle'),
      click: function () {
        onSwitch('code')
      }
    },
    form: {
      text: translate('modeFormText'),
      title: translate('modeFormTitle'),
      click: function () {
        onSwitch('form')
      }
    },
    text: {
      text: translate('modeTextText'),
      title: translate('modeTextTitle'),
      click: function () {
        onSwitch('text')
      }
    },
    tree: {
      text: translate('modeTreeText'),
      title: translate('modeTreeTitle'),
      click: function () {
        onSwitch('tree')
      }
    },
    view: {
      text: translate('modeViewText'),
      title: translate('modeViewTitle'),
      click: function () {
        onSwitch('view')
      }
    },
    preview: {
      text: translate('modePreviewText'),
      title: translate('modePreviewTitle'),
      click: function () {
        onSwitch('preview')
      }
    }
  }

  // list the selected modes
  const items = []
  for (let i = 0; i < modes.length; i++) {
    const mode = modes[i]
    const item = availableModes[mode]
    if (!item) {
      throw new Error('Unknown mode "' + mode + '"')
    }

    item.className = 'jsoneditor-type-modes' + ((current === mode) ? ' jsoneditor-selected' : '')
    items.push(item)
  }

  // retrieve the title of current mode
  const currentMode = availableModes[current]
  if (!currentMode) {
    throw new Error('Unknown mode "' + current + '"')
  }
  const currentTitle = currentMode.text

  // create the html element
  const box = document.createElement('button')
  box.type = 'button'
  box.className = 'jsoneditor-modes jsoneditor-separator'
  box.innerHTML = currentTitle + ' &#x25BE;'
  box.title = 'Switch editor mode'
  box.onclick = () => {
    const menu = new ContextMenu(items)
    menu.show(box, container)
  }

  const frame = document.createElement('div')
  frame.className = 'jsoneditor-modes'
  frame.style.position = 'relative'
  frame.appendChild(box)

  container.appendChild(frame)

  this.dom = {
    container: container,
    box: box,
    frame: frame
  }
}

/**
 * Set focus to switcher
 */
ModeSwitcher.prototype.focus = function () {
  this.dom.box.focus()
}

/**
 * Destroy the ModeSwitcher, remove from DOM
 */
ModeSwitcher.prototype.destroy = function () {
  if (this.dom && this.dom.frame && this.dom.frame.parentNode) {
    this.dom.frame.parentNode.removeChild(this.dom.frame)
  }
  this.dom = null
}

module.exports = ModeSwitcher
