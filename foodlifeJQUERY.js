//======Welcome note on page load===========
$(document).ready(function() {
    alert("WELCOME TO FOODLIFE MARKET!")

    //function to display the delivery textarea once the button has been clicked
    $('#addressInput').click(function() {
        $(this).hide();
    })
    $(".shippingOptions").click(function() {
        $(this).hide();
    })
    $(".delivery").click(function() {
        $('#addressInput').click(function() {
            $(this).slideToggle(1000);
        })
        $(".shippingOptions").click(function() {
            $(this).slideToggle(1000);
        })
    });

    //function to display the collection address once the collection button has been clicked
    $("#collectInfo").click(function() {
        $(this).hide()
    })
    $(".collection").click(function() {
        $("#collectInfo").click(function() {
            $(this).show();
        })
    });

    //=====chained effect=======
    $(".chainedEffect").click(function() {
        $(".button").css("background", "linear-gradient(to right, crimson, lightcoral")
            .animate({
                right: "600px"
            }, 1000).animate({
                left: "600px"
            }, 1000).slideUp(4000).slideDown(3000);
    });

    /*this function creates a dropdown menu accordion,
        when the user clicks the accordion-title ( which is the the heading ie. h1 and h2), and will only open the heading clicked,
    This code allows only a specific heading to be open not all headings at once.
    The specific heading clicked will show its content.
        */
    $(".accordion-title").click(function() {

        $(".accordion-title").not(this).removeClass("open");

        $(".accordion-title").not(this).next().slideUp(300);

        $(this).toggleClass("open");

        $(this).next().slideToggle(300);

    });


});