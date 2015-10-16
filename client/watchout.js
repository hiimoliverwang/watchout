// start slingin' some d3 here.

var width = 960;
var height = 500;

gameBoard = d3.select('.board').append('svg:svg')
                .attr('width', width)
                .attr('height', height);



function update(data) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var enemies = gameBoard.selectAll(".enemy")
      .data(data);
      //console.log(enemies);

  // UPDATE
  // Update old elements as needed.
  enemies.transition().duration(500).
  attr('cx',function (d){return Math.random()*width})
        .attr('cy',function (d){return Math.random()*height});

  //enemy.attr("class", "update");

  // ENTER
  // Create new elements as needed.
// d3.select('svg').append('')

  var enemy = enemies.enter().append("svg:circle")
      .attr("class", "enemy")
      .attr('cx',function (d){return d.cx;})
      .attr('cy',function (d){return d.cy;})
      .attr('r',20)
      .style('fill','url(#image)');
      // .style('color', 'red');
      // .attr("x", function(d, i) { return i * 32; })
      // .attr("dy", ".35em");

  

  // enemy.text('hello');

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  // text.text(function(d) { return d; });

  // EXIT
  // Remove old elements as needed.
  //  text.exit().remove();
}

var createEnemies  = function (number){
      var arr = _.range(number);
      return arr.map(function(i){
        var obj = 
        {
            id : i,
            cx : Math.random()*width,
            cy : Math.random()*height
        };
        return obj;

    });
  };
var enemy = createEnemies(10);
//console.log(enemy);
update(enemy);
var drag = d3.behavior.drag()  
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'black'); });
  var player = gameBoard.append('svg:circle')
                .data([{ x: (width / 2), y: (height / 2), r: 20 }])
                .attr('class', 'player')
                .style('fill','black')
                .attr('cx',function(d){return d.x})
                .attr('cy',function(d){return d.y})
                .attr('r', function(d) { return d.r; })
                .call(drag);
setInterval(update,1000,enemy);


