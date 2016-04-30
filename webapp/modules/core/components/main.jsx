import React from 'react'

const Main = () => (
  <div className="container">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="jumbotron">
      <h4>Navbar example</h4>
      <p>Content.</p>
    </div>
  </div>
)

export default Main
