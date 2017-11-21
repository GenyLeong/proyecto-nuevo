$(document).ready(function() {
  "use strict";

  var altura = window.innerHeight;
  var intro_altura = document.getElementById('particles-js')
  intro_altura.style.height = altura + 'px';

  $('.smooth').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1100);
        return false;
      }
    }
  });

  /* ---- particles.js config ---- */

particlesJS.load('particles-js', './static/js/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });


    $(".hk-nav-item").on("click", function(){
      $(".hk-nav-item").removeClass("active");
      $(this).addClass("active");
    })

    var height = 500;

    var svg = d3.select("#graphic").append("svg")
        .attr("width", altura)
        .attr("height", height);
    d3.csv("../static/documentos/encuesta.csv", function(d){

        var r = d3.scale.linear()
        .domain([0, d3.max(d, function(d) { return parseFloat(d.Porcentaje); })])
        .range([40, 300]);

        svg.selectAll("rect")
            .data(d)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {return i*50;})
            .attr("y", 500)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", function(d){ return d3.rgb(d.Color).darker();})
            .transition()
                .duration(1000)
                .delay(function(d, i){return i * 200;})
                .ease("linear")
                .attr("y", function(d) { return 500 - r(d.Porcentaje); })
                .attr("height", function(d) { return r(d.Porcentaje); })
                .attr("fill", function(d){ return d3.rgb(d.Color); });

        svg.selectAll(".partido")
            .data(d)
            .enter()
            .append("text")
            .attr("class","partido")
            .text(function(d){return d.Partido;})
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", function(d, i) {return "translate("+((i*50)+26)+",95) rotate(-90)";});
        });



})

// $(window).resize(function() {
//   var altura = window.innerHeight;
//   var intro_altura = document.getElementById('intro')
//   intro_altura.style.height = altura + 'px';
//   console.log('resize fondo')
// });
