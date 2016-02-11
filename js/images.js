var raw_data = [
    { 
        "idx": "1",
        "media": "img",
        "location": "local",
        "url": "01.jpg",
        "title": "Hay Bales",
        "caption": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
    },
    { 
        "idx": "2",
        "media": "img",
        "location": "local",
        "url": "02.jpg",
        "title": "Lake",
        "caption": "The lake was so calm today. We had a great view of the snow on the mountains from here."
    },
    { 
        "idx": "3",
        "media": "img",
        "location": "local",
        "url": "03.jpg",
        "title": "Canyon",
        "caption": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
    },
    { 
        "idx": "4",
        "media": "img",
        "location": "local",
        "url": "04.jpg",
        "title": "Iceberg",
        "caption": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
    },
    { 
        "idx": "5",
        "media": "img",
        "location": "local",
        "url": "05.jpg",
        "title": "Desert",
        "caption": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
    },
    { 
        "idx": "6",
        "media": "img",
        "location": "local",
        "url": "06.jpg",
        "title": "Fall",
        "caption": "Fall is coming, I love when the leaves on the trees start to change color."
    },
    { 
        "idx": "7",
        "media": "img",
        "location": "local",
        "url": "07.jpg",
        "title": "Plantation",
        "caption": "I drove past this plantation yesterday, everything is so green!"
    },
    { 
        "idx": "8",
        "media": "img",
        "location": "local",
        "url": "08.jpg",
        "title": "Dunes",
        "caption": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
    },
    { 
        "idx": "9",
        "media": "img",
        "location": "local",
        "url": "09.jpg",
        "title": "Countryside Lane",
        "caption": "We enjoyed a quiet stroll down this countryside lane."
    },
    { 
        "idx": "10",
        "media": "img",
        "location": "local",
        "url": "10.jpg",
        "title": "Sunset",
        "caption": "Sunset at the coast! The sky turned a lovely shade of orange."
    },
    { 
        "idx": "11",
        "media": "img",
        "location": "local",
        "url": "11.jpg",
        "title": "Cave",
        "caption": "I did a tour of a cave today and the view of the landscape below was breathtaking."
    },
    { 
        "idx": "12",
        "media": "img",
        "location": "local",
        "url": "12.jpg",
        "title": "Bluebells",
        "caption": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
   }
];

/*jshint multistr: true */
var modal_content_html = "\
<div id='top-panel'></div>\
<div class='img-wrapper'>\
    <div id='left-panel' tabindex='0'>\
        <img src='images/icons/chevron.svg' alt='Left Arrow' id='arrow-left' height='50px'>\
    </div>\
    <img src='url' id='modal-image' alt='ttl' title='ttl'>\
    <div id='right-panel' tabindex='0'>\
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
    <img src='url' class='thumbnail'\
    tabindex='0' data_index='idx' data_caption='cpn' alt='ttl' title='ttl'>\
</div>\
";

var current_html_images = []; // will be filled in laters

function find_html_index_of_image(image) {
    for (var i = 0; i < current_html_images.length; i++) {
        if (current_html_images[i].getAttribute("data_index") == image.getAttribute("data_index")) {
            return i;
        }
    }
}

var current_html_index = 0; // will be filled in later
var modal_window = ""; // will be filled in later

function next_image() {
    var next_index = current_html_index + 1;
    if ((current_html_index + 2) > current_html_images.length) {
        next_index = (current_html_index + 1) % current_html_images.length;
    }
    var next_image = current_html_images[next_index];
    launch_modal(next_image);
}

function previous_image() {
    var previous_index = current_html_index - 1;
    if (current_html_index === 0) {
        previous_index = current_html_images.length - 1;
    }
    var previous_image = current_html_images[previous_index];
    launch_modal(previous_image);
}

function restore_default_keys() {
    window.removeEventListener("keydown", special_keys);
}

function special_keys(e) {
    if (e.keyCode === 39) { // Right Arrow
        e.preventDefault();
        next_image();
    } else if (e.keyCode === 37) { // Left Arrow
        e.preventDefault();
        previous_image();
    } else if ((e.keyCode === 13) || (e.keyCode === 32)) { // Spacebar or Enter
        e.preventDefault();
        hide_modal();
        restore_default_keys();
    }
}

