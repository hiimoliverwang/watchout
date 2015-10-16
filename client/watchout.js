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

  // UPDATE
  // Update old elements as needed.
  //text.attr("class", "update");

  // ENTER
  // Create new elements as needed.
  var enemy = enemies.enter().append("svg:circle")
      .attr("class", "enemy")
      .attr('cx',100)
      .attr('cy',100)
      .attr('r',50);
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

update([0]);
// var createEnemies  = function (){

//       return [0,1,2].map(function(i){
//       id: i
//       x: Math.random()*100
//       y: Math.random()*100
//     });
//   };

// var enemies = function (enemy_data){
//             gameBoard.selectAll('circle.enemy')
//             .data(enemy_data, function (d){return d.id} )
//           };


// var enemy = createEnemies;
