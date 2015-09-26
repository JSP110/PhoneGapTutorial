$(document).ready(function(){
    document.addEventListener('deviceready',onDeviceReady,false);

});

function onDeviceReady(){
    var channel="TechGuyHub";

    getPlaylist(channel);

}

function getPlaylist(channel){
    $('#vidlist').html('');
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
            part: 'contentDetails',
            forUsername: channel,
            key: 'AIzaSyBSoj8FIGMj6ePAaYl0VpLQqwR4Ly2deO4'
        },
        function(data){
            console.log(data);
        }
    );
}