function make_modal_keys() {
    window.addEventListener("keydown", special_keys);
}

function hide_modal() {
    modal_window.style.display="none";
    restore_default_keys();
}

function get_raw_item(idx) {
    for (var i = 0; i < raw_data.length; i++) {
        if (raw_data[i].idx == idx) {
            return raw_data[i];
        }
    }
}

function launch_modal(image) {
    current_html_index = find_html_index_of_image(image);
    
    modal_window = document.getElementById("modal-window");
    var content_wrapper = document.getElementById("content-wrapper");

    var raw_item = get_raw_item(image.getAttribute("data_index"));
    var html_string = modal_content_html;
    html_string = html_string.replace("ttl", raw_item.title);
    html_string = html_string.replace("ttl", raw_item.title);
    html_string = html_string.replace("idx", raw_item.idx);
    
    html_string = html_string.replace("caption", raw_item.caption);

    if (raw_item.location == "local") {
        html_string = html_string.replace("url", "images/full-pictures/" + raw_item.url);             
    } else {
        html_string = html_string.replace("url", raw_item.url); 
    }

    content_wrapper.innerHTML = html_string;

    var top_panel = document.getElementById("top-panel");
    var bottom_panel = document.getElementById("bottom-panel");
    var modal_image = document.getElementById("modal-image");

    var top_height = top_panel.style.height;
    function set_bottom_height() {
        
        var remaining_height = document.documentElement.scrollHeight - modal_image.height - top_height;
        bottom_panel.style.height = "{}px".replace("{}", remaining_height);
    }
    set_bottom_height();

    window.onresize = function() {
        if (modal_window !== "") {
            set_bottom_height();
        }
    };

    top_panel.onclick = hide_modal;
    bottom_panel.onclick = hide_modal;
    modal_image.onclick = hide_modal;

    var right_panel = document.getElementById("right-panel");
    right_panel.onclick = next_image;

    var left_panel = document.getElementById("left-panel");
    left_panel.onclick = previous_image;

    modal_window.style.display="block";
    window.scroll(0,80);
}

function bind_modal_to_imgs(imgs) {
    for (var i = 0; i < imgs.length; i++) {
        /*jshint -W083 */
        imgs[i].onclick = function() {
            make_modal_keys();
            launch_modal(this);
        };
        /*jshint -W083 */
        imgs[i].onkeypress = function(e) {
            if ((e.keyCode === 13) || (e.keyCode == 32)) {
                make_modal_keys();
                launch_modal(this);
            }
        };
    }
}

function populate_images(media_list) {
    var image_container = document.getElementById("image-container");
    image_container.innerHTML = "";
    for (var i = 0; i < media_list.length; i++) {
        var html_string = img_div_html;
        html_string = html_string.replace("ttl", media_list[i].title);
        html_string = html_string.replace("ttl", media_list[i].title);
        html_string = html_string.replace("idx", media_list[i].idx); 
        html_string = html_string.replace("cpn", media_list[i].caption); 

        if (media_list[i].location == "local") {
            html_string = html_string.replace("url", "images/thumbnails/" + media_list[i].url);             
        } else {
            html_string = html_string.replace("url", media_list[i].url);  
        }

        image_container.innerHTML += html_string;
    } 
    current_html_images = document.getElementsByClassName("thumbnail");
    bind_modal_to_imgs(current_html_images);
}


function run_search(e) {
    e.preventDefault();
    var search_words = document.getElementById("search").value.toLowerCase().split(" ");
    var results = [];
        for (var i = 0; i < search_words.length; i++) {
        var word = search_words[i];
        for (var j = 0; j < raw_data.length; j++) {
            if ((word === raw_data[j].title.toLowerCase()) || 
                (raw_data[j].caption.toLowerCase().indexOf(word) > -1)) {
                results.push(raw_data[j]);
            }
        }
    }
    populate_images(results);

}

function bind_input_event() {
    var search_input = document.getElementById("search");
    search_input.onkeyup = run_search;
}

function prevent_window_reload(e) {
    if ((e.keyCode === 13) && (e.target.id === "search")) {
        e.preventDefault();
    }
}


window.onload=function() {
    populate_images(raw_data);
    window.addEventListener("keydown", prevent_window_reload);
    bind_input_event();
};
