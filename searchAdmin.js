
function searchAdmin() {
    let selectedAdminCode = $("#emd option:selected").val();
    if(selectedAdminCode == "01") {
        fetch("../../public/buildings/output_admin_01.json")
            .then(function(response) {
                return response.json();
            })
            .then(function (data){
                all_tree_data = data;
                jstreeBuildingsInstance.settings.core.data=all_tree_data;
                jstreeBuildingsInstance.refresh(false);
            });
    } else if(selectedAdminCode == "02") {
        fetch("../../public/buildings/output_admin_02.json")
            .then(function(response) {
                return response.json();
            })
            .then(function (data){
                all_tree_data = data;
                jstreeBuildingsInstance.settings.core.data=all_tree_data;
                jstreeBuildingsInstance.refresh(false);
            });
    }
}

var selectRectangle = null;

function queryRectangle()
{
    let measure = Heliosen.measure;
    measure.resetEvent();
    measure.setEvent('area');
    // drawRectangle(viewer);
    // selectRectagnle = null;
    // selectRectagnle = SGI.selectRectangle;
    // selectRectagnle.init(viewer);
    // selectRectagnle.setRectangleHandler();
    // console.log(selectRectagnle.selector);



    // selectRectagnle = new SelectRectagnle(viewer);
    // selectRectagnle.setRectangleHandler();
    // console.log(selectRectagnle.selector);
}
// function selectRectangle.js() {
//     var rectangleSelector = new Cesium.Rectangle();
//
//     // let viewer = viewer ? viewer : Heliosen.Cesium.getViewer();
//     var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
//     var cartesian = new Cesium.Cartesian3();
//     var tempCartographic = new Cesium.Cartographic();
//     var center = new Cesium.Cartographic();
//     var firstPoint = new Cesium.Cartographic();
//     var firstPointSet = false;
//     var mouseDown = false;
//     var camera = viewer.camera;
//
//     screenSpaceEventHandler.setInputAction(function drawSelector(movement) {
//         if (!mouseDown) {
//             return;
//         }
//
//         cartesian = camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid, cartesian);
//
//         if (cartesian) {
//             //mouse cartographic
//             tempCartographic = Cesium.Cartographic.fromCartesian(cartesian, Cesium.Ellipsoid.WGS84, tempCartographic);
//
//             if (!firstPointSet) {
//                 Cesium.Cartographic.clone(tempCartographic, firstPoint);
//                 firstPointSet = true;
//             }
//             else {
//                 rectangleSelector.east = Math.max(tempCartographic.longitude, firstPoint.longitude);
//                 rectangleSelector.west = Math.min(tempCartographic.longitude, firstPoint.longitude);
//                 rectangleSelector.north = Math.max(tempCartographic.latitude, firstPoint.latitude);
//                 rectangleSelector.south = Math.min(tempCartographic.latitude, firstPoint.latitude);
//                 selector.show = true;
//             }
//         }
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE, Cesium.KeyboardEventModifier.SHIFT);
//
//     var getSelectorLocation = new Cesium.CallbackProperty(function getSelectorLocation (time, result){
//         return Cesium.Rectangle.clone(rectangleSelector, result);
//     }, false);
//
//     screenSpaceEventHandler.setInputAction(function startClickShift() {
//         mouseDown = true;
//         selector.rectangle.coordinates = getSelectorLocation;
//     }, Cesium.ScreenSpaceEventType.LEFT_DOWN, Cesium.KeyboardEventModifier.SHIFT);
//
//     screenSpaceEventHandler.setInputAction(function endClickShift() {
//         mouseDown = false;
//         firstPointSet = false;
//         selector.rectangle.coordinates = rectangleSelector;
//     }, Cesium.ScreenSpaceEventType.LEFT_UP, Cesium.KeyboardEventModifier.SHIFT);
//
//     screenSpaceEventHandler.setInputAction(function hideSelector() {
//         selector.show = false;
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
//
//     selector = viewer.entities.add({
//         selectable: false,
//         show: false,
//         rectangle: {
//             coordinates: getSelectorLocation,
//             material: Cesium.Color.BLACK.withAlpha(0.5)
//         }
//     });
// }

// let cartesian3Positions = [];
// function drawRectangle()
// {
//     if(cartesian3Positions.length <= 2){ return;}
//     viewer.entities.add({
//         polygon:{
//             hierarchy: new Cesium.PolygonHierarchy(cartesian3Positions),
//             material: Cesium.Color.BLUE.withAlpha(0.6)
//         }
//
//     });
//     cartesian3Positions = [];
// }
//
// function selectRectangle.js() {
//     let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
//     handler.setInputAction(function (click) {
//         var adaptivePosition = viewer.scene.pickPosition(click.position);
//         cartesian3Positions.push(adaptivePosition); // Collect clicked position
//         viewer.entities.add({
//             position: adaptivePosition,
//             point: {
//                 pixelSize: 3,
//                 outlineColor: Cesium.Color.WHITE,
//                 outlineWidth: 2,
//                 heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//                 clampToGround: true,
//             }
//
//         });
//
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
//
//     handler.setInputAction(function (click) {
//         drawRectangle();
//     }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
// }



