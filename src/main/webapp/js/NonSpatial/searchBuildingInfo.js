let previousBuildingModel;

function displayBuildingPopup(event, viewer, pickObject) {
    console.log(pickObject.getProperty("id"));
    let modelList = ["id"];
    if (!(pickObject._batchId == undefined)) {
        if (previousBuildingModel) {
            if (previousBuildingModel?.tileset) {
                let conditions = [
                    [
                        "(regExp('^46').test(${feature['id']}))",'color("white", 0.75)',
                    ],
                    [
                        "${feature['id']} === '" + previousBuildingModel.getProperty("id") +"'",'color("white")',
                    ],
                ]

                previousBuildingModel.tileset.style = new Cesium.Cesium3DTileStyle({
                    color: {conditions: conditions},
                });
            } else {
                previousBuildingModel.color = new Cesium.Color(1, 1, 1, 1);
            }
        }

        previousBuildingModel = pickObject;

        let conditions = [
            [
                "${feature['id']} === '" + pickObject.getProperty("id") +"'",'color("lightcoral")',
            ],
            [
                "(regExp('^46').test(${feature['id']}))",'color("white", 0.75)',
            ],
        ]

        for (let i = 0; i < modelList.length; i++){
            let obj = ["${feature['id']} === '"+modelList[0]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
            conditions.push(obj)
        }

        pickObject.tileset.style = new Cesium.Cesium3DTileStyle({
            color: {    conditions: conditions},
        });
    }
    if (pickObject && pickObject.getProperty("id")) {
        displayBuildingInfo(pickObject.getProperty("id"));
        }
        else {
        displayBuildingInfo(1)
        }
    // displayBuildingInfo(pickObject.getProperty("id"));
    //displayBuildingInfo(5);

}
function displayBuildingInfo(id) {
    const selectedInfo = all_data.filter(function (e) {
        return e.id == id;
    });

    var JsonData = new Object();
    if(selectedInfo.length > 0 ) {
        for(idx = 0; idx < selectedInfo.length; idx++) {
            var element = selectedInfo[idx];
            JsonData["text"] = "검색결과"
            JsonData["children"] = new Array();
            for(var key in element) {
                var value = element[key];
                var attribute = new Object();
                attribute["text"] = key + " : " + value;
                JsonData["children"].push(attribute);
            }
            break;
        }
    } else {
        JsonData["text"] = "검색결과 없음";
    }

    jstreeBuildingInfoInstance.settings.core.data=JsonData;
    jstreeBuildingInfoInstance.refresh(false);

    $(".building-info-popup").css("display", "block");
}

function closeBuildingPopup() {
    console.log("closePopup called")

    if(!(previousBuildingModel == undefined)) {
        let modelList = ["34002"];
        if (previousBuildingModel?.tileset) {
            let conditions = [
                ["(regExp('^46').test(${feature['id']}))", 'color("white", 0.75)'],
                [
                    "${feature['id']} === '" + previousBuildingModel.getProperty("id") + "'",
                    'color("white")',
                ],
            ]

            for (let i = 0; i < modelList.length; i++) {
                let obj = ["${feature['id']} === '" + modelList[0] + "'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                conditions.push(obj)
            }

            previousBuildingModel.tileset.style = new Cesium.Cesium3DTileStyle({
                color: {
                    conditions: conditions
                },
            });

            previousBuildingModel = undefined;
        }

    }

    $(".building-info-popup").css("display", "none");
}

$(document).on('click', '.close-building-info-btn', function(e){
    closeBuildingPopup();
});