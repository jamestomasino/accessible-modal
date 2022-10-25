import "wicg-inert";
import "./accessible-modal.js"

function accessibleModal () {
  let main = ''
  let buttons = ''

  /**
   * Object that holds a callback function and data about how to handle it
   *
   * @param {string} main A querySelector value that targets your main content block
   * @param {string} buttons A querySelector value that targets buttons which launch modals
   */
  function init (main, buttons) {
    main = main
    buttons = buttons

    bindButtons()
    bindModals()
  }

  function setInertBehindModal(inert) {
    const main = document.querySelector(main)
    if (main) {
      main.inert = inert
      main.setAttribute('aria-hidden', inert)
    }
  }

  function bindButtons() {
    const openButtons = document.querySelectorAll(buttons)
    openButtons.forEach(b => {
      let target = b.dataset.target
      if (target) {
        let modal = document.getElementById(target)
        if (modal) {
          b.addEventListener('click', () => {
            modal.openModal()
            setInertBehindModal(true)
          })
        }
      }
    })
  }

  function bindModals() {
    const modals = document.querySelectorAll('accessible-modal')
    modals.forEach(m => {
      m.addEventListener('modal-close', (e) => {
        setInertBehindModal(false)
        try {
          e.detail.opener.focus()
        } catch (e) {}
      })
    })
  }

  return { init }
}
module.exports = accessibleModal()
