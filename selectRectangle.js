let rectangleSearch = false;
function searchRectangle() {
    rectangleSearch = true;

    viewer.scene.debugShowFramesPerSecond = true;
    viewer.scene.screenSpaceCameraController.enableTranslate = false;
    viewer.scene.screenSpaceCameraController.enableTilt = false;
    viewer.scene.screenSpaceCameraController.enableLook = false;
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;

}

function setROI(east, west, north, south) {
    $('#roi_min_x').val(east);
    $('#roi_max_y').val(north);
    $('#roi_max_x').val(west);
    $('#roi_min_y').val(south);

    fetch("../../public/buildings/output_RectangleBox.json")
        .then(function(response) {
            return response.json();
        })
        .then(function (data){
            all_tree_data = data;
            jstreeBuildingsInstance.settings.core.data=all_tree_data;
            jstreeBuildingsInstance.refresh(false);
        });
}

function resetRectangleSearch() {
    viewer.scene.debugShowFramesPerSecond = false;
    viewer.scene.screenSpaceCameraController.enableTranslate = true;
    viewer.scene.screenSpaceCameraController.enableTilt = true;
    viewer.scene.screenSpaceCameraController.enableLook = true;
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;

    rectangleSearch = false;
}