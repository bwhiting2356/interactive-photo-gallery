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
<div class='media-wrapper'>\
    <div id='left-panel' tabindex='0'>\
        <img src='imgs/icons/chevron.svg' alt='Left Arrow' id='arrow-left' height='50px'>\
    </div>\
    {media1}\
    tabindex='0' data_index='{idx}' data_caption='{caption}' alt='{title1}' title='{title2}' id='modal-image'\
    {media2}\
    src='{url}'\
    {media3}\
    <div id='right-panel' tabindex='0'>\
        <img src='imgs/icons/chevron.svg' alt='Right Arrow' id='arrow-right' height='50px'>\
    </div>\
</div>\
<div id='bottom-panel'>\
    <p class='cpn-text'>{caption}</p>\
</div>\
";
  
/*jshint multistr: true */
var media_div_html = "\
<div class='media'>\
    {media1}\
    tabindex='0' data_index='{idx}' data_caption='{caption}' alt='{title1}' title='{title2}' class='thumbnail'\
    {media2}\
    src='{url}'\
    {media3}\
</div>\
";

var current_html_media = []; // will be filled in later

function find_html_index_of_media(media) {
    for (var i = 0; i < current_html_media.length; i++) {
        if (current_html_media[i].getAttribute("data_index") == media.getAttribute("data_index")) {
            return i;
        }
    }
}

var current_html_index = 0; // will be filled in later
var modal_window = ""; // will be filled in later

function next_media() {
    var next_index = current_html_index + 1;
    if ((current_html_index + 2) > current_html_media.length) {
        next_index = (current_html_index + 1) % current_html_media.length;
    }
    var next_media = current_html_media[next_index];
    launch_modal(next_media);
}

function previous_media() {
    var previous_index = current_html_index - 1;
    if (current_html_index === 0) {
        previous_index = current_html_media.length - 1;
    }
    var previous_media = current_html_media[previous_index];
    launch_modal(previous_media);
}

function restore_default_keys() {
    window.removeEventListener("keydown", special_keys);
}

function special_keys(e) {
    if (e.keyCode === 39) { // Right Arrow
        e.preventDefault();
        next_media();
    } else if (e.keyCode === 37) { // Left Arrow
        e.preventDefault();
        previous_media();
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

function replace_placeholders(str, item, size) {
    var html_string = str;
  
  var media1, media2, media3 = "";

    if (item.media === "img") {
        media1 = "<img";
        media2 = "";
        media3 = "/>";
    } else if (item.media === "video") {
        media1 = "<video width='200' height='200'";
        media2 = "><source ";
        media3 = "></video>";
    }

    html_string = html_string.replace("{title1}", item.title).replace("{title2}", item.title);
    html_string = html_string.replace("{idx}", item.idx).replace("{caption}", item.caption);
    html_string = html_string.replace("{caption}", item.caption).replace("{media1}", media1);
    html_string = html_string.replace("{media2}", media2).replace("{media3}", media3);

    if (item.location == "local") {
        if (item.media == "img") {
            html_string = html_string.replace("{url}", "{media-type}s/{size}/" + item.url);
            html_string = html_string.replace("{media-type}", item.media);
            html_string = html_string.replace("{size}", size);  
        } 
    } else {
        html_string = html_string.replace("{url}", item.url); 
    }
    return html_string;

}

function launch_modal(media) {
    window.scroll(0,80);
    window.scroll(0,80);
    current_html_index = find_html_index_of_media(media);
    
    modal_window = document.getElementById("modal-window");
    var content_wrapper = document.getElementById("content-wrapper");
    var raw_item = get_raw_item(media.getAttribute("data_index"));
    content_wrapper.innerHTML = replace_placeholders(modal_content_html, raw_item, 'full-pictures');

    var top_panel = document.getElementById("top-panel");
    var bottom_panel = document.getElementById("bottom-panel");
    var modal_image = document.getElementById("modal-image");

    var top_height = top_panel.style.height;
    function set_bottom_height() {
        var remaining_height = document.documentElement.scrollHeight - modal_image.height - top_height;
        if (remaining_height > 200) {
            bottom_panel.style.height = "{}px".replace("{}", remaining_height);   
        }
    }

    window.onresize = function() {
        if (modal_window !== "") {
            set_bottom_height();
        }
    };

    set_bottom_height();

    top_panel.onclick = hide_modal;
    bottom_panel.onclick = hide_modal;
    modal_image.onclick = hide_modal;

    var right_panel = document.getElementById("right-panel");
    right_panel.onclick = next_media;

    var left_panel = document.getElementById("left-panel");
    left_panel.onclick = previous_media;

    modal_window.style.display="block";
}

function bind_modal_to_media(media) {
    for (var i = 0; i < media.length; i++) {
        /*jshint -W083 */
        media[i].onclick = function() {
            make_modal_keys();
            launch_modal(this);
        };
        /*jshint -W083 */
        media[i].onkeypress = function(e) {
            if ((e.keyCode === 13) || (e.keyCode == 32)) {
                e.preventDefault();
                make_modal_keys();
                launch_modal(this);
            }
        };
    }
}

function populate_media(media_list) {
    var media_container = document.getElementById("media-container");
    media_container.innerHTML = "";
    for (var i = 0; i < media_list.length; i++) {
        media_container.innerHTML += replace_placeholders(media_div_html, media_list[i], 'thumbnails');
    } 
    current_html_media = document.getElementsByClassName("thumbnail");
    bind_modal_to_media(current_html_media);
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
    populate_media(results);

    var no_results = document.getElementById("no-results");
    if (results.length === 0) {
        no_results.style.display = "block";
    } else {
        no_results.style.display = "none";
    }
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
    populate_media(raw_data);
    window.addEventListener("keydown", prevent_window_reload);
    bind_input_event();
};