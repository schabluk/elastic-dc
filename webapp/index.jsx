import React from 'react'
import ReactDOM from 'react-dom'
import Elasticsearch from 'elasticsearch'
import 'bootstrap-webpack'
import './index.css'

import Main from './components/main.jsx'

var es = new Elasticsearch.Client({
  host: location.hostname + ':9200',
  log: 'info'
})
es.ping({
  requestTimeout: Infinity,
  hello: "there"
}, function (error) {
  if (error) {
    alert('elasticsearch cluster is down!')
  } else {
    ReactDOM.render(
      <Main es={es} />, document.getElementById("root")
    )
  }
})
