var images = [
    { 
        "url": "01.jpg",
        "title": "Hay Bales",
        "caption": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
    },
    { 
        "url": "02.jpg",
        "title": "Lake",
        "caption": "The lake was so calm today. We had a great view of the snow on the mountains from here."
    },
    { 
        "url": "03.jpg",
        "title": "Canyon",
        "caption": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
    },
        { 
        "url": "04.jpg",
        "title": "Iceberg",
        "caption": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
    },
        { 
        "url": "05.jpg",
        "title": "Desert",
        "caption": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
    },
        { 
        "url": "06.jpg",
        "title": "Fall",
        "caption": "Fall is coming, I love when the leaves on the trees start to change color."
    },
        { 
        "url": "07.jpg",
        "title": "Plantation",
        "caption": "I drove past this plantation yesterday, everything is so green!"
    },
        { 
        "url": "08.jpg",
        "title": "Dunes",
        "caption": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
    },
        { 
        "url": "09.jpg",
        "title": "Countryside Lane",
        "caption": "We enjoyed a quiet stroll down this countryside lane."
    },
        { 
        "url": "10.jpg",
        "title": "Sunset",
        "caption": "Sunset at the coast! The sky turned a lovely shade of orange."
    },
        { 
        "url": "11.jpg",
        "title": "Cave",
        "caption": "I did a tour of a cave today and the view of the landscape below was breathtaking."
    },
        { 
        "url": "12.jpg",
        "title": "Bluebells",
        "caption": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
    },
]

function populate_images(image_list) {
    var image_container = document.getElementById("image-container");
    image_container.innerHTML = "";

    console.log(image_container);
    for (var i = 0; i < image_list.length; i++) {
        var html_string = "<div class='image'><a href='images/full-pictures/url'>\
                          <img src='images/thumbnails/url' alt='title'></a></div>";
        html_string = html_string.replace("title", image_list[i].title);
        html_string = html_string.replace("url", image_list[i].url); 
        html_string = html_string.replace("url", image_list[i].url); 
        image_container.innerHTML += html_string;

    } 
}

function bind_input_event() {
    var search_input = document.getElementById("search");
    search_input.onkeyup = function() {
        var search_words = document.getElementById("search").value.toLowerCase().split(" ");
        var results = [];
        for (var i = 0; i < search_words.length; i++) {
            var word = search_words[i];
            for (var j = 0; j < images.length; j++) {
                if ((word == images[j].title) || (images[j].caption.indexOf(word) > -1)) {
                    results.push(images[j]);
                }
            }
        }
    populate_images(results);
    }
}


window.onload=function() {
    populate_images(images);
    bind_input_event();
}