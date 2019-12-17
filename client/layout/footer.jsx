import '../assets/styles/footer.styl'

export default {
  name: 'footer',
  data () {
    return {
      author: 'Young'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
