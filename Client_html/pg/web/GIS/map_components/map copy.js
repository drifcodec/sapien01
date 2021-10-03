var map;
var all_markers = []
var siteCluster = []
var vandalismCluster = []
var weatherCluster = []
var hide_show = 1
var timer_interval = 5 * 60 * 1000 //0.30 * 60 * 1000
var site_visibility = true
var weather_visibility = true
async function initialize() {
    // The custom tooltip class
    // Constructor function
    function Tooltip(opts, marker) { // Initialization
        this.setValues(opts);
        this.map_ = opts.map;
        this.marker_ = marker;
        var div = this.div_ = document.createElement("div");
        // Class name of div element to style it via CSS
        div.className = "tooltip";
        this.markerDragging = false;
    }

    Tooltip.prototype = {
        // Define draw method to keep OverlayView happy
        draw: function() {},
        visible_changed: function() {
            var vis = this.get("visible");
            this.div_.style.visibility = vis ? "visible" : "hidden";
        },

        getPos: function(e) {
            var projection = this.getProjection();
            // Position of mouse cursor
            var pixel = projection.fromLatLngToDivPixel(e.latLng);
            var div = this.div_;

            // Adjust the tooltip's position
            var gap = 15;
            var posX = pixel.x + gap;
            var posY = pixel.y + gap;

            var menuwidth = div.offsetWidth;
            // Right boundary of the map
            var boundsNE = this.map_.getBounds().getNorthEast();
            boundsNE.pixel = projection.fromLatLngToDivPixel(boundsNE);

            if (menuwidth + posX > boundsNE.pixel.x) {
                posX -= menuwidth + gap;
            }
            div.style.left = posX + "px";
            div.style.top = posY + "px";

            if (!this.markerDragging) {
                this.set("visible", true);
            }
        },

        getPos2: function(latLng) { // This is added to avoid using listener (Listener is not working when Map is quickly loaded with icons)
            var projection = this.getProjection();
            // Position of mouse cursor
            var pixel = projection.fromLatLngToDivPixel(latLng);
            var div = this.div_;

            // Adjust the tooltip's position
            var gap = 5;
            var posX = pixel.x + gap;
            var posY = pixel.y + gap;

            var menuwidth = div.offsetWidth;
            // Right boundary of the map
            var boundsNE = this.map_.getBounds().getNorthEast();
            boundsNE.pixel = projection.fromLatLngToDivPixel(boundsNE);

            if (menuwidth + posX > boundsNE.pixel.x) {
                posX -= menuwidth + gap;
            }
            div.style.left = posX + "px";
            div.style.top = posY + "px";

            if (!this.markerDragging) {
                this.set("visible", true);
            }
        },

        addTip: function() {
            var me = this;
            var g = google.maps.event;
            var div = me.div_;
            div.innerHTML = me.get("text").toString();
            // Tooltip is initially hidden
            me.set("visible", false);
            // Append the tooltip's div to the floatPane
            me.getPanes().floatPane.appendChild(this.div_);
            // In IE this listener gets randomly lost after it's been cleared once.
            // So keep it out of the listeners array.
            g.addListener(me.marker_, "dragend", function() {
                me.markerDragging = false;
            });

            // Register listeners
            me.listeners = [
                g.addListener(me.marker_, "dragend", function() {
                    me.markerDragging = true;
                }),
                g.addListener(me.marker_, "position_changed", function() {
                    me.markerDragging = true;
                    me.set("visible", false);
                }),
                g.addListener(me.map_, "mousemove", function(e) {
                    me.getPos(e);
                })
            ];
        },

        removeTip: function() {
            // Clear the listeners to stop events when not needed.
            if (this.listeners) {
                for (var i = 0, listener; listener = this.listeners[i]; i++) {
                    google.maps.event.removeListener(listener);
                }
                delete this.listeners;
            }
            // Remove the tooltip from the map pane.
            var parent = this.div_.parentNode;
            if (parent) parent.removeChild(this.div_);
        }
    };


    function inherit(addTo, getFrom) {
        var from = getFrom.prototype; // prototype object to get methods from
        var to = addTo.prototype; // prototype object to add methods to
        for (var prop in from) {
            if (typeof to[prop] == "undefined") to[prop] = from[prop];
        }
    }

    inherit(Tooltip, google.maps.OverlayView);
    var bounds = new google.maps.LatLngBounds();

    var mapOptions = {
        zoom: 6,
        center: { lat: -27.760670805627804, lng: 26.816038817267415 },
        styles: mapStyle_ //white_style//mapStyle_,

    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // This event listener will call addMarker() when the map is clicked.

    map.addListener("click", (event) => {
        console.log(JSON.stringify(event.latLng))
            // addMarker(event.latLng);
    });
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    /*  document.getElementById("submit").addEventListener("click", () => {
         geocodeLatLng(geocoder, map, infowindow);
     }); */

    load_all_markers()

    setInterval(() => {
        load_all_markers()
    }, timer_interval)
    document.getElementById("submit").addEventListener("click", async() => {
        clear_cluster("all_site")
        var site_all_list = await siteAPIGetlist($("#get_region").val())
        for (i = 0; i < site_all_list.length; i++) {
            addMarker(site_all_list[i])
        }
        site_all_list.length = 0
    });
    async function load_all_markers() {
        clear_cluster("all_site")
        clear_cluster("vandalism")
        clear_cluster("weather")

        var site_all_list = await siteAPIGetlist($("#get_region").val())
        var vandalism_list = await vandalismAPIGetlist()
        load_wearther()
            /* 
            console.log('vandalism_list', vandalism_list.length) */


        for (i = 0; i < site_all_list.length; i++) {
            addMarker(site_all_list[i])
        }
        for (i = 0; i < weather_list.length; i++) {
            addMarker(weather_list[i])
        }
        for (i = 0; i < vandalism_list.length; i++) {
            addMarker(vandalism_list[i])
        }
        site_all_list.length = 0
        vandalism_list.length = 0
        weather_list.length = 0
    }

    function addMarker(props) {
        var icon_size = 18
        var site_label = ''
        if (props.type == "weather") {
            icon_size = 50
        }
        if (props.type == "vandalism") {
            icon_size = 30
        }
        if (props.type == "all_site") {
            /*   site_label = {
                      text: props.id === undefined ? '' : (props.site_id).toString(05),
                      color: "white",
                      style: "bold"
                  }, */
            icon_size = 33
        }
        var myLatlng = new google.maps.LatLng(props.coords.lat, props.coords.lng);
        bounds.extend(myLatlng);
        var pulse = props.status == 0 ? 'red_sos' :
            props.status == 1 ? '' :
            props.status == 2 ? 'blue_sos' :
            props.status == 3 ? 'orange_sos' : ''
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            optimized: false,
            icon: {
                url: props.iconImage,
                size: new google.maps.Size(icon_size, icon_size),
                scaledSize: new google.maps.Size(icon_size, icon_size),
            },
            marker_type: { type: props.type },
            label: site_label,
            title: pulse,
            tooltip: props.tooltip === undefined ? '' : props.tooltip
        })

        if (!site_visibility && props.type == 'all_site') {
            marker.setVisible(false);
        }
        if (!weather_visibility && props.type == 'weather') {
            marker.setVisible(false);
        }
        if (!weather_visibility && props.type == 'vandalism') {
            marker.setVisible(false);
        }
        if (props.status == "0") {
            //marker.setIcon(resize_icon(20));
            // marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        var infowindow = new google.maps.InfoWindow({
            content: props.content
        });

        var tooltip = new Tooltip({ map: map }, marker);
        tooltip.bindTo("text", marker, "tooltip");

        function resize_icon(size) {
            var resetIcon = {
                url: props.iconImage,
                scaledSize: new google.maps.Size(size, size),
                size: new google.maps.Size(size, size)
            }
            return resetIcon
        }
        props.type == "all_site" ? siteCluster.addMarker(marker) : ''
        props.type == "vandalism" ? vandalismCluster.addMarker(marker) : ''

        google.maps.event.addListener(marker, 'mouseover', function() {
            tooltip.addTip();
            tooltip.getPos2(marker.getPosition());
            if (props.type === 'weather') {
                marker.setIcon(resize_icon(55))
            } else if (props.type === 'all_site') {
                marker.setIcon(resize_icon(43))
            }
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            if (props.type === 'weather') {
                marker.setIcon(resize_icon(icon_size))
            } else if (props.type === 'all_site') {
                marker.setIcon(resize_icon(icon_size))
            }
            tooltip.removeTip();
        });

        google.maps.event.addListener(marker, 'click', function() {
            marker.setIcon(resize_icon(icon_size))
            tooltip.removeTip();
            infowindow.open(map, marker);
            console.log(map)
        });
        all_markers.push(marker)
            //map.fitBounds(bounds);

    };
    mcOptions = {
        styles: [{
            height: 36,
            url: "/GIS/icons_maps/ClusterTL.png",
            width: 30
        }]
    }
    vandalism_icon = {
        styles: [{
            height: 36,
            url: "/GIS/icons_maps/cluster_se12.png",
            width: 30
        }]
    }
    siteCluster = new MarkerClusterer(map, all_markers, mcOptions);
    vandalismCluster = new MarkerClusterer(map, all_markers, vandalism_icon);
}

