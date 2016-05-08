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
          <div className="list-group-item">
            Donec sed odio dui.
          </div>
          <div className="list-group-item">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus feugiat congue. Phasellus et sodales libero. Integer efficitur iaculis orci, eget suscipit justo egestas vitae. Nunc ac ante a libero mollis ultrices. Pellentesque nec lorem nulla. Duis ac varius lacus. Suspendisse tristique metus ac malesuada pretium. Praesent erat ipsum, dictum interdum lorem et, commodo dictum metus. Fusce maximus nulla et vestibulum rutrum. Sed iaculis mi leo, at mollis augue suscipit vel. Aenean euismod aliquet ornare.
            <hr />
            Aliquam nec maximus magna. Praesent eu mollis nisl. Ut a rhoncus libero. Vivamus lacinia arcu eu egestas sodales. Nam vitae nibh at ante sollicitudin euismod. Duis accumsan interdum ante, quis imperdiet ex porta in. Praesent faucibus purus vitae neque ultricies, eget tempor risus tincidunt. Pellentesque elementum semper massa quis vulputate. Quisque nec dolor vulputate, aliquam metus id, maximus orci. Nam urna justo, tempus eget convallis sed, posuere nec mauris. Donec ultrices facilisis nisl ac ornare. Aenean porttitor, est quis convallis scelerisque, magna quam placerat neque, quis mollis elit diam vitae felis. Fusce mauris quam, porta ac consectetur sagittis, finibus id massa.
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Main
