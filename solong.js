
d3.csv("events.csv",function(events) {

d3.csv("arrivees.csv",function(arrivees) {

d3.csv("solong.csv",function(csv) {

//variables

var h = 23660,
	w = 750,
	margin = {left:200,top:50,bottom:50,interval:80};

//data wrangling

var formatDate = d3.time.format("%d/%m/%Y"),
	formatDayDate = d3.time.format("%d%m%Y"),
	prettyFormat = d3.time.format("%b. %d");

var data = [],
	nifties = [],
	dates = [];

csv.forEach(function(d, i) {

data.push({
	index: i,
	date : formatDate.parse(d.Date),
	log : d.Action

})


});

arrivees.forEach(function(d, i) {

nifties.push({
	index: i,
	date : formatDate.parse(d.date),
	log : d.log

})


});

events.forEach(function(d, i) {

dates.push({
	index: i,
	date : formatDate.parse(d.dates),
	number : d.events

})


});


var dateMin = new Date("08/01/2009"),
	dateMax = new Date("11/01/2014");

var scale = d3.time.scale().domain([dateMin, dateMax]).range([0,h]),
	scaleRect = d3.scale.linear().domain([0,12]).range([0,margin.interval*0.6]);

var yAxis = d3.svg.axis()
    .scale(scale)
    .orient("left")
    .tickFormat(d3.time.format("%b. %Y"))
    .ticks(30);

var yearAxis = d3.svg.axis()
    .scale(scale)
    .orient("left")
    .tickFormat(d3.time.format("%Y"));

// Add SVG container

var container = d3.select("body").append("svg")
				  .attr("width",w)
				  .attr("height",h);


container.selectAll("rect.day")
	.data(scale.ticks(d3.time.days, 1))
.enter().append("svg:rect")
.attr("x",margin.left)
.attr("y",function(d) {return scale(d)})
.attr("width",1.5)  
.attr("height",5)
.attr("opacity",0.3)
.attr("id",function(d) {return formatDayDate(d);})
.attr("fill","grey")

container.selectAll("rect.event")
	.data(dates)
.enter().append("svg:rect")
.attr("x",margin.left)
.attr("y",function(d) {return scale(d.date);})
.attr("width",function(d) {return scaleRect(d.number);})  
.attr("height",10)
.attr("opacity",1)
.attr("fill","lightblue")

container.selectAll("text.log")
	.data(data)
.enter().append("svg:text")
.attr("x",margin.left + margin.interval/2)
.attr("y",function(d) {return scale(d.date)})
.attr("style","font: 14px sans-serif;")
.attr("dy", "-.2em")
.text(function(d) {return d.log})

container.selectAll("text.nifties")
	.data(nifties)
.enter().append("svg:text")
.attr("x",margin.left + margin.interval/2)
.attr("y",function(d) {return scale(d.date)})
.attr("class","text")
.attr("dy", "-.2em")
.text(function(d) {return d.log})

container.selectAll("text.date")
	.data(data)
.enter().append("svg:text")
.attr("x",margin.left - 50)
.attr("y",function(d) {return scale(d.date)})
.attr("class","subtext")
.attr("dy", "-.3em")
.text(function(d) {return prettyFormat(d.date)})

container.selectAll("text.niftiesdate")
	.data(nifties)
.enter().append("svg:text")
.attr("x",margin.left - 50)
.attr("y",function(d) {return scale(d.date)})
.attr("class","subtext")
.attr("dy", "-.3em")
.text(function(d) {return prettyFormat(d.date)})

container.append("g")
	.attr("class", "axis")
	//.attr("style","font-size:20px;")
	//.attr("style","font-weight:bold;")
	.attr("style","font: 20px sans-serif;")
    .attr("transform", "translate("+margin.left/1.5+",0)")
    .call(yAxis);

/*container.append("g")
	.attr("class", "year")
    .attr("transform", "translate("+margin.left/3+",0)")
    .call(yearAxis);*/


$(document).ready(function() { 
	console.log("ready");
    var anchorurl = window.location.hash.replace('#', '');
    var elem = $('#' + anchorurl);

    console.log(anchorurl);

    if(anchorurl != "") {
    	console.log("exist");
         $("body").scrollTo(elem);
    }
});


})

})

});