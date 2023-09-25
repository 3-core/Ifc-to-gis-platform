function moveLocation() {
    const e = document.getElementById("citySelect");
    const seletedCity = e.options[e.selectedIndex].value;

    if (seletedCity === "jeonju") {
        viewer.camera.flyTo({
            destination: new Cesium.Cartesian3.fromDegrees(127.058968, 35.835069 ,500.0),
        });
    }
}
