<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<div>
    <div>
        <div style="font-size:13px; color: #7A7A7A; margin-top: 20px">
            행정명으로 검색합니다.
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px">
            <select id="sido" style="flex-grow: 7">
                <option value="00">시도</option>
                <option value="01">전라북도</option>
            </select>
            <select id="sgg" style="flex-grow: 7">
                <option value="00">시도</option>
                <option value="01">전주시</option>
            </select>
            <select id="emd" style="flex-grow: 7">
                <option value="00">읍면동</option>
                <option value="01">완산구</option>
                <option value="02">덕진구</option>
            </select>
            <div style="margin: 18px 0 0 11px">
                <img src="${pageContext.request.contextPath}/public/img/search3.png" alt="admin_search" onclick="searchAdmin()">
            </div>
        </div>
    </div>
    <%-- mbr 검색 --%>
    <div>
        <div style="font-size:13px; color: #7A7A7A; margin-top: 20px">
            사용자 정의 영역으로 검색합니다.
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: -5px">
            <div>
                <div style="font-size:13px; color: #7A7A7A; flex-grow: 7">
                    <label style="font-size:13px; color: #7A7A7A; margin-top: 20px">ULX</label>
                    <input type="text" id="roi_min_x" style="width: 120px; flex-grow: 7 ">

                    <label style="font-size:13px; color: #7A7A7A; margin-left: 10px; margin-top: 20px">ULY</label>
                    <input type="text" id="roi_max_y" style="width: 120px">
                </div>

                <div style="font-size:13px; color: #7A7A7A; margin-top: -5px">
                    <label style="font-size:13px; color: #7A7A7A; margin-top: 20px">LRX</label>
                    <input type="text" id="roi_max_x" style="width: 120px">

                    <label style="font-size:13px; color: #7A7A7A; margin-left:10px; margin-top: 30px">LRY</label>
                    <input type="text" id="roi_min_y" style="width: 120px">
                </div>
                <div style="text-align:center; padding:10px 0;font-size:13px; color: #7A7A7A;">
                    <a href="#" onclick="searchRectangle();" class="btn btn-info roi" style="background-color: #51B7A3;  color: #fff;"><i class="fas fa-mouse-pointer m-r-5"></i>사용자 정의 ROI</a>
                </div>
            </div>

            <div style="margin: 30px 0 0 11px">
                <img src="${pageContext.request.contextPath}/public/img/search3.png" alt="location_search" onclick="moveLocation()">
            </div>
        </div>
    </div>
     <script type="text/javascript" src="${pageContext.request.contextPath}/js/NonSpatial/selectKind.js"></script>
    </head>
    <body>
        <div>
            <div style="font-size:13px; color: #7A7A7A; margin-top: 20px">
                속성으로 검색합니다.
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px">
                <select id="buildingKind" style="flex-grow: 7">
                    <option value="00">종류</option>
                    <option value="01">병원</option>
                    <option value="02">약국</option>
                    <option value="03">어린이집</option>
                    <option value="04">음식점</option>
                    <option value="05">태양광발전소</option>
                </select>
                <select id="buildingField" style="flex-grow: 7">
                    <option value="00">검색필드</option>
                </select>
                <input type="text" id="number_of_bed" style="width: 80px; flex-grow: 7; margin: 10px 10px 10px 0px">
                <div style="margin: 18px 0 0 11px">
                    <img src="${pageContext.request.contextPath}/public/img/search3.png" alt="admin_search" onclick="searchHospital()">
                </div>
            </div>
        </div>
    </body>
    </html>

    <%-- 검색 결과 --%>
    <div>

        <style>
            .building-list { overflow:auto; border:1px solid silver; min-height:100px; }
            .selected-building-result { overflow:auto; border:1px solid silver; min-height:100px; }
        </style>

        <div style="font-size:13px; color: #7A7A7A; margin-top: 20px">
            검색 결과를 표시합니다.
        </div>
        <div id="building-list" class="building-list" style="max-height: 200px; min-height: 100px; margin-top: 10px; color: black; background-color:white ;border-radius: 10px; border: 1px solid #00b8a3"></div>

        <div style="font-size:13px; color: #7A7A7A; margin-top: 20px">
            상세 검색 결과를 표시합니다.
        </div>
        <div id="selected-building-result" class="selected-building-result" style="max-height: 200px; min-height: 100px; margin-top: 10px; color: black; background-color:white ;border-radius: 10px; border: 1px solid #00b8a3"></div>

        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/libs/jstree-3.3.16-0/jstree.js"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/js/libs/jstree-3.3.16-0/themes/default/style.css"/>
        <script>
            var all_tree_data;
            var all_data;

            var jstreeBuildingsInstance = $.jstree.create('#building-list', {
                'plugins' : ["types"],
                'types': {
                    'default': {
                        'icon': false
                    }
                },
                'core': {
                    'data': [{
                        "id": 1,
                        "text": "검색 결과 없음",
                    }]
                }
            });

            var jstreeSelectedBuildingsInstance = $.jstree.create('#selected-building-result', {
                'plugins' : ["types"],
                'types': {
                    'default': {
                        'icon': false
                    }
                },
                'core': {
                    'data': [{
                        "id": 1,
                        "text": "검색 결과 없음",
                    }]
                }
            });
            fetch("../../public/buildings/all_info.json")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    all_data = data;
                });

            $('#building-list')
                .on('changed.jstree', displaySelectFacility);
            //
            function displaySelectFacility(e, data) {
                let selectedData = data.instance.get_node(data.selected);
                const selectedInfo = all_data.filter(function (e) {
                    return e.id == selectedData.id;
                });
                var JsonData = new Object();
                var x = -1.0;
                var y = -1.0;
                var height = 200.0;

                if(selectedInfo.length > 0 ) {
                    for(idx = 0; idx < selectedInfo.length; idx++) {
                        var element = selectedInfo[idx];
                        JsonData["text"] = selectedData.text;
                        JsonData["children"] = new Array();
                        for(var key in element) {41
                            var value = element[key];
                            var attribute = new Object();
                            attribute["text"] = key + " : " + value;
                            JsonData["children"].push(attribute);

                            if(key == "위도") {
                                y = value
                            }
                            if(key == "경도") {
                                x = value;
                            }
                        }
                        if (selectedData.id === "415") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.10557974395417, 35.82025770895747, 148),
                              orientation: {
                                 heading: Cesium.Math.toRadians(-170),
                                 pitch: Cesium.Math.toRadians(-30),
                                 roll: 0,
                              },
                           });
                        }
                        if (selectedData.id === "415") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.10557974395417, 35.82025770895747, 148),
                              orientation: {
                                 heading: Cesium.Math.toRadians(-170),
                                 pitch: Cesium.Math.toRadians(-30),
                                 roll: 0,
                              },
                           });
                        }

                        else if (selectedData.id === "416") {
                        function onFileTreeNodeClick(event) {
                                    const guid = event.currentTarget.dataset.guid;
                                    const node = findNodeByGuid(guid);
                                    if (node) {
                                        handleNodeFocus(node);
                                    }
                                }
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.1054651824028, 35.820340537283485, 148),
                              orientation: {
                                 heading: Cesium.Math.toRadians(-170),
                                 pitch: Cesium.Math.toRadians(-30),
                                 roll: 0,
                              },
                           });
                        }
                        else if (selectedData.id === "418") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.1058202884375, 35.81937088431648, 95),
                              orientation: {
                                 heading: Cesium.Math.toRadians(-85),
                                 pitch: Cesium.Math.toRadians(-30),
                                 roll: 0,
                              },
                           });
                        }
                        else if (selectedData.id === "419") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.10704661763644, 35.818941002785856, 243),
                              orientation: {
                                 heading: Cesium.Math.toRadians(-60),
                                 pitch: Cesium.Math.toRadians(-40),
                                 roll: 0,
                              },
                           });
                        }

                        else if (selectedData.id === "420") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.10554214979808, 35.819940181601226, 117.1335),
                              orientation: {
                                 heading: Cesium.Math.toRadians(-160),
                                 pitch: Cesium.Math.toRadians(-10),
                                 roll: 0,
                              },
                           });
                        }
                        else if (selectedData.id === "421") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.1055837974335, 35.82014632802126, 117.0408),
                              orientation: {
                                 heading: Cesium.Math.toRadians(10),
                                 pitch: Cesium.Math.toRadians(-10),
                                 roll: 0,
                              },
                           });
                        }
                        else if (selectedData.id === "422") {
                        viewer.camera.flyTo({
                              destination: Cesium.Cartesian3.fromDegrees(127.10548202369445, 35.820014155739855, 116.24382858394807),
                              orientation: {
                                 heading: Cesium.Math.toRadians(110),
                                 pitch: Cesium.Math.toRadians(-13),
                                 roll: 0,
                              },
                           });
                        }
                        if( x > 0.0 && y > 0.0) {
                            viewer.camera.flyTo({
                                destination: new Cesium.Cartesian3.fromDegrees(x, y ,height),
                            });
                        }


                        break;
                    }
                }
                data.instance.deselect_all(true);
                jstreeSelectedBuildingsInstance.settings.core.data=JsonData;
                jstreeSelectedBuildingsInstance.refresh(false);
            }
        </script>
    </div>
</div>
