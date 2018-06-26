let width = window.innerWidth;
let height = window.innerHeight;
let size_scaler=width

d3.csv("Data/munged_data.csv", function(data) {
  console.log(data[0].reignstart);


//Width and height
var w = 800;
var h = 600;

//Define map projection


var projection = d3.geoMercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
                       .center([ 13, 52 ]) //comment centrer la carte, longitude, latitude
                       .translate([ w/2, h/2 ]) // centrer l'image obtenue dans le svg
                       .scale([ w/1.5 ]); // zoom, plus la valeur est petit plus le zoom est gros

//Define path generator
var path = d3.geoPath()
                 .projection(projection);




if (width>500){
  size_scaler=500;}
var svg = document.getElementsByTagName('svg')[0]

////Load in GeoJSON data
//d3.json("ne_50m_admin_0_countries_simplified.json", function(json) {
//
//    //Bind data and create one path per GeoJSON feature
//    svg.selectAll("path")
//       .data(json.features)
//       .enter()
//       .append("path")
//       .attr("d", path)
//       .attr("stroke", "black")
//       .attr("fill","#fff" )
//       .attr("opacity", 1);
//;
//
//
//});

var nodes = [].concat(
  d3.range(data.length).map(function() { return {type: "b"}; })
);
var body = d3.select('body')
var tooltip = body.append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// tooltip mouseover event handler
var tipMouseover = function(d,i) {

    // var color = d3.interpolate("#ffffff","#FF00FF")(d.state/52);
        var html  = data[i].name+"<br/>"+"<span style='color:" + '#d3d3d3' + ";'>"+ data[i].legacy  + " year Reign</span><br/>";
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr('stroke-width',3)
    tooltip.html(html)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 28) + "px")
      .transition()
        .duration(300) // ms
        .style("opacity", .9) // started as 0!

};
// tooltip mouseout event handler
var tipMouseout = function(d) {
  d3.select(this)
    .transition()
    .duration(300)
    .attr('stroke-width',1)
    tooltip.transition()
        .duration(300) // ms
        .style("opacity", 0); // don't care about position!
};

var node = d3.select("svg")
  .append("g")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
    .attr("r", 10)
    .attr("fill", function(d) { return  "#9C1C29"; })
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);




function ticked0() {

  node
       .transition()
       .ease(d3.easeExpOut)
      .duration(600)
      .attr("cx", function(d) { return 0 })
      .attr("cy", function(d) { return 0 })
      .attr("opacity", "0");

      };

function ticked1() {

node
  .transition()
  .ease(d3.easeExpOut)
  .duration(600)
//      .delay((d, i) => 100 * i)
  .attr("opacity", "1")
  .attr("r", 10)
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });
  };

function ticked2() {

node
  .transition()
  .ease(d3.easeExpOut)
  .duration(600)
  .attr("r", function(d,i) { return +data[i].legacy; })
  .attr("opacity", 0.5);


  };


var simulation = d3.forceSimulation(nodes)
////// Functions to animate

let naught = () =>{
    var simulation = d3.forceSimulation(nodes)

    .force("collide", d3.forceCollide().strength(1).radius(12.5).iterations(1))
    .force("r", d3.forceRadial(function(d) { return 200; }))
    .on("tick", ticked0);
}


let ready = () =>{
var simulation = d3.forceSimulation(nodes)
    .on("tick", ticked1);


}


let gro = () =>{
var simulation = d3.forceSimulation(nodes)
       .on("tick", ticked2);


//        .force("charge", d3.forceCollide().radius(function(d,i) { return  +data[i].legacy+2;}))
//
      }


//waypoints scroll constructor
function scroll(n, offset, func1, func2){
  return new Waypoint({
    element: document.getElementById(n),
    handler: function(direction) {
       direction == 'down' ? func1() : func2();
    },
    //start 75% from the top of the div
    offset: offset
  });
};



//triger these functions on page scroll
new scroll('div1', '75%', ready, naught);
new scroll('div2', '75%', gro, ready);
new scroll('div3', '75%', ready, gro);




//start grid on page load
naught();
});