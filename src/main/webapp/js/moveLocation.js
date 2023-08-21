function moveLocation() {
    const e = document.getElementById("citySelect");
    const seletedCity = e.options[e.selectedIndex].value;

    if (seletedCity === "jeonju") {
        viewer.camera.flyTo({
            destination: new Cesium.Cartesian3.fromDegrees(127.065465892762, 35.8380850335775, 500.0),
        });
    }

    if (seletedCity === "siheung") {
        viewer.camera.flyTo({
            destination: new Cesium.Cartesian3.fromDegrees(126.90155165017461, 37.45330471900097, 500.0),
        });
    }
}

const moveButton = document.querySelector(".btn_move");
moveButton.addEventListener("click", moveLocation);
