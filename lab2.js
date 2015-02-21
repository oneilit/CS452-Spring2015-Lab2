//Iver O'Neil
//0288167
//Lab 2
var gl;
var y=0;
var x=0;
var yCoord, xCoord
var colors=[];
var points=[];
var vertices=[
  vec(0,0),vec(.25,.125),vec(.25,-.375),vec(0,-.5),vec(-.25,-.375),vec(-.25,.125),vec(0,.25)
  ];
window.onload = function init()
{
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
//
// Configure WebGL
//
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );
// Load the data into the GPU
var cBuffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

var vColor = gl.getAttribLocation( program, "vColor" );
gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vColor );

var vBuffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );
// Associate our shader variables with our data buffer
yCoord=gl.getUniformLocation(program,"y");
xCoord=gl.getUniformLocation(program,"x");
document.addEventListener('keydown',function(event){
  if (event.keyCode==87){y+=.0125;}
  if (event.keyCode==83){y-=.0125;}
  if (event.keyCode==68){x+=.0125;}
  if (event.keyCode==65){x-=.0125;}
  if (event.keyCode==49){x=0;y=0;}
}, false);
render();
};


function render() {
gl.clear( gl.COLOR_BUFFER_BIT );
gl.uniform1f(yCoord,y);
gl.uniform1f(xCoord,x);
gl.drawArrays(gl.LINE_LOOP,vertices);
}
