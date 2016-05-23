import React from 'react'

import Health from './health'
import NodeInfo from './nodeInfo'
import NodeStats from './nodeStats'
import DataStats from './dataStats'

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
          <li className="list-group-item" style={{padding: '10px'}}>
            <NodeInfo es={es} />
          </li>
          <li className="list-group-item" style={{padding: '5px'}}>
            <NodeStats es={es} />
          </li>
        </ul>
      </div>
      <div className="col-md-8">
        <div className="list-group">
          <div className="list-group-item" style={{background:'#F6F6F6'}}>
            <h5 style={{marginBottom: '0px'}}>Top hits aggregation</h5>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
          </div>
          <div className="list-group-item">
            <div className="row">
              <div className="col-md-10" style={{borderRight: '1px solid #e3e3e3'}}>
                <DataStats es={es} />
              </div>
              <div className="col-md-2">
                Opcje
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Main
