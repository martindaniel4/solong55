d3.csv("solong.csv",function(csv) {

//variables

var h = 10000,
	w = 400,
	margin = {left:80,top:50,bottom:50};

//data wrangling

var formatDate = d3.time.format("%d/%m/%Y");

var data = [];

csv.forEach(function(d, i) {

data.push({
	index: i,
	date : formatDate.parse(d.Date),
	log : d.Action

})


});

var dateMin = new Date("01/01/2010"),
	dateMax = new Date("11/01/2014");

var scale = d3.time.scale().domain([dateMin, dateMax]).range([0,h]);

var yAxis = d3.svg.axis()
    .scale(scale)
    .orient("left");

// Add SVG container

var container = d3.select("body").append("svg")
				  .attr("width",w)
				  .attr("height",h);

container.selectAll("text")
	.data(data)
.enter().append("svg:text")
.attr("x",margin.left)
.attr("y",function(d) {return scale(d.date)})
.attr("class","text")
.text(function(d) {return d.log})

container.append("g")
	.attr("class", "axis")
    .attr("transform", "translate("+margin.left+",0)")
    .call(yAxis);


})