const template = document.createElement('template');
template.innerHTML = `
<style>
.overlay {
  display: none;
  position:fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  z-index: 255;
}

.modal-content {
  position: relative;
}

.modal-close {
  position: absolute;
  top: 5px;
  right: 5px;
  color: rgba(255,255,255,1);
}

:focus-visible {
  box-shadow: 0 0 0 3px rgba(21, 156, 228, 0.4);
}
</style>

<div>
  <div class="overlay" role="dialog" aria-modal="true" aria-live="assertive">
    <div class="modal">
      <div id="modal-content" class="modal-content">
        <slot id="slot-content" name="content"></slot>
        <div tabindex="0" id="modal-close" class="modal-close" aria-label="Close">
          <slot id="slot-close" name="close">
            <svg width="40" height="40" viewbox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="white" stroke-width="4" /></svg>
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>
`

export class Modal extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'closed'})
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.slotclose = shadowRoot.querySelector('#slot-close')
    this.slotcontent = shadowRoot.querySelector('#slot-content')

    this.opener = null
    this.close = shadowRoot.querySelector('.modal-close')
    this.close.addEventListener('click', () => {
      this.closeModal()
    })
    this.overlay = shadowRoot.querySelector('.overlay')
    this.overlay.addEventListener('click', (event) => {
      if(event.target.className === 'overlay'){
        this.closeModal()
      }
    })
    window.addEventListener('keydown', (event) => {
      if(event.key === 'Escape') {
        this.closeModal()
      }
    })
  }

  connectedCallback() {
    if (this.hasAttribute('label')) {
      var label = this.attributes.label.value
      this.overlay.setAttribute('aria-label', label)
    } else {
      let c = this.slotcontent.assignedElements()
      this.slotcontent.assignedElements().some(e => {
        let t = e.textContent
        if (t) {
          this.overlay.setAttribute('aria-label', t)
        } else {
          return true
        }
      })
    }
  }

  openModal(){
    this.opener = document.activeElement
    this.setVisible(true)
    this.setFocus()
    const event = new CustomEvent('modal-open', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: { opener: this.opener }
    });
    this.overlay.dispatchEvent(event);
  }

  closeModal(){
    this.setVisible(false)
    const event = new CustomEvent('modal-close', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: { opener: this.opener }
    });
    this.overlay.dispatchEvent(event);
    if (this.opener) {
      this.opener = null
    }
  }

  setVisible(visible) {
    const display = visible? 'flex' : 'none'
    this.overlay.style.display = display
  }

  setFocus() {
    this.close.focus()
    this.slotcontent.assignedElements().some(e => {
      let list = e.querySelectorAll('button, input, textarea, select')
      if (list.length) {
        list[0].focus()
        return true
      }
    })
  }
}
window.customElements.define('accessible-modal', Modal)
