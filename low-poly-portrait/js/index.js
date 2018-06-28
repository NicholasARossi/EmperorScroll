$(document).ready(function(){
  
   var tmax_tl = new TimelineMax({
      delay: 0.25,
      repeat: -1,
      repeatDelay: 2,
      yoyo: true
    }),

    svg_shapes  = $('g > polygon'),
    stagger_val = 0.00475,
    duration    = 1.5,

    stagger_opts_from = {
      css: {opacity: 0, scale: 0, transformOrigin: 'center center'
      },
      ease: Elastic.easeInOut
    },

    stagger_opts_to = {
      css: {opacity: 1, scale: 1
      },
      ease: Elastic.easeInOut
    };

   tmax_tl.staggerFromTo(
      svg_shapes,
      duration,
      stagger_opts_from,
      stagger_opts_to,
      stagger_val,
      0
   );

});