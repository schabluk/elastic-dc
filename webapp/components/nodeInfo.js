import React from 'react'
import _ from 'underscore'

import './node.css'

class NodeInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      beatRate: this.props.beatRate
    }

    this.beat = this.beat.bind(this)
  }
  render() {
    if(!this.state.ip) {
      return (
        <li className="list-group-item"><small>No info</small></li>
      )
    }
    return (
      <li className="list-group-item container-fluid">
        <div className="row">
          <div className="col-xs-5" style={{paddingRight: '3px'}}>
            <p className="detail">&nbsp;<span className="pull-right">connected to:</span></p>
            <p className="detail">&nbsp;<span className="pull-right">version:</span></p>
            <p className="detail">&nbsp;<span className="pull-right">os:</span></p>
            <p className="detail">&nbsp;<span className="pull-right">cores:</span></p>
            <p className="detail">&nbsp;<span className="pull-right">jvm:</span></p>
            <p className="detail">&nbsp;</p>
          </div>
          <div className="col-xs-7" style={{paddingLeft: '3px'}}>
            <p className="detail">
              <code><a href={"#"+this.state.ip}>{this.state.name}</a> {this.state.attributes.master === 'true' ? '(master)' : '(worker)'}</code>
            </p>
            <p className="detail"><code>{this.state.version}</code></p>
            <p className="detail"><code>{this.state.os.name} {this.state.os.version}</code></p>
            <p className="detail"><code>{this.state.os.available_processors} ({this.state.os.allocated_processors} alloc)</code></p>
            <p className="detail"><code>{this.state.jvm.version}</code></p>
            <p className="detail"><code>{this.state.jvm.vm_name.substring(0, 16)}</code></p>
          </div>
        </div>
      </li>
    )
  }
  beat() {
    const self = this
    const {es} = this.props

    // get info, only for connected node
    es.nodes.info({human: true, nodeId: '_local'}).then(function(info) {
      const node = _.chain(info.nodes)
        .map((n) => {
          // filer properties
          return _.pick(n, 'attributes', 'status', 'name', 'host', 'ip', 'jvm', 'os', 'version')
        })
        .first()
        .value()

      if(node) {
        self.setState(node)
      }
    }, function(err) {
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

NodeInfo.defaultProps = {
  beatRate: 5000
}

NodeInfo.propTypes = {
  es: React.PropTypes.object.isRequired
}

export default NodeInfo
