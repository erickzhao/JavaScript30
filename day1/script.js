window.onload = init;
var context;
var bufferLoader;

/*************************************************************************************
    BufferLoader class taken from
    https://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
*************************************************************************************/

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(request.response,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;

                if (++loader.loadCount == loader.urlList.length){
                    loader.onload(loader.bufferList);
                }
            },
            function(error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function() {
        alert('BufferLoader: XHR error');
    }

    request.send();
}

BufferLoader.prototype.load = function() {
      for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
}

/*************************************************************************************
*************************************************************************************/

function init() {
    // Fix up prefixing
    context = new (window.AudioContext || window.webkitAudioContext)();

    bufferLoader = new BufferLoader(
        context,
        [
          'sounds/bass.wav',    //Q
          'sounds/kick.wav',    //W
          'sounds/clap.wav',    //E
          'sounds/snap.wav',    //A
          'sounds/hi-hat.wav',  //S
          'sounds/snare.wav',   //D
          'sounds/tom.wav',     //Z
          'sounds/rim.wav',     //X
          'sounds/damn.mp3'     //C
        ],
        setKeys
    );

    bufferLoader.load();
}

function setKeys(bufferList) {

    window.addEventListener('keydown', function(e){

        var source = context.createBufferSource();
        source.connect(context.destination);

        //key codes for [Q,W,E,A,S,D,Z,X,C]
        const codes = [81,87,69,65,83,68,90,88,67];

        //match key to sound and play it
        codes.forEach( function(code, index) {
            if (e.keyCode == code) {
                source.buffer = bufferList[index];
                source.start(0);
            }
        });
    });
}