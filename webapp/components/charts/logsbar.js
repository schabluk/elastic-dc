LogsBarChart = React.createClass({
  getDefaultProps() {
    return {
      height: 200,
      tips: true
    }
  },
  componentDidUpdate() {
    d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  },
  componentDidMount() {
    var self = this

    nv.addGraph(function() {
      self.chart = nv.models.multiBarChart()
        .height(self.props.height)
        .stacked(true)
        .showLegend(true)
        .showControls(false)
        .margin({"left":40,"right":10,"top":10,"bottom":0})
        .groupSpacing(0.05)
        .clipEdge(true)
        //.rotateLabels(-45)

      self.chart.xAxis.tickFormat(function(d) {
         //return moment(d).fromNow()
         return moment(d).format('YYYY-MM-DD HH')
      })
      self.chart.yAxis.tickFormat(d3.format(',.0f'))

      d3.select(self.refs.svg)
        .datum(self.props.datum)
        .transition()
        .duration(1000)
        .call(self.chart)

      //nv.utils.windowResize(self.chart.update)

      return self.chart
    })

  },
  render() {
    return (
      <div className="bar-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
