$(function () {
    console.log("driver.js loaded");
    
    const socket = io();
    $("#1").click(function(){
        console.log("button 1 clicked");
        
        socket.emit("info-window-update", "Order Received!")
    });
    $("#2").click(function(){
        socket.emit("info-window-update", "On my Way")
    });
    $("#3").click(function(){
        socket.emit("info-window-update", "Plant Picked up!")
    });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            return
            setInterval(()=>{
                navigator.geolocation.getCurrentPosition(position => console.log(position))
            },500)
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
});