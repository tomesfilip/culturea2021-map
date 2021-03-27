class HamburgerBtn {
  onAdd(map) {
    this._map = map
    this._hamburgerBtn = document.createElement('button')
    this._hamburgerBtn.className = 'mapboxgl-ctrl'
    return this._hamburgerBtn
  }
  onRemove() {
    this._hamburgerBtn.parentNode.removeChild(this._hamburgerBtn)
    this._map = undefined
  }
}

export default HamburgerBtn