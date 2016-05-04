LineFocusChart = React.createClass({
  getDefaultProps() {
    return {
      date_format: "ddd HH",
      colors: ["#FF0000","#00FF00","#0000FF"]
    }
  },
  componentDidUpdate() {
    d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  },
  componentDidMount() {
    var self = this

    var brushStart = moment().add(-13, 'hours').format("x")
    var brushEnd  = moment().add(-1, 'hours').format('x')

    nv.addGraph(function() {
      self.chart = nv.models.lineWithFocusChart()
        .brushExtent([brushStart,brushEnd])
        .useInteractiveGuideline(true)
        .color(self.props.colors)
        //.interpolate("basis")

      self.chart.xAxis.tickFormat(function(d) {
         return moment(d).format(self.props.date_format)
      })
      self.chart.yAxis.tickFormat(d3.format(',.0f'))

      //self.chart.x2Axis.tickFormat(d3.format('f'))
      self.chart.x2Axis.tickFormat(function(d) {
         return moment(d).format(self.props.date_format)
      })
      self.chart.y2Axis.tickFormat(d3.format(',.0f'))

      d3.select(self.refs.svg)
        .datum(self.props.datum)
        .call(self.chart)

      //nv.utils.windowResize(chart.update)

      return self.chart
    })

  },
  render() {
    return (
      <div className="focus-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
