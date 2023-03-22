var start = document.querySelector("#start");
var backgrounds = document.querySelectorAll(".background");
var workname = document.querySelector("#workname");
var widthInput = document.querySelector("#widthInput");
var heightInput = document.querySelector("#heightInput");
var wrap = document.querySelector(".wrap");
var wrap2 = document.querySelector(".wrap2");
var bgColor = "#fbf6ed";
var boardWidth, boardHeight;
var mode = "white";

start.onclick = function(){

  if (workname.value.trim() == "") {                                            // Checking input values if it's valid or not
    workname.value = "";
    workname.focus();
  }else if ((widthInput.value.trim() == "") || (widthInput.value>120) || (widthInput.value<30) || (Number.isInteger(Number(widthInput.value.trim()))==false) ) {
    widthInput.value = "";
    widthInput.focus();
  }else if ((heightInput.value.trim() == "") || (heightInput.value>60) || (heightInput.value<20) || (Number.isInteger(Number(heightInput.value.trim()))==false) ) {
    heightInput.value = "";
    heightInput.focus();
  }else{

    wrap.classList.add("fade");
    wrap2.classList.remove("fade");

    if (document.querySelector(".active").getAttribute("data-c") == "custom") {
      mode = "custom";
      bgColor = document.getElementById("ccp").value;
    }else if(document.querySelector(".active").getAttribute("data-c") == "#fbf6ed"){
      mode = "white";                                                                     // if inputs are ok, animate wraps and set the bg color and create the board
      bgColor = document.querySelector(".active").getAttribute("data-c");
    }else{
      mode = "dark";
      bgColor = document.querySelector(".active").getAttribute("data-c");
    }

    boardWidth = Number(widthInput.value);
    boardHeight = Number(heightInput.value);
    createBoard(boardWidth,boardHeight);

  }

}



for (var i = 0; i < backgrounds.length; i++) {
  backgrounds[i].onclick = function(){
    backgrounds[0].classList.remove("active");
    backgrounds[1].classList.remove("active");                                  // background selecting toggle
    backgrounds[2].classList.remove("active");
    this.classList.add("active");
  };
}






//----------------------------------------------------------------
//----------------------------------------------------------------

var board = document.querySelector(".board");
var isDrag = false;
var border = "1px solid #dadada";

function createBoard(width, height) {
  var sqCnt = width * height;
  board.style.cursor = "url('pen.png'), auto";

  for (var i = 0; i < sqCnt; i++) {
    var pixel = document.createElement("div");
    pixel.className = "pixel";
    board.style.background = bgColor;                                           // creating each pixel and giving attributes, and editing board div
    if (mode == "dark") {
      pixel.style.border = "1px solid #262626";
      border = "1px solid #262626";
    }
    board.appendChild(pixel);
    pixel.draggable = false;
    pixel.onclick = function(){this.style.background = activeColor;}
  }
  board.style.maxWidth = ((10 * width) + 30) + "px";
}




board.onmousedown = function(){isDrag = true;}
board.onmousemove = function(e){ if ((isDrag == true) && (e.target.className == "pixel")) {e.target.style.background = activeColor;}}
board.onmouseup = function(){isDrag = false;}                         // drawing pixels functions, only works on board
board.onmouseleave = function(){isDrag = false;}








//----------------------------------------------------------------
//----------------------------------------------------------------

var colorInput = document.getElementById("color");
var activeColor = "#ff5b5b";
var tools = document.querySelector(".tools");
var pen = document.querySelector(".pen");
var erase = document.querySelector(".erase");


function setColor(){
  if (document.querySelector(".activeTool").classList.contains("pen")) {
    activeColor = colorInput.value;                                             // color input's oninput function
  }
}

function changeTool(ths){
  pen.classList.remove("activeTool");
  erase.classList.remove("activeTool");
  ths.classList.add("activeTool");
  if (ths.classList.contains("pen")) {
    board.style.cursor = "url('pen.png'), auto";                                // pen and erase toggle
    activeColor = colorInput.value;
  }else {
    board.style.cursor = "url('eraser.png'), auto";
    activeColor = bgColor;
  }
}



function fill(){
  var pixels = document.querySelectorAll(".pixel");
  for (var i = 0; i < pixels.length; i++) {                                     // filling the board with activeColor
    pixels[i].style.background = colorInput.value;
  }
}

function clearBoard(){
  var pixels = document.querySelectorAll(".pixel");
  for (var i = 0; i < pixels.length; i++) {                                     // clearing the board with bgColor
    pixels[i].style.background = bgColor;
  }
}

function downloadPixelArt(){

  var bWidth = board.clientWidth - 30, bHeight = board.clientHeight - 24;
  board.style.padding = "0";
  board.style.width = bWidth + "px";
  board.style.height = bHeight + "px";
  var container = board; /* the element which i want to convert(take scshot) */

  var pixels = document.querySelectorAll(".pixel");
  for (var i = 0; i < pixels.length; i++) {
    pixels[i].style.border = "none";
  }
  html2canvas(container, { backgroundColor: bgColor }).then(function (canvas) {

  var link = document.createElement("a");                                       // first cropping the board div, and deleting pixels' border. And screenshot with html2canvas(library)
  document.body.appendChild(link);                                              // then it will be downloaded with the name we texted at first window. And setting board/pixels as default.
  link.download =  document.getElementById("workname").value + '.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});


for (var i = 0; i < pixels.length; i++) {
  pixels[i].style.border = border;
}

var bWidth = board.clientWidth + 30, bHeight = board.clientHeight + 24;
board.style.padding = "12px 12px";
board.style.width = bWidth + "px";
board.style.height = bHeight + "px";

}
