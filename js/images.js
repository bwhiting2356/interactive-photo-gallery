var raw_image_data = [
    { 
        "idx": "01",
        "title": "Hay Bales",
        "caption": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
    },
    { 
        "idx": "02",
        "title": "Lake",
        "caption": "The lake was so calm today. We had a great view of the snow on the mountains from here."
    },
    { 
        "idx": "03",
        "title": "Canyon",
        "caption": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
    },
        { 
        "idx": "04",
        "title": "Iceberg",
        "caption": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
    },
        { 
        "idx": "05",
        "title": "Desert",
        "caption": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
    },
        { 
        "idx": "06",
        "title": "Fall",
        "caption": "Fall is coming, I love when the leaves on the trees start to change color."
    },
        { 
        "idx": "07",
        "title": "Plantation",
        "caption": "I drove past this plantation yesterday, everything is so green!"
    },
        { 
        "idx": "08",
        "title": "Dunes",
        "caption": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
    },
        { 
        "idx": "09",
        "title": "Countryside Lane",
        "caption": "We enjoyed a quiet stroll down this countryside lane."
    },
        { 
        "idx": "10",
        "title": "Sunset",
        "caption": "Sunset at the coast! The sky turned a lovely shade of orange."
    },
        { 
        "idx": "11",
        "title": "Cave",
        "caption": "I did a tour of a cave today and the view of the landscape below was breathtaking."
    },
        { 
        "idx": "12",
        "title": "Bluebells",
        "caption": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
    },
];

/*jshint multistr: true */
var modal_content_html = "\
<div id='top-panel'></div>\
<div class='img-wrapper'>\
    <div id='left-panel'>\
        <img src='images/icons/chevron.svg' alt='Left Arrow' id='arrow-left' height='50px'>\
    </div>\
    <img src='images/full-pictures/idx.jpg' id='modal-image' alt='title'>\
    <div id='right-panel'>\
        <img src='images/icons/chevron.svg' alt='Right Arrow' id='arrow-right' height='50px'>\
    </div>\
</div>\
<div id='bottom-panel'>\
    <p class='cpn-text'>caption</p>\
</div>\
";
  
/*jshint multistr: true */
var img_div_html = "\
<div class='image'>\
    <img src='images/thumbnails/idx.jpg' class='thumbnail' data_index='idx' data_caption='cpn' alt='title'>\
</div>\
";

var current_html_images = []; // will be filled in laters

function find_index_of_image(image) {
    for (var i = 0; i < current_html_images.length; i++) {
        if (current_html_images[i].getAttribute("data_index") == image.getAttribute("data_index")) {
            return i;
        }
    }
}

var modal_window = "" // will be filled in later

function hide_modal() {
    modal_window.style.display="none";
};


function launch_modal(image) {
    modal_window = document.getElementById("modal-window");
    var content_wrapper = document.getElementById("content-wrapper");
    var html_string = modal_content_html;

    var current_index = find_index_of_image(image);

    html_string = html_string.replace("title", image.getAttribute("alt"));
    html_string = html_string.replace("idx", image.getAttribute("data_index"));
    html_string = html_string.replace("caption", image.getAttribute("data_caption"));

    content_wrapper.innerHTML = html_string;

    var top_panel = document.getElementById("top-panel");
    var bottom_panel = document.getElementById("bottom-panel");
    var modal_image = document.getElementById("modal-image");

    top_panel.onclick = hide_modal;
    bottom_panel.onclick = hide_modal;
    modal_image.onclick = hide_modal;

    var right_panel = document.getElementById("right-panel");
    right_panel.onclick = function() { 
        var next_index = current_index + 1;
        if ((current_index + 2) > current_html_images.length) {
            next_index = (current_index + 1) % current_html_images.length;
        }
        var next_image = current_html_images[next_index];
        launch_modal(next_image);
    };
    right_panel.onmouseenter = function() {
        this.style.background = "rgba(24, 24, 24, 0.8)";
        console.log("hey");
    };
    right_panel.onmouseleave = function() {
        this.style.background = "rgba(24, 24, 24, 0.9)";
    };

    var left_panel = document.getElementById("left-panel");
    left_panel.onclick = function() {
        var previous_index = current_index - 1;
        if (current_index === 0) {
            previous_index = current_html_images.length - 1;
        }
        var previous_image = current_html_images[previous_index];
        launch_modal(previous_image);
    };
    left_panel.onmouseenter = function() {
        this.style.background = "rgba(24, 24, 24, 0.8)"
    };
    left_panel.onmouseleave = function() {
        this.style.background = "rgba(24, 24, 24, 0.9)";
    }

    modal_window.style.display="block";
}


function bind_modal_to_imgs(imgs) {
    for (var i = 0; i < imgs.length; i++) {
        /*jshint -W083 */
        imgs[i].onclick = function() {
            launch_modal(this);
        };
    }
}

function populate_images(image_list) {
    var image_container = document.getElementById("image-container");
    image_container.innerHTML = "";
    for (var i = 0; i < image_list.length; i++) {
        var html_string = img_div_html;
        html_string = html_string.replace("title", image_list[i].title);
        html_string = html_string.replace("idx", image_list[i].idx); 
        html_string = html_string.replace("idx", image_list[i].idx); 
        html_string = html_string.replace("cpn", image_list[i].caption); 
        image_container.innerHTML += html_string;
    } 
    current_html_images = document.getElementsByClassName("thumbnail");
    bind_modal_to_imgs(current_html_images);
}


function bind_input_event() {
    var search_input = document.getElementById("search");
    search_input.onkeyup = function() {
        var search_words = document.getElementById("search").value.toLowerCase().split(" ");
        var results = [];
        for (var i = 0; i < search_words.length; i++) {
            var word = search_words[i];
            for (var j = 0; j < raw_image_data.length; j++) {
                if ((word == raw_image_data[j].title.toLowerCase()) || 
                    (raw_image_data[j].caption.toLowerCase().indexOf(word) > -1)) {
                    results.push(raw_image_data[j]);
                }
            }
        }
    populate_images(results);
    };
}

window.onload=function() {
    populate_images(raw_image_data);
    bind_input_event();
};