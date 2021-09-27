var sales = [
  { product: 'Hoodie', count: 12 },
  { product: 'Jacket', count: 17 },
  { product: 'Snuggie', count: 60 },
];

var pie = d3.pie()
  .value(function (d) { return d.count })

var slices = pie(sales);

var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(60);

// helper that returns a color based on an ID
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('.graph')
  .append('svg')
  .attr("class", "pie");
var g = svg.append('g')
  .attr('transform', 'translate(200, 75)');

var arcGraph = g.selectAll('path.slice')
  .data(slices)
  .enter();
arcGraph.append('path')
  .attr('class', 'slice')
  .attr('d', arc)
  .attr('fill', function (d) {
    return color(d.data.product);
  });

arcGraph.append("text")
  .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr('class', 'parte')
  .attr("dy", "0.35em")
  .text(function (d) { return d.data.count });
// building a legend is as simple as binding
// more elements to the same data. in this case,
// <text> tags
svg.append('g')
  .attr('class', 'legend')
  .selectAll('text')
  .data(slices)
  .enter()
  .append('text')
  .attr('class', 'legenda')
  .text(function (d) { return '- ' + d.data.product; })
  .attr('fill', function (d) { return color(d.data.product); })
  .attr('y', function (d, i) { return 20 * (i + 1); })

$('.legenda')
  .on('mouseover', function (event) {
    alert($(this).text());
  })

$('.parte')
  .on('mouseover', function (event) {
    alert('Parte do grafico com valor: ' + $(this).text())
  });

function darPop(event) {

  pop.css({
    'display': 'block',
    'top': event.clientY,
    'left': event.clientX
  });
}

