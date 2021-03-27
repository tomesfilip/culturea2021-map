import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY

const map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/f-tomes/ckl27l6x413dx17mvv50wti7j",
  center: [17.674, 49.225],
  zoom: 13,
  minZoom: 13,
  maxZoom: 18,
  maxBounds: [
    [17.600, 49.190],
    [17.748, 49.260],
  ],
})

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

const hambBtn = new HamburgerBtn()

map.addControl(hambBtn)

export default map