module.exports = class {
  onCreate() {
    this.state = {
      show_spinner: false,
      height: "100%",
      width: "100%"
    }
  }
  iframe_loaded() {
    this.state.show_spinner = false
  }
}
