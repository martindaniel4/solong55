d3.csv("solong.csv",function(csv) {

//variables

var h = 17660,
	w = 800,
	margin = {left:200,top:50,bottom:50,interval:50};

//data wrangling

var formatDate = d3.time.format("%d/%m/%Y"),
	prettyFormat = d3.time.format("%b. %d");

var data = [];

csv.forEach(function(d, i) {

data.push({
	index: i,
	date : formatDate.parse(d.Date),
	log : d.Action

})


});

var dateMin = new Date("09/01/2010"),
	dateMax = new Date("11/01/2014");

var scale = d3.time.scale().domain([dateMin, dateMax]).range([0,h]),
	scaleRect = d3.scale.linear().domain([0,1]).range([0,100]);

var yAxis = d3.svg.axis()
    .scale(scale)
    .orient("left")
    .tickFormat(d3.time.format("%B %Y"));

var yearAxis = d3.svg.axis()
    .scale(scale)
    .orient("left")
    .tickFormat(d3.time.format("%Y"));

// Add SVG container

var container = d3.select("body").append("svg")
				  .attr("width",w)
				  .attr("height",h);


container.selectAll("rect")
	.data(scale.ticks(d3.time.days, 1))
.enter().append("svg:rect")
.attr("x",margin.left)
.attr("y",function(d) {return scale(d)})
.attr("width",function() {return scaleRect(Math.random());})  
.attr("height",10)
.attr("opacity",0.3)
.attr("fill","steelblue")

container.selectAll("text.log")
	.data(data)
.enter().append("svg:text")
.attr("x",margin.left + 10)
.attr("y",function(d) {return scale(d.date)})
.attr("class","text")
.attr("dy", "-.2em")
.text(function(d) {return d.log})

container.selectAll("text.date")
	.data(data)
.enter().append("svg:text")
.attr("x",margin.left - 40)
.attr("y",function(d) {return scale(d.date)})
.attr("class","subtext")
.attr("dy", "-.3em")
.text(function(d) {return prettyFormat(d.date)})

container.append("g")
	.attr("class", "axis")
    .attr("transform", "translate("+margin.left+",0)")
    .call(yAxis);

container.append("g")
	.attr("class", "axis year")
    .attr("transform", "translate("+margin.left/2+",0)")
    .call(yearAxis);


})