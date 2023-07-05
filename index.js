/* global variables created so can use in any event listener */
var facesSelected;
var diceSelected;

/* when the number of faces is clicked */
$("#faces > button").click(function(e){

    /* reset any previously generated dice throws, if any */
    $('#outcome-img').empty();

    /* bring back in .1secs the img in section3 that was faded out, if any */
    $("#final-img img").fadeIn("100");

    /*the console log showed that innerHTML is found in srcElement.
     However, .srcElement has been deprecated for the codes.
     Use .target instead.*/

    /* update the global variable to be the number input by user */
    facesSelected = (e.target.innerHTML);

    /*update the images*/
    imgLink = "./images/Dice" + facesSelected + ".png";
    $("#faces-img img").attr("src",imgLink);
    $("#num-img img").attr("src",imgLink);
    $("#final-img img").attr("src",imgLink);

    /* show Next button */
    $("section > button").addClass("nav-active");

    /* 2. to undo cloning (below) everytime a new button is clicked */
    $('.cloned').remove();
});


// ---


/* when the Next button is clicked */
$("section > button").click(function(){

    /*show the next section */
    $("#section2").removeClass("hidden-section");
    
    /* scroll to the next section */
    $('html, body').animate({
        scrollTop: $('#section2').offset().top
      }, 1000);
});


// ---


/* when the number of dice is clicked */
$("#dice > button").click(function(e){

    /* 2. to undo cloning everytime a new button is clicked */
    $('.cloned').remove();

    /* reset any previously generated dice throws, if any */
    $('#outcome-img').empty();

    /* bring back in .1secs the img in section3 that was faded out, if any */
    $("#final-img img").fadeIn("100");

    /* update the global variable to be the number input by user: how many times to clone */
    diceSelected = (e.target.innerHTML);

    /* identifying what to clone */
    var cloneTarget = $("#num-img img");

    /* 1. cloning --- use for loop so that cloning can occur as many times as required */
    // use -1 because there is already 1 img in the HTML
    // added class called cloned so that the reset of cloning can be done easily
    for (var i = 0; i < diceSelected-1; i++) {
        cloneTarget.clone().addClass('cloned').appendTo("#num-img");
        cloneTarget.clone().addClass('cloned').appendTo("#final-img");
    }

    /* show Previous & Next buttons */
    $("#section2nav > button").addClass("nav-active");
});


// ---

/*when the previous and reset buttons are clicked*/
function backToTop(){
    $('html, body').animate({   // scroll to top for Previous & Reset buttons
        scrollTop: 0
        }, 1000,
        function () {   // use callback function so that it runs after the animation is complete
            $("#section3").addClass("hidden-section");  // hide section 3
            $("#section2").addClass("hidden-section");  // hide section 2
        }
    );
}


// ---


/* when the Next button is clicked */
$("#section2nav > .nav-primary").click(function(){

    /*show the next section and the section's nav buttons */
    $("#section3").removeClass("hidden-section");
    $("#section3nav > button").addClass("nav-active");
    
    /* scroll to the next section */
    $('html, body').animate({
        scrollTop: $('#section3').offset().top
      }, 1000);
});



// ---


/* when the Previous & Reset button is clicked, scroll back to the top */
$(".nav-secondary").click(backToTop);


// ---


/* when the Throw button is clicked */
$("#section3nav > .nav-primary").click(function(){

    /* reset any previously generated dice throws, if any */
    $('#outcome-img').empty();

    /* generate random numbers --- use for loop so that randomization can occur as many times as required */
    for (var i = 0; i < diceSelected; i++) {
        var result = Math.floor(Math.random() * facesSelected) + 1;

        // specify format for the img link source
        var imgSrc = "./images/Dice" + facesSelected + "-" + result + ".png";

        // specify the html code
        // using .hide() so that the image results are hidden first
        var img = $('<img src="' + imgSrc +'" width = 150px>').hide();

        // add the html code to the html document
        $('#outcome-img').append(img);
    };
    


    /* goal of remaining code is to ensure that fadeIn animation starts only after all fadeOut animation is done.
       to avoid overlapping of animations.*/
    var totalImages = $("#final-img img").length; // how many fadeOut's need to happen 
    var count = 0; // how many fadeOut's has happened (always starts from 0)
    
    $("#final-img img").fadeOut("slow", function() {     //fade out the current images
        count++;    // this is a callback function that happens everytime after a fadeOut is completed
        if(count === totalImages) { // if no. of fadeOut's completed = how many fadeOut's need to happen (a.k.a. 100% completed)
            $('#outcome-img img').fadeIn('slow'); // then fadeIn the dice throw result images
        }
    });

});
