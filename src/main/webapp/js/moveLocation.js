function moveLocation() {
    const e = document.getElementById("citySelect");
    const seletedCity = e.options[e.selectedIndex].value;

    if (seletedCity === "jeonju") {
        viewer.camera.flyTo({
            destination: new Cesium.Cartesian3.fromDegrees(
            127.105982702949,
            35.8191364247799,
            300.0
            ),
        });
    }
}