// Sets the map on all markers in the array.
/* function setMapOnAll(map) {
    for (let i = 0; i < all_markers.length; i++) {
        all_markers[i].setMap(map);
    }
}
 */
// Removes the markers from the map, but keeps them in the array.
/* function clearMarkers() {
    siteCluster.clearMarkers();
    vandalismCluster.clearMarkers();
    setMapOnAll(null);
} */

// Shows any markers currently in the array.
/* function showMarkers() {
    setMapOnAll(map);
} */

// Deletes all markers in the array by removing references to them.

/* function deleteMarkers() {
  markers = [];
  siteCluster.length = 0;
  vandalismCluster.length = 0;
  $(".tooltip").remove()
} */
/* 
setInterval(() => {
  deleteMarkers()
}, timer_interval) */

function clear_cluster(type) {
    for (let i = 0; i < all_markers.length; i++) {
        if (all_markers[i].marker_type.type === type) {
            var marker = all_markers[i];
            $(".tooltip").remove()
            if (type === 'vandalism') {
                vandalismCluster.clearMarkers()
                marker.setMap(null);
            }
            if (type === 'all_site') {
                siteCluster.clearMarkers()
                marker.setMap(null);
            }
            if (type === 'weather') {
                marker.setMap(null);
            }
        }
    }
}

function marker_toggles(type) {
    for (let i = 0; i < all_markers.length; i++) {
        if (all_markers[i].marker_type.type === type) {
            var marker = all_markers[i];
            if (!marker.getVisible()) {
                if (marker.status == "0") {}
                if (type === 'weather') {
                    weather_visibility = true
                }
                if (type === 'all_site') {
                    all_markers[i].setVisible(false)
                    site_visibility = true
                }
                if (type === 'vandalism') {
                    site_visibility = true
                }
                marker.setVisible(true);
            } else {
                if (type === 'weather') {
                    weather_visibility = false
                }
                if (type === 'all_site') {
                    site_visibility = false
                }
                if (type === 'vandalism') {
                    site_visibility = false
                }
                marker.setVisible(false);
            }
        }
    }
}

//google.maps.event.addDomListener(window, 'load', initialize());