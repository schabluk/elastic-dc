import React from 'react'
import $ from 'jquery'

class Health extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      beatRate: this.props.beatRate,
      status: this.props.status,
      tooltip: this.props.tooltip
    }

    this.beat = this.beat.bind(this)
  }
  render() {
    return (
      <span
        ref="tooltip"
        className={"label label-" + this.state.status}
        title={this.state.tooltip}>&nbsp;</span>
    )
  }
  beat() {
    const {es} = this.props

    es.cluster.health().then((result) => {
      if(result.status === 'green') {
        this.setState({status: 'success'})
        this.setState({tooltip: 'Connected to cluster'})
      }
      if(result.status === 'yellow') {
        this.setState({status: 'warning'})
        this.setState({tooltip: 'Check cluster health'})
      }
    }, function (err) {
      // todo: nie działa
      this.setState({status: 'danger'})
      this.setState({tooltip: err.message})
    })
  }
  componentDidMount() {
    this.beat()
    this.interval = setInterval(this.beat, this.state.beatRate)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

Health.defaultProps = {
  beatRate: 5000,
  status: 'default',
  tooltip: 'Unknown'
}

Health.propTypes = {
  es: React.PropTypes.object.isRequired
}

export default Health
