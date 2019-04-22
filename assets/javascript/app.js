
var reactions = ["surprised", "mad", "happy", "irritated", "blissful", "perplexed", "amazed"]

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < reactions.length; i++) {

        var button = $("<button>");
        button.addClass("btn btn-info");
        button.attr("data-name", reactions[i]);
        button.text(reactions[i]);
        $("#buttons-view").append(button);
    }
}
renderButtons();



var data = sessionStorage.getItem("image")
console.log(JSON.parse(data))
if (data) {
    rederGifs(JSON.parse(data))
}




function rederGifs(response) {
    for (var i = 0; i < response.length; i++) {

        var gifDiv = $("<div>");

        var gifTitle = $("<p>").text("Title: " + response[i].title);
        var trendingDate = $("<p>").text("Trending date: " + response[i].trending_datetime)

        var linkTag = $("<a>")
        linkTag.attr("href", response[i].images.fixed_height.url)
        linkTag.attr("download", "")
        var downloadButon = $("<button>")
        downloadButon.addClass("btn btn-danger")
        downloadButon.text("Download")
        var downloadableLink = linkTag.append(downloadButon)
        // var favoritesButton = $("<button>")
        // favoritesButton.addClass("btn btn-success favorite")
        // favoritesButton.text("Favorites")




        var gifImage = $("<img>");
        gifImage.attr("src", response[i].images.fixed_height_still.url);
        gifImage.attr("data-still", response[i].images.fixed_height_still.url)
        gifImage.attr("data-animate", response[i].images.fixed_height.url)
        gifImage.attr("data-state", "still")
        gifImage.addClass("gif")


        gifDiv.append(gifTitle);
        gifDiv.append(gifImage);
        gifDiv.append(trendingDate);
        gifDiv.append(downloadableLink);
        // gifDiv.append(favoritesButton)


        $("#gifs-appear-here").prepend(gifDiv);

    }
}

$(document).on("click", ".btn-info", function () {
    var reaction = $(this).attr("data-name");
    console.log(reaction)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        reaction + "&api_key=5a788EyWGS9rH1TXpGNmHwNnFCG4YqeP&limit=5";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            var results = response.data;
            sessionStorage.clear();
            sessionStorage.setItem("image", JSON.stringify(results));
            rederGifs(results)

            // for (var i = 0; i < results.length; i++) {

            //     var gifDiv = $("<div>");

            //     var gifTitle = $("<p>").text("Title: " + results[i].title);
            //     var trendingDate = $("<p>").text("Trending date: " + results[i].trending_datetime)

            //     var linkTag = $("<a>")
            //     linkTag.attr("href", results[i].images.fixed_height.url)
            //     linkTag.attr("download", "")
            //     var downloadButon = $("<button>")
            //     downloadButon.addClass("btn btn-danger")
            //     downloadButon.text("Download")
            //     var downloadableLink = linkTag.append(downloadButon)



            //     var gifImage = $("<img>");
            //     gifImage.attr("src", results[i].images.fixed_height_still.url);
            //     gifImage.attr("data-still", results[i].images.fixed_height_still.url)
            //     gifImage.attr("data-animate", results[i].images.fixed_height.url)
            //     gifImage.attr("data-state", "still")
            //     gifImage.addClass("gif")


            //     gifDiv.append(gifTitle);
            //     gifDiv.append(gifImage);
            //     gifDiv.append(trendingDate);
            //     gifDiv.append(downloadableLink);


            //     $("#gifs-appear-here").prepend(gifDiv);

            // }
        });
});


$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    console.log(state)
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$(document).on("click", "#submit", function (event) {
    event.preventDefault();

    var reactionInput = $("#text-input").val().trim();
    console.log(reactionInput)
    reactions.push(reactionInput);

    renderButtons();
});


function clear() {
    $("#gifs-appear-here").empty();
}
$("#clear").on("click", clear);



// var storedGif = []

// function moveToFavorites() {
//     $("#favorites").append(rederGifs())
// }
// $(".favorite").on("click", moveToFavorites());
