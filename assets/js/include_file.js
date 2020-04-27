const mergeSort = document.getElementById("mergeSort");

$(function() {
    $('#navbar').load('include/header.html');
    $('#footer').load('include/footer.html');
    $('#home').load('page/views/home.html');

    mergeSort.addEventListener('click', event => {
        $('#viewMS').load('page/post/mergeSort.html');
        $('#comment').load('page/comment.html');
    });


});