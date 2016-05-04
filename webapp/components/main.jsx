import React from 'react'

import Health from './health'
import NodeInfo from './nodeInfo'
import NodeStats from './nodeStats'

const Main = ({es}) => (
  <div className="container">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">elastic-dc</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Main</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="row">
      <div className="col-md-4">
        <ul className="list-group">
          <li className="list-group-item">
            Cluster status
            <Health es={es} />
          </li>
          <NodeInfo es={es} />
          <NodeStats es={es} />
        </ul>
      </div>
      <div className="col-md-8">
        <div className="panel panel-default">
          <div className="panel-heading">Panel heading without title</div>
          <div className="panel-body">
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Main
