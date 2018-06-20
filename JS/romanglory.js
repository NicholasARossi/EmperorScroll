let width = window.innerWidth;
let height = window.innerHeight;
let size_scaler=width

d3.csv("Data/emperors.csv", function(data) {
  console.log(data[0].reignstart);


if (width>500){
  size_scaler=500;}
var svg = document.getElementsByTagName('svg')[0]
var nodes = [].concat(
  d3.range(data.length).map(function() { return {type: "b"}; })
);
var t0 = Date.now();

var node = d3.select("svg")
  .append("g")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
    .attr("r", 10)
    .attr("fill", function(d) { return d.type === "a" ? "#626060" : "#9C1C29"; })





function ticked0() {

  node
      .attr("cx", function(d) { return 0 })
      .attr("cy", function(d) { return 0 })
      .attr("opacity", "0");

      };



    function ticked1() {

  node
      .transition()
      .ease(d3.easeExpOut)
      .duration(600)
      .delay((d, i) => 100 * i)
      .attr("opacity", "1")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
      };


    <!--function ticked2() {-->
  <!--d3.timer(function () {-->
  <!--var delta = Date.now() - t0;-->
  <!--node-->
      <!--.attr("cx", function(d) { return d.x; })-->
      <!--.attr("cy", function(d) { return d.y; });-->
      <!--&lt;!&ndash;.attr('transform', function (d) {return 'rotate('+0.001*delta+')'});&ndash;&gt;-->
  <!--});-->
<!--}-->


let naught = () =>{
      var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceCollide().radius(12.5))
    .force("r", d3.forceRadial(function(d) { return d.type === "a" ? 100 : 200; }))
    .on("tick", ticked0)
}


let ready = () =>{
  d3.forceSimulation(nodes).on("tick", ticked1)
}



let go = () =>{
  d3.forceSimulation(nodes).on("tick", ticked2)
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
new scroll('div2', '75%', go, naught);




//start grid on page load
naught();
});