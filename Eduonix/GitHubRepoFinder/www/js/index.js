$(document).ready(function () {
    //alert("Device Ready");
    //document.addEventListener('deviceready', function () {
    //    alert("Device Ready");
        getRepos();
    });



// Get Repos function for home screen
function getRepos() {
    alert("getRepos Running");
    var html = '';

    //using AJAX
    $.ajax({
        url: "https://api.github.com/repositories",
        dataType:'jsonp',
        success: function (response) {
            console.log(response);
            //$.each(response.data);
        }
    });

}