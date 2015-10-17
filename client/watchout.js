// start slingin' some d3 here.

var width = 960;
var height = 500;
var numEnemies = 10;
var imgSize = 30;
var radius = 20;
var countCollisions = 0;
var currentScore = 0;
var highScore = 0;
var moveTime = 3000;
var moveSpeed = 1500;


gameBoard = d3.select('.board').append('svg:svg')
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'boarder');




function update(data) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var enemies = gameBoard.selectAll(".enemy")
      .data(data);

  

  var isCollision = function (){
    for (var k = 0; k < numEnemies; k++){
      var distX = Math.abs(enemies[0][k].x.animVal.value - player.attr('cx'));
      var distY = Math.abs(enemies[0][k].y.animVal.value - player.attr('cy'));
      var dist = Math.sqrt(distX * distX + distY * distY) ;
      //console.log(dist);
      if (dist  < (imgSize + radius)){
        highScore = Math.max(highScore,currentScore);
        currentScore = 0;
        countCollisions++;
      } else {
        currentScore+=.01;
      }
      d3.select('.highscore').text('High score: ' + Math.floor(highScore));
      d3.select('.current').text('Current score: ' + Math.floor(currentScore));
      d3.select('.collisions').text('Collisions: ' + Math.floor(countCollisions/10));

    }
    
  };

var timer = setInterval(isCollision,10)
setTimeout(function (){
  clearInterval(timer);
},moveTime)
  // var timer = setInterval(isCollision,10);
  // setTimeout(function (){clearInterval(timer);},moveTime);

 
  


  // ENTER
  // Create new elements as needed.
  var enemy = enemies.enter().append("svg:image")
      .attr("class", "enemy")
      .attr('x',function (d){return d.x;})
      .attr('y',function (d){return d.y;})
      .attr('width', imgSize)
      .attr('height', imgSize)
      .attr('xlink:href', 'asteroid.png');

  enemies.transition().duration(moveSpeed)
   // .tween('custom', tracker)
    .attr('x',function (d){return Math.random()*width})
    .attr('y',function (d){return Math.random()*height})
    .attr('width', imgSize)
    .attr('height', imgSize)
    .attr('xlink:href', 'asteroid.png');


  

}

function Enemy (i){
  this.id = i;
  this.x = Math.random()*width;
  this.y = Math.random()*height;
}


var createEnemies  = function (number){
      var arr = _.range(number);
      return arr.map(function(i){
        return new Enemy(i);
    });
  };

var enemy = createEnemies(numEnemies);

// update(enemy);

var drag = d3.behavior.drag()  
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'black'); });
var player = gameBoard.append('svg:circle')
                .data([{ x: (width / 2), y: (height / 2), r: radius }])
                .attr('class', 'player')
                .style('fill','black')
                .attr('cx',function(d){return d.x})
                .attr('cy',function(d){return d.y})
                .attr('r', function(d) { return d.r; })
                .call(drag);


  
update(enemy);
setInterval(update,moveTime,enemy);
  // UPDATE
  // Update old elements as needed.

