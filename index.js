function Point(x,y){
  this.x = x
  this.y = y
}
Point.prototype.toString = function () {
  return `(${this.x}, ${this.y})`
}

function Shape() {
  this.position = null
}
Shape.prototype.addToPlane = function (x,y) {
  this.position = new Point(x,y)
}
Shape.prototype.move = function (x,y) {
  this.position = new Point(x,y)
}

function Circle(r) {
  Shape.call(this)
  this.radius = r
}
Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.diameter = function () {
  return this.radius*2
}
Circle.prototype.area = function () {
  return this.radius*this.radius*Math.PI
}
Circle.prototype.circumference = function () {
  return this.radius*Math.PI*2
}

function Side(length){
  this.length = length
}

function Polygon(side_array){
  this.sides = side_array
}
Polygon.prototype = Object.create(Shape.prototype)
Polygon.prototype.perimeter = function () {
  return this.sides.reduce(function(total, side){
    return total + side.length
  },0)
}
Polygon.prototype.numberOfSides = function () {
  return this.sides.length
}

function Quadrilateral(a,b,c,d) {
  var arr = [a,b,c,d].map(function(len){
    return new Side(len)
  })
  Polygon.call(this, arr)
}
Quadrilateral.prototype = Object.create(Polygon.prototype)

function Triangle(a,b,c) {
  var arr = [a,b,c].map(function(len){
    return new Side(len)
  })
  Polygon.call(this, arr)
}
Triangle.prototype = Object.create(Polygon.prototype)

function Rectangle(width, height) {
  this.width = width
  this.height = height
  Quadrilateral.call(this, width, height, width, height)
}
Rectangle.prototype = Object.create(Quadrilateral.prototype)
Rectangle.prototype.area = function () {
  return this.height*this.width
}

function Square(length) {
  this.length = length
  Rectangle.call(this, length, length)
}
Square.prototype = Object.create(Rectangle.prototype)
Square.prototype.listProperties = function () {
  for (var prop in this) {
    if(this.hasOwnProperty(prop)) {
      return prop + " = " + this[prop];
    }
  }
}

// ci = new Circle(3)
//
// sh = new Shape
// sh.addToPlane(3,4)
// sh.move(4,5)
