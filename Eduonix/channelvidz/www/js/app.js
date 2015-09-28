// Mine
$(document).ready(function () {
    //alert("device ready!");
    document.addEventListener('deviceready', onDeviceReady(), false);

});

function onDeviceReady() {

    //Debuging, as setting channel didn't quite work.
    //window.localStorage.setItem('channel', 'TechWebGuy');

    //Check window.localStorage for channel
    if (window.localStorage.channel == null || window.localStorage.channel == '') {
        // Ask user for channel
        $('#popupDialog').popup("open");
    } else {
        // var channel = window.localStorage.channel
        // or
        var channel = window.localStorage.getItem('channel');
    }

    //alert("onDeviceReady function");
    //var channel="TechGuyWeb";

    getPlaylist(channel);

    $(document).on('click', '#vidlist li', function () {
        showVideo($(this).attr('videoId'))
    });

    $('#channelBtnOK').click(function () {
        var channel = $('#channelName').val();
        setChannel(channel);
        getPlaylist(channel);
    });

    $('#saveOptions').click(function () {
        saveOptions();
    })

    $('#clearChannel').click(function () {
        clearChannel();
    })

    $(document).on('pageinit', '#options', function (e) {
        var channel = window.localStorage.getItem('channel');
        var maxResults = window.localStorage.getItem('maxresults');
        $('#channelNameOptions').attr('value', channel);
        $('#maxResultsOptions').attr('value', maxResults);
    })

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
        function (data) {
            //console.log(data) is to shows what is going on with the app.js. This can be view by inspect element in Chrome.
            //console.log(data);
            //alert(data);
            $.each(data.items,function(i,item){
                console.log(item);
                playlistId = item.contentDetails.relatedPlaylists.uploads;
                getVideos(playlistId, window.localStorage.getItem('maxResults'));
            });
            }
       
    );
}

function getVideos(playListId, maxResults) {
    $.get("https://www.googleapis.com/youtube/v3/playlistItems",
        {
            part: 'snippet',
            maxResults: maxResults,
            playlistId: playListId,
            key: 'AIzaSyBSoj8FIGMj6ePAaYl0VpLQqwR4Ly2deO4'
        }, function (data) {
            console.log(data);
            var output;
            $.each(data.items, function (i, item) {
                id = item.snippet.resourceId.videoId;
                title = item.snippet.title;
                thumb = item.snippet.thumbnails.default.url;
                $('#vidlist').append('<li videoId="'+id+'"><img src="'+thumb+'"><h3>'+title+'</h3></li>');
                $('#vidlist').listview('refresh');

            });
            
        }
        );
}

function showVideo(id){
    console.log('Showing Video ' + id)
    //hiding the logo
    $('#logo').hide();
    var output = '<iframe width="100%" height="250" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
    $('#showVideo').html(output);

}

function setChannel(channel) {
    window.localStorage.setItem('channel', channel);
    console.log('Channel set: ' + channel);
}

function setMaxResults(maxResults) {
    window.localStorage.setItem('maxResults', maxResults);
    console.log('Max Results Changed: ' + maxResults);
}

function saveOptions() {
    var channel = $('#channelNameOptions').val();
    setChannel(channel);
    var maxResults = $('#maxResultsOptions').val();
    setMaxResults(maxResults);
    // make the page change once submited
    $('body').pagecontainer('change', '#main', (options));
    getPlaylist(channel);

}

function clearChannel() {
    window.localStorage.removeItem('channel');
    $('body').pagecontainer('change', '#main', (options));
    //clear list
    $('#vidlist').html('');
    //Show popup
    $('#popupDialog').popup('open');
}