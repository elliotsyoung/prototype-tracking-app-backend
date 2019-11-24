console.log("main.js loaded.");

$(function () {
    SlidingMarker.initializeGlobally();
    socket = io();
    const trucks_positions = [];

    infoWindow = new google.maps.InfoWindow({
        content: "Gardeneur Pickup Vehicle"
    });

    socket.on("connect", () => {
        console.log("socket connected with id" + socket.id);
        socket.emit("client-ping", socket.id);
    })
    socket.on("server-ping", function (ping_response) {
        console.log(`Received server ping: ${ping_response}`);
    });
    socket.on("truck-position-update", (e) => {
        // trucks_positions.push(position_update);
        console.log(trucks_positions);
        if (truck_marker) {
            console.log("moving truck marker");
            truck_marker.setPosition(e.latLng)
            infoWindow.open(map, truck_marker);
        } else {
            console.log("creating truck marker");
            var truck_icon = {
                url: "/truck_icon.png", // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(25, 25) // anchor
            };
            truck_marker = new google.maps.Marker({
                position: e.latLng,
                map: map,
                icon: truck_icon
            });
            infoWindow.open(map, truck_marker);
        }
        // placeMarkerAndPanTo(e.latLng, map);
        // truck_marker.setPosition(e.latLng);
        console.log(e.latLng);
    });
    socket.on("info-window-update", (newText)=>{
        console.log("new info window text event: " + newText);
        infoWindow.close();
        infoWindow.setContent(newText)
        infoWindow.open(map, truck_marker);
    });
});