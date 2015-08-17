$(document).ready(function() {

    //audio api
    var context = new window.AudioContext(); //
    var buffer, source, destination; 
    var loadSoundFile = function(file) {
        //sticker
        var mm = musicmetadata(file, function (err, result) {
            if (err) throw err;
                console.log(result);
            if (result.picture.length > 0) {
                var picture = result.picture[0];
                var url = URL.createObjectURL(new Blob([picture.data], {'type': 'image/' + picture.format}));
                $('#dropZone').css({'background-image':'url('+url+')'});
            }
            var div = document.getElementById('info');
            div.innerText = result.title;
        });
        //web audio
        url = URL.createObjectURL(file);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e) {
            context.decodeAudioData(this.response,
            function(decodedArrayBuffer) {
                console.log('sound is loaded');
                buffer = decodedArrayBuffer;
                $('.controls').show();
            }, function(e) {
                console.log('Error decoding file', e);
            });
        };
        xhr.send();
    }

    var play = function(){
        console.log('play sound');
        source = context.createBufferSource();
        source.buffer = buffer;
        destination = context.destination;
        source.connect(destination);
        source.start(0);
    }
    // функция остановки воспроизведения
    var stop = function(){
        console.log('stop sound');
        source.stop(10000);
    }

    var pause = function(){
        console.log('pause sound');
        source.start(0,5000);
    }


    var dropZone = $('#dropZone');
    
    if (typeof(window.FileReader) == 'undefined') {
        dropZone.text('Не поддерживается браузером!');
        dropZone.addClass('error');
    };
    
    dropZone[0].ondragover = function() {
        dropZone.addClass('hover');
        return false;
    };
    
    dropZone[0].ondragleave = function() {
        dropZone.removeClass('hover');
        return false;
    };
    
    dropZone[0].ondrop = function(event) {
        event.preventDefault();
        dropZone.removeClass('hover');
        dropZone.addClass('drop');
        
        var file = event.dataTransfer.files[0];  
        loadSoundFile(file);

    };


    //activator
    $('#audio_file').change(function(){
        var files = this.files;      
        loadSoundFile(files[0]);
    });
    var isPlay = false;
    $('#playPause').click(function(){
        if (isPlay) {
            isPlay = false;
            pause();
        }else{
            isPlay = true;
            play();
        }
        return false;
    });

    $('#stop').click(function(){
        isPlay = false;
        stop();
        return false;
    });
});


