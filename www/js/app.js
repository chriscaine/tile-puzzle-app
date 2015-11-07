// TILE OBJECT


var Tile = function (Index, Col, Row) {
    this.index = Index;
    this.column = Col;
    this.row = Row;
    this.imageOffsetX = Col * this.tileSize * -1;
    this.imageOffsetY = Row * this.tileSize * -1;

    this.draw = function () {
        var container = $('<div />').attr('id', 'tile-' + this.index).addClass('tile')
                    .css('top', (this.row * this.tileSize).toString() + 'px')
                    .css('left', (this.column * this.tileSize).toString() + 'px')
                 //   .attr('background-image', 'url(' +  this.imageURL + ')')
                    .css('background-position', this.imageOffsetY + 'px ' + this.imageOffsetX + 'px')
		             .click(function () { move(this); })
                    .appendTo('#puzzle-wrapper');
       
                   
       
   // alert(this.imageOffsetY.toString() + 'px');
 }
    this.movePiece = function (emptyTile) {
        var newTop = emptyTile.row * this.tileSize;
        var newLeft = emptyTile.column * this.tileSize;
        $('#tile-' + this.index).animate({ 'top': newTop + 'px' }, this.animationSpeed)
                           .animate({ 'left': newLeft + 'px' }, this.animationSpeed);
        this.row = emptyTile.row;
        this.column = emptyTile.column;
    }


}

Tile.prototype.animationSpeed = 200;
Tile.prototype.tileSize = 70;
Tile.prototype.imageURL = 'images/example.jpg';
Tile.prototype.puzzleWrapper = '#puzzle-wrapper';




// CREATE GLOBAL VARIABLES
var tiles = new Array;
var emptyTile = new Tile(-1, 0, 0);
var numMoves = 0;
//SETUP
window.onload = initialise;

function initialise() {
    createTiles();
    drawPuzzle();
    drawOtherImages();
}

function createTiles() {
  //  alert('createTiles fired');
    var col = 1; // Offset for empty tile in top corner
    var row = 0;

    for (var i = 0; i < 15; i++) {
        tiles.push(new Tile(i, col, row));
        $('#debug').append(tiles[i].column + "<br />");
        col++;
        if (col > 3) { col = 0; row++; }
    }
}

function drawPuzzle() {
    var col = 1;
    var row = 0;
    tiles.sort(function () { return 0.5 - Math.random() });
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].column = col;
        tiles[i].row = row;
        col++
        if (col > 3) { col = 0; row++; }
        tiles[i].draw(); 
       
    }
}

function move(evt) {
  //  alert(emptyTile.column + " " + emptyTile.row);
    var itemIndex = $(evt).attr('id');
    var arrayIndex = getIndex(itemIndex);
    var newEmptyCol = tiles[arrayIndex].column;
    var newEmptyRow = tiles[arrayIndex].row;

    if (emptyTile.column == newEmptyCol + 1 && emptyTile.row == newEmptyRow) {
        movePiece(arrayIndex, emptyTile, newEmptyCol, newEmptyRow);
        
    } else if (emptyTile.column == newEmptyCol - 1 && emptyTile.row == newEmptyRow) {
        movePiece(arrayIndex, emptyTile, newEmptyCol, newEmptyRow);
    }
    else if (emptyTile.row == newEmptyRow + 1 && emptyTile.column == newEmptyCol) {
        movePiece(arrayIndex, emptyTile, newEmptyCol, newEmptyRow);
    }
    else if (emptyTile.row == newEmptyRow - 1 && emptyTile.column == newEmptyCol) {
        movePiece(arrayIndex, emptyTile, newEmptyCol, newEmptyRow);
    }
    else {  }  
}

function movePiece(arrayIndex, emptyTile, newEmptyCol, newEmptyRow) {

    tiles[arrayIndex].movePiece(emptyTile);
    emptyTile.column = newEmptyCol;
    emptyTile.row = newEmptyRow;
    numMoves++;
    $('#moves').text(numMoves.toString());
}


function getIndex(search) {
    var id = search.split('-')[1];
    for (var i = 0; tiles.length; i++) {
        if (tiles[i].index == id) return i;
    }
}


// OTHER USEFUL BITS

function drawOtherImages() {
    var images = new Array('images/bee.jpg', 'images/bee2.jpg', 'images/rose.jpg', 'images/example.jpg');

    for (var i = 0; i < images.length; i++) {
        $('<img />').attr('src', images[i]).click(function() { changeImage(this); }).appendTo('#images');
    }
}

function changeImage(evt) {
    //alert(newImage);
    $('.tile-img').each(function() {$(this).attr('src', $(evt).attr('src'));});

}