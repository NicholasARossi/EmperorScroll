# Scrollytelling the Lives of Roman Emperors

## Intro
![gif](art/romegif.gif)
This was my first project with an interactive scrollytelling experience. As such, the code is leaves much to be desired.

## Using D3.js to scrollytell
The foundation of this code is scrollytelling.html which calls romanglory.js from the javascript folder. This file uses d3.js v4 to conduct all of the animations. The key elements of this code are the functions:

```javascript
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
new scroll('div1', '25%', ready, naught);
new scroll('div2', '50%', mapped, ready);
```
Which sets up the how you transition between the various divs in scrollytelling.html. This code was based off the block which can be found [here](https://bl.ocks.org/baronwatts/2a50ae537d7c46670aa5eb30254ef751)

