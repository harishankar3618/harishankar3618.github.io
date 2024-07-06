// script.js

// Example function for displaying a message on click
function showMessage() {
    alert("Welcome to my portfolio!");
}

// Attach the function to a button or link in your HTML
document.addEventListener("DOMContentLoaded", function() {
    var viewProjectLinks = document.querySelectorAll('.project a');
    viewProjectLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage();
        });
    });
});
