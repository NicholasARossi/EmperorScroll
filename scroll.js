(function() {
      d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };
    var width = window.innerWidth;
    var height = window.innerHeight;



    var svg = d3.select("#viz")
        .append("svg:svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)")
var colorz =["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#f9d057","#f29e2e", "#e76818","#d7191c"];
var colors =["#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f29e2e"];

var x =window.innerWidth/7,
    y = window.innerHeight/2;

var texts = svg.selectAll()
    .data(colors)
    .enter().append("text")
    .attr("x", function(d,i){
        return x+x*i
    })
    .attr("y", y*.65)
    // console.log(d.data1)
    .style('align',function(d,i){
      return "center"})
    .text(function(d,i){
      return classes[i]})
    .style("font-family","ebgaramond")
    .style("font-size",(width/40)+"px")
    .style("fill", function(d,i){
      return "url(#gradient-" + i + ")";
    });




    var radiusScale = d3.scaleSqrt().domain([1, 200]).range([1, 20]);

//     var forceXSplit = d3.forceX(d => width * (d.Sex === "male" ? 0.3 : 0.7))
//         .strength(0.2);
		var forceXSplit = d3.forceX(function(d){return (3/2*x+x*d.data1);}).strength(0.3);
    var forceXCombine = d3.forceX(function(d){ return (3/2*x+x*d.data2);}).strength(0.3);

    var forceCollide = d3.forceCollide(function(d){
          return radiusScale(width / (75)) + 1;
        })
        .iterations(10);

    var simulation = d3.forceSimulation()
        .force("x", forceXCombine)
        .force("y", d3.forceY(height / 2).strength(0.3))
        .force("collide", forceCollide);

//   	var colorchange =d3.select("circles")
// 				.style("fill", d => d.Sex === "male" ? "#355C7D": "#F67280")
//     var colorchange2 =d3.select("circles")
//     		.style("fill", d => d.Sex === "male" ? "#F67280" : "#355C7D")
// Importing data file

d3.queue()
    .defer(d3.csv, "out.csv")
    .await(ready);

function ready (error, datapoints) {
    datapoints.forEach(d => d.Total_Words = +d.Total_Words);

// #355C7D": "#F67280


// var colors = new Array("#8B8386", "#A2627A", "darkturquoise","magenta","#eecd69");


    var circles = svg.selectAll(".Character")
        .data(datapoints)
        .enter().append("circle")
        .attr("class", "Character")

        .attr("r", function(d){
            return radiusScale(width/75)
        })
        // console.log(d.data1)

        .style("fill", function(d){
          return 'white'
        });


// Adding Toggle Switches

    var MNtext=svg.append("text")
              .attr("x", width / 2.5)
              .attr("y", .25*height)
              .text('Parents')
              .style("font-family","Anders")
              .style("font-size",(width/20)+"px")
              .style("font-weight","bold")
              .style("text-align","center")
              .style("fill","slategrey");
    // var Mnstate=svg.append("text")
    //           .attr("x", width / 2+100)
    //           .attr("y", height / 2-75)
    //           .text('Minneapolis, MN')
    //           .style("font-family","Streamster")
    //           .style("font-size","25px")
    //           .style("fill","teal");
    var GAtext=svg.append("text")
              .attr("x", width / 2-3000)
              .attr("y", height *.75)
              .text('Children')
              .style("font-family","Anders")
              .style("font-size",(width/20)+"px")
              .style("font-weight","bold")
              .style("fill","slategrey");
    var atRight = true;

    var rect = svg.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("rx", 22)
        .attr("ry", 22)
        .style("fill", "lightgray")
        .attr("width", 64)
        .attr("height", 40);

    var circle = svg.append("circle")
        .attr("cx", 30)
        .attr("cy", 30)
        .attr("r", 16)
        .style("fill", "white")
//     		.on("click", function(){
//             .style("fill", atRight ? d => d.Sex === "male" ? "#355C7D": "#F67280")
//         });
        .on("click", function(){

//             datapoints
//               	.forEach(d => d.Sex = "male");
					if(atRight) {
          circles
          .style("fill", function(d){
            return "white"
          });
                }
          else{
                     circles
                     .style("fill", function(d){
                       return "white"
                     });
          }
            simulation
                .force("x", atRight ? forceXSplit : forceXCombine)
                .alpha(1)
                .restart();
            setAtRight(!atRight);
        });

    var setAtRight = function(newValue) {
        atRight = newValue;

        MNtext.transition().duration(250)
              .attr("x", (atRight? (width / 2.5):(width / 2+10000)));
        // Mnstate.transition().duration(250)
        //       .attr("x", (atRight? (width / 2+100):(width / 2+10000)));
        GAtext.transition().duration(250)
              .attr("x", (atRight? (width / 2-3000):(width / 2.6)));
        circle.transition().duration(250)
            .attr("cx", (atRight? (30) : (54)))
            .style("fill", "white");
        rect.transition().duration(250)
            .style("fill", atRight? "lightgray" : "magenta");

    };


    var res = {
        'getValue': function() { return atRight; },
        'setValue': setAtRight,
        'remove': function() { circle.remove(); }
    };


    simulation.nodes(datapoints)
        .on('tick', ticked);


    function ticked() {
        circles
            .attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
    }
}
})();






