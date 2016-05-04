BulletChart = React.createClass({
  getDefaultProps() {
    return {
      title: 'title',
      subtitle: 'subtitle',
      level: 'primary',
      tips: true,
      chart: {
        "ranges":[100,200,300], //Minimum, mean and maximum values.
        "measures":[220], //Value representing current measurement (the thick blue line in the example)
        //"markers":[250], //Place a marker on the chart (the white triangle marker)
        "markerLabels":['Alert point (90%):'],
        "rangeLabels":['Total capacity:','Medium:','Low:'],
        "measureLabels":['Current usage']
      }
    }
  },
  bytesToSize(bytes) {
   if (bytes === 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2);
  },
  componentDidMount() {
    var self = this
    var data = this.props.data

    //console.log(this.props.subtitle)

    var marker = data.total_in_bytes * 90 / 100 // 90%

    _.extend(this.props.chart, {
      title: this.props.title,
      subtitle: this.props.subtitle,
      ranges: [
        Math.round(this.bytesToSize(data.total_in_bytes)*0.6),
        Math.round(this.bytesToSize(data.total_in_bytes)*0.3),
        this.bytesToSize(data.total_in_bytes)
      ],
      measures: [
        this.bytesToSize(data.total_in_bytes)-this.bytesToSize(data.free_in_bytes)
      ],
      markers: [
        this.bytesToSize(marker)
      ]
    })

    var levels = {
      "primary": '#337ab7',
      "info":    '#5cb85c',
      "warning": '#f0ad4e',
      "error":   '#d9534f'
    }

    var color = levels[this.props.level]
    var width = 350,
        height = 40,
        margin = {top: 5, right: 5, bottom: 5, left: 80}

    nv.addGraph(function() {
      var chart = nv.models.bulletChart()
          chart.width(width - margin.right - margin.left)
          chart.height(height - margin.top - margin.bottom)
          chart.margin(margin)
          chart.tooltip.enabled(self.props.tips)
          chart.color(color)

      d3.select(self.refs.svg)
        .datum(self.props.chart)
        .transition()
        .duration(300)
        .call(chart)

      //nv.utils.windowResize(chart.update)

      return chart
    })
  },
  render() {
    return (
      <div className="bullet-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
