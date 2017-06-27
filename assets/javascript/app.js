$(document).ready(function(){

    $('button').on('click', function() { //button click function
        var animal = $(this).data('name'); // holder for object name value
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ // get gif from URL
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) { // when you're done retrieving info, here's what to do

                // console log the resonse to make sure you're getting the right results
                console.log('response', response)

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div/>'); // div container

                    var p =$('<p/>'); // paragraph for rating
                    p.text(results[i].rating);

                    var animalImage = $('<img/>'); // animal image holder

                    animalImage.addClass('anImg')
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animalImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    animalDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(this);

                    if (state == 'still') { // animate the gif if clicked on and in still mode
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');

                    } else {  // pause the gif if clicked on and in animate mode
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                    }      
                });
            });
    });

    var animals = [''];

    
        //This function "adds" the buttons 

        // handles the event when clicked
        $('#theButton').on('click', function(){
            var animalButton = $("#gif-input").val();
            //adds the new animal

            var newButton = $("<button/>").addClass( "btn btn-info animal").attr('data-name',animalButton).html(animalButton).css({'margin': '5px'});
            
            $("#animalsbuttons").append(newButton);
                console.log("Work");

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalButton + "&api_key=dc6zaTOxFJmzC&limit=10";
                console.log('animal button value', animalButton);

            $.ajax({
            url: queryURL,
            method: 'GET'
            })

            .done(function(response) {

            var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div/>');
                    var p =$('<p/>');
                    p.text(results[i].rating);
                    console.log('results', results)
                    var animalImage = $('<img/>');

                    animalImage.addClass('anImg')
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animalImage.attr('data-animate', results[i].images.fixed_height.url)

                    .attr('data-state', 'still');

                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    animalDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(this);

                    if (state == 'still') { 
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');

                    } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                    }      
                });
            });

            $("#gif-input").val("");
            return false;
        })
  
});