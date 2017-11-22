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

    /*grafico*/
function graphic(){
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#graphic").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../static/documentos/encuesta.csv", function(error, data) {

        data.forEach(function(d) {
            d.Partido = d.Partido;
            d.Porcentaje = +d.Porcentaje;
        });

      var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
      var y = d3.scale.linear().domain([0, d3.max(data, function(d) { return parseFloat(d.Porcentaje); })]).range([20, height]);

      x.domain(data.map(function(d) { return d.Partido; }));
      y.domain([0, d3.max(data, function(d) { return d.Porcentaje; })]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")

      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.Texto + ".</span>";
          })
          svg.call(tip);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(10," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "2em")
          .attr("dy", "-.55em")
          .attr("transform", "translate(15, 20)" );

      // svg.append("g")
      //     .attr("class", "y axis")
      //     .call(yAxis)
      //   .append("text")
      //     .attr("transform", "rotate(-90)")
      //     .attr("y", 6)
      //     .attr("dy", ".71em")
      //     .style("text-anchor", "end")
      //     .text("Value ($)");

      svg.selectAll("bar")
          .data(data)
        .enter().append("rect")
          .style("fill", "steelblue")
          .attr("x", function(d) { return x(d.Partido) + 10; })
          .attr("width", x.rangeBand())
          .attr("y", height)
          .attr("height", 0)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .transition()
          .duration(1000)
          .delay(function(d, i){return i * 200;})
          .ease("linear")
          .attr("y", function(d) { return height - y(d.Porcentaje); })
          .attr("height", function(d) { return y(d.Porcentaje); })
          // .attr("fill", function(d){ return d3.rgb(d.Color); })
    });
}

    // function graphic(){
    //
    //   var margin = {top: 20, right: 20, bottom: 70, left: 40};
    //   var width = altura/2;
    //   var height = 510;
    //
    //   var svg = d3.select("#graphic").append("svg")
    //   .attr("width", width)
    //   .attr("height", height);
    //
    //   // var	parseDate = d3.time.format("%Y-%m").parse;
    //   var x = d3.scale.ordinal().rangeRoundBands([0, height], .5, .5);
    //   var xAxis = d3.svg.axis()
    //     .scale(x)
    //     .ticks(8)
    //     .orient("bottom");
    //
    //   d3.csv("../static/documentos/encuesta.csv", function(d){
    //
    //     x.domain(d.map(function(d) { return d.Partido; }));
    //
    // svg.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(10,490)")
    //   .call(xAxis)
    // .selectAll("text")
    //   .style("text-anchor", "middle")
    //   .attr("dx", "10px")
    //   .attr("dy", "4")
    //   .attr("transform", "translate(-30,0)");
    //
    //     var tip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10, 0])
    //     .html(function(d) {
    //       return "<strong>Frequency:</strong> <span style='color:red'>" + d.Texto + ".</span>";
    //     })
    //     svg.call(tip);
    //
    //     var r = d3.scale.linear()
    //     .domain([0, d3.max(d, function(d) { return parseFloat(d.Porcentaje); })])
    //     .range([10, 500]);
    //
    //     svg.selectAll("rect")
    //     .data(d)
    //     .enter()
    //     .append("rect")
    //     .attr("x", function(d, i) {return i*80 +10;})
    //     .attr("y", 490)
    //     .attr("width", 70)
    //     .attr("height", 0)
    //     .on('mouseover', tip.show)
    //     .on('mouseout', tip.hide)
    //     .attr("fill", function(d){ return d3.rgb(d.Color).darker();})
    //     .transition()
    //     .duration(1000)
    //     .delay(function(d, i){return i * 200;})
    //     .ease("linear")
    //     .attr("y", function(d) { return 490 - r(d.Porcentaje); })
    //     .attr("height", function(d) { return r(d.Porcentaje); })
    //     .attr("fill", function(d){ return d3.rgb(d.Color); })
    //
    //   });
    //
    // }


    var controller = new ScrollMagic.Controller(),
        scene_1,
        scene_2;

  scene_1 = new ScrollMagic.Scene({
    triggerElement: '#about',
    triggerHook: 0.7
  })
  .addIndicators()
  .addTo(controller)

  scene_1.on("progress", function(event) {
        $(".about").toggleClass("clicked")
    })
    .addTo(controller)


  scene_2 = new ScrollMagic.Scene({
                triggerElement: '#graphic-container',
                duration: 300,
                triggerHook: 0.5,
                reverse:false
              })
              .setPin("#graphic-container")
              .addIndicators()
              .addTo(controller)

  scene_2.on("enter", graphic)
    .addTo(controller);


})

// $(window).resize(function() {
//   var altura = window.innerHeight;
//   var intro_altura = document.getElementById('intro')
//   intro_altura.style.height = altura + 'px';
//   console.log('resize fondo')
// });
