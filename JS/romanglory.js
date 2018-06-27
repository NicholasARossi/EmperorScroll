

d3.csv("Data/munged_data.csv", function(data) {
  console.log(data[0].reignstart);


let width = window.innerWidth;
let height = window.innerHeight;
let size_scaler=width;
//Define map projection






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
var tipMouseover2 = function(d,i) {
let colors =["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#f9d057","#f29e2e", "#e76818","#d7191c"];

    // var color = d3.interpolate("#ffffff","#FF00FF")(d.state/52);
        var html  = data[i].name+"<br/>"+"<span style='color:" + colors[+data[i].causenums] + ";'>"+ data[i].cause  + "</span><br/>";
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
  .on("mouseover", tipMouseover)
  .transition()
  .ease(d3.easeExpOut)
  .duration(600)
//      .delay((d, i) => 100 * i)
  .attr("opacity", "1")
  .attr("r", 10)
  .attr("fill", function(d) { return  "#9C1C29"; })
  .attr("stroke","none")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });
  };

function ticked2() {

node
  .on("mouseover", tipMouseover)
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

///// GRID Cluster

let spacing = size_scaler/20;
let rows = 10;
let column = 10;

let cluster = () =>{
    var simulation = d3.forceSimulation(nodes)
           .on("tick", row_cluster);

      }
function row_cluster() {
let spacing = size_scaler/13;
let rows = 10;
let column = 10;
//let colors =["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#f9d057","#f29e2e", "#e76818","#d7191c"];

let colors =['#fff','#9c1c29','darkgrey','#a85350','slategrey','#ad7f7b','#a9a9a9'];
svg2.selectAll("path")
  .attr("opacity",0);
node
  .on("mouseover", tipMouseover2)
  .transition()
  .ease(d3.easeExpOut)
  .duration(600)
    .attr("stroke","none")
    .attr("r", 10)
    .attr("cx", (d, i) => i % column * spacing-size_scaler/2.9)
    .attr("cy", (d, i) => Math.floor(i / 10) % rows * spacing-size_scaler/4)
    .attr("fill", function(d,i) { return colors[+data[i].causenums]; })
    .attr("opacity", "1")


  };

////// PLOTTING MAP SECTION OF THE FIGURES
//Width and height
var w = size_scaler;
var h = height;

var projection = d3.geoMercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
                       .center([ 13, 40 ]) //comment centrer la carte, longitude, latitude
                       .translate([ 0, 0 ]) // centrer l'image obtenue dans le svg
                       .scale([ w ]); // zoom, plus la valeur est petit plus le zoom est gros


d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

//Create SVG
var svg2 =  d3.select("svg");

//Define path generator
var path = d3.geoPath()
                 .projection(projection);

//Load in GeoJSON data
var map
d3.json("custom.geo2.json", function(json) {

    //Bind data and create one path per GeoJSON feature
    var map=svg2.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "black")
       .attr("fill","#9C1C29" )
       .attr("opacity",0);

    map.moveToBack()
});


let mapped = () =>{
    var simulation = d3.forceSimulation(nodes)
           .on("tick", map_proj);

      }

function map_proj() {

node
  .transition()
  .ease(d3.easeExpOut)
  .duration(600)
  .attr("fill","#fff")
  .attr("stroke","#000")
   .attr("r", 5)

.attr("cx", function(d,i) {return projection([data[i].logitude, data[i].latitude])[0];})
.attr("cy", function(d,i) {return projection([data[i].logitude, data[i].latitude])[1];});
svg2.selectAll("path")
  .attr("opacity",.57);

  };

///// RISE SECTION




let rise = () =>{
    var simulation = d3.forceSimulation(nodes)
           .on("tick", rise_cluster);

      }
function rise_cluster() {

//let colors =["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#f9d057","#f29e2e", "#e76818","#d7191c"];
let countvect=[0,0,0,0,0,0,0,0,0,0,0]
let colors =['#fff','#9c1c29','darkgrey','#a85350','slategrey','#ad7f7b','#a9a9a9'];
svg2.selectAll("path")
  .attr("opacity",0);
node
  .on("mouseover", tipMouseover2)
  .transition()
  .ease(d3.easeExpOut)
  .duration(600)
    .attr("stroke","none")
    .attr("r", 10)
    .attr("cx", function(d, i) { countvect[+data[i].risenums+3] +=1; return countvect[+data[i].risenums+3]%11*30-size_scaler/2.9})
    .attr("cy", function(d, i) { return +data[i].risenums*30-size_scaler/4})
    .attr("fill", function(d,i) { return colors[Math.max(0,+data[i].risenums)]; })
    .attr("opacity", "1");


  };

////////// BUILDING SCROLLYTELLING FRAMEWORK


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
new scroll('div4', '75%', cluster, ready);
new scroll('div5', '75%', mapped, cluster);
new scroll('div6', '75%', rise, mapped);




//start grid on page load
naught();
});