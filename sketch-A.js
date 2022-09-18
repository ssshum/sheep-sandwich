// SecurityLetters A
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var letter = 'A';
var font;
var fontSize;
var div;

var totalFrames = 120;
var canvas;

var textImg;

function preload() {
  font = loadFont('fonts/OpenSans-SemiBold.ttf');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch');

  frameRate(24);

  letterImg = createGraphics(width, height);
  letterImg.pixelDensity(1);
  letterImg.background(255);
  letterImg.textFont(font);
  letterImg.textAlign(CENTER, CENTER);

  if (windowWidth > windowHeight) {
    letterImg.textSize(windowHeight);
  } else {
    letterImg.textSize(windowWidth);
  }

  letterImg.text(letter, windowWidth/2, windowHeight/3);
  letterImg.loadPixels();
}

function draw() {
  var percent = 0;
  percent = float(frameCount % totalFrames) / float (totalFrames);
  render(percent);
}

function render(percent) {
  smooth();
  background(255, 255, 255);
  stroke(0,0,0);

  div = 20;

  for (var x = 0; x < letterImg.width + div; x += div) {
    for (var y = 0; y < letterImg.height + div; y += div) {
      var index = (x + y * letterImg.width) * 4;
      var r = letterImg.pixels[index];

      if (r < 128) { //insideLetter

        strokeWeight(2);
        noFill();

        // var angle = map(sin(percent*TWO_PI + x + cos(x-y)), -1, 1, PI, 2*PI);
        // arc(x, y, div*2, div*2, 0.01*PI, angle);

        var angle = map(sin(percent*TWO_PI), -1, 1, PI, 2*PI);
        arc(x, y, div*2, div*2, 0.01*PI, angle);

        // var grow = map (sin(percent*TWO_PI), -1, 1, div*2, div*4)
        // ellipse(x, y, grow, div*2);

      }
      else { //outsideLetter

        noFill();
        strokeWeight(2);

        ellipse(x, y, div*2, div*2);

      }
    }
    
  }

}