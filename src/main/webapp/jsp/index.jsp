<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width4d5vice-width,45nitial-scale41.0" />
        <!-- Cesium CSS -->
        <link href="https://cesium.com/downloads/cesiumjs/releases/1.105.1/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
        <!-- CSS -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/uploadModal.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/popup.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/locationSelectBox.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/adminSelectBox.css">
        <!-- DitapJS -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/js/DitapJS/Widgets/widgets.css">

        <script stc="${pageContext.request.contextPath}/js/modal.js"></script>


        <title>다이탭</title>
    </head>

    <body>
        <%@ include file="./nonspatial/buildingInfo.jsp" %>
        <%@ include file="./buildingPopup.jsp" %>
            <div class="wrap">
                <div class="header-wrap">
                    <div class="header-logo">
                        <div class="header-logo-img">
                            <img src="${pageContext.request.contextPath}/public/img/logo.png" alt="lx_logo" />
                        </div>
                        <div class="header-logo-txt">
                            공간정보연구원
                        </div>
                    </div>
                </div>
            <div id="ditapContainer" class="container-viewer">
                <ul class="ditap-toolbar-top-wrap top-left">
                    <li class="ditap-toolbar-item">
                        <button class="ditap-toolbar-btn ditap-upload-btn" onclick="openUploadModal()">
                            <p class="ditap-function-btn-img js-basemap-btn"></p>
                            <p class="ditap-btn-tooltip">업로드</p>
                        </button>
                    </li>
                    <li class="ditap-toolbar-item">
                        <button id="property_modal_button" class="ditap-toolbar-btn ditap-property-btn">
                            <p class="ditap-function-btn-img js-basemap-btn"></p>
                            <p class="ditap-btn-tooltip">속성</p>
                        </button>
                    </li>
                    <li class="ditap-toolbar-item">
                        <button id="non_property_modal_button" class="ditap-toolbar-btn ditap-non-space-btn">
                            <p class="ditap-function-btn-img js-basemap-btn"></p>
                            <p class="ditap-btn-tooltip">비공간</p>
                        </button>
                    </li>

                    <li class="ditap-toolbar-item">
                        <button id="building_rotation_btn_button" class="ditap-toolbar-btn ditap-bid-rotation-btn">
                            <p class="ditap-function-btn-img js-basemap-btn"></p>
                            <p class="ditap-btn-tooltip">Polygon Matching</p>
                        </button>
                    </li>

                </ul>
                <div id="property_modal" class="property-modal">

                    <div id="property_modal" class="property_modal">
                        <div id="property_modal_content" class="property_modal_content">
                            <div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 15px">
                                        <div>검색</div>
                                        <div id="property_modal_close">
                                            <img src="${pageContext.request.contextPath}/public/img/close.png" alt="property_modal_close"
                                                style="margin-left:10px; width: auto; height: 20px">
                                        </div>
                                    </div>
                                    <div style="font-size:13px; color: #7A7A7A;">
                                        지정된 위치로 이동합니다.
                                    </div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-top: 10px">
                                        <select id="citySelect" style="flex-grow: 7">
                                            <option value="blank"></option>
                                            <option value="jeonju">전북 전주시 완산구 효자로 185</option>
                                        </select>
                                        <div style="margin: 18px 0 0 11px">
                                            <img src="${pageContext.request.contextPath}/public/img/search3.png" alt="location_search" onclick="moveLocation()">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- IFC 구조 -->
                            <div>
                                <%@ include file="./property/property.jsp" %>
                            </div>
                            <!-- 속성정보 -->
                            <div>
                            </div>
                        </div>
                        <div id="non_property_modal_content" class="non_property_modal_content">
                            <div style="display: flex; justify-content: space-between;">
                                <div>비공간</div>
                                <div id="non_property_modal_close" onclick="closeNonPropertyModal()">
                                    <img src="${pageContext.request.contextPath}/public/img/close.png" alt="non_property_modal_close" style="margin-left:10px; width: auto; height: 20px">
                                </div>
                            </div>

                            <%-- 비공간 검색 --%>
                            <div>
                                <%@ include file="./nonspatial/nonspatialProperty.jsp" %>
                            </div>

                        </div>
                    </div>

                    <div id="upload_modal" class="upload_modal">
                        <div class="upload_modal_content">
                            <div style="display: flex; justify-content: space-between">
                                <div style="margin:10px; color: white">
                                    <div style="font-size: 20px; font-weight: bold">IFC 업로드</div>
                                    <div style="font-size: 12px; color:#a5a5a5; margin-top: 5px">파일의 변환(IFC -> GLB)과 속성정보 데이터를 추출합니다.</div>
                                    <div style="font-size: 12px; color:#a5a5a5; margin-top: 5px">파일의 변환(LAS -> Tileset)을 진행합니다.</div>
                                </div>
                                <div id="upload_modal_close" class="upload_modal_close" onclick="closeUploadModal()">
                                    <img src="${pageContext.request.contextPath}/public/img/close.png" alt="upload_modal_close"
                                        style="margin-left:10px; margin-top:10px; width: auto; height: 20px">
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between">
                                <input type="file" id="file_input" style="flex-grow: 9;">
                                <p id="file_name" class="file_input_div" style="flex-grow:9">선택된 IFC,LAS 파일이 없습니다.</p>
                                <label id="upload_file_input" for="file_input">파일 선택</label>
                            </div>
                            <div style="display:flex; justify-content: flex-end">
                                <button id="upload_button" onclick="fileUpload()">업로드</button>
                            </div>
                        </div>
                    </div>

					<div>
                        <%@ include file="./modelRotateModal/modelRotateModal.jsp" %>
                    </div>

                    <div class="compass-tool">
                        <div class="compass-wrap">

                            <div class="compass">
                                <p class="compass-img">
                                    <img class="tool_compass" src="${pageContext.request.contextPath}/public/img/inter_tool_comp.png"
                                        alt="img">
                                </p>
                            </div>
                            <div class="compass-arrow">
                                <p id="upCtrlBtn">
                                    <button class="top"></button>
                                </p>
                                <p id="rightCtrlBtn">
                                    <button class="right"></button>
                                </p>
                                <p id="downCtrlBtn">
                                    <button class="bottom"></button>
                                </p>
                                <p id="leftCtrlBtn">
                                    <button class="left"></button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div id="uploading-overlay" style="display: none; z-index: 6000">
                <%@ include file="./upload/upload_spinner.jsp" %>
            </div>
            </div>

            <!-- CesiumJS-->
            <script src="https://cesium.com/downloads/cesiumjs/releases/1.105.1/Build/Cesium/Cesium.js"></script>
            <!-- Jquery-->
            <script src="${pageContext.request.contextPath}/js/jquery-3.5.1.min.js"></script>
            <!-- Axios -->
            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

            <!-- Index -->
            <script src="${pageContext.request.contextPath}/js/index.js"></script>
            <!-- Cesium Viewer -->
            <script src="${pageContext.request.contextPath}/js/cesium.js"></script>
            <!-- Storage -->
            <script src="${pageContext.request.contextPath}/js/storage.js"></script>
            <!-- Cesium Utility -->
            <script src="${pageContext.request.contextPath}/js/utils.js"></script>
            <!-- Measurement -->
            <script src="${pageContext.request.contextPath}/js/measure.js"></script>
            <!-- Transform -->
            <script src="${pageContext.request.contextPath}/js/transform.js"></script>
            <!-- Clipping -->
            <script src="${pageContext.request.contextPath}/js/clipping.js"></script>
            <!-- Event -->
            <script src="${pageContext.request.contextPath}/js/events.js"></script>
            <!-- DitapJS -->
            <script src="${pageContext.request.contextPath}/js/DitapJS/Ditap.js"></script>
            <!-- BackGroundMap -->
            <script src="${pageContext.request.contextPath}/js/backGroundMap.js"></script>
            <!-- GLB Models -->
            <script src="${pageContext.request.contextPath}/js/models.js"></script>
            <!-- ModalFunction -->
            <script src="${pageContext.request.contextPath}/js/modalEvent.js"></script>
            <!-- MoveFunction -->
            <script src="${pageContext.request.contextPath}/js/moveLocation.js"></script>
            <!-- search admin / rectagnle -->
            <script src="${pageContext.request.contextPath}/js/NonSpatial/searchAdmin.js"></script>
            <script src="${pageContext.request.contextPath}/js/NonSpatial/searchHospital.js"></script>
            <script src="${pageContext.request.contextPath}/js/NonSpatial/searchBuildingInfo.js"></script>
            <script src="${pageContext.request.contextPath}/js/NonSpatial/selectRectangle.js"></script>

            <!-- UploadJS -->
            <script src="${pageContext.request.contextPath}/js/UploadJS/closeUploadModal.js"></script>
            <script src="${pageContext.request.contextPath}/js/UploadJS/displayUploadModal.js"></script>
            <script src="${pageContext.request.contextPath}/js/UploadJS/fileSelect.js"></script>
            <script src="${pageContext.request.contextPath}/js/UploadJS/fileUpload.js"></script>

			<!-- Soosung Event -->
            <script src="${pageContext.request.contextPath}/js/changeNode.js"></script>
            <script src="${pageContext.request.contextPath}/js/changeModel.js"></script>
            <script src="${pageContext.request.contextPath}/js/uploadingProcess.js"></script>

            <!-- Heliosen Event -->
            <script src="${pageContext.request.contextPath}/js/keyboard.js"></script>
            <script src="${pageContext.request.contextPath}/js/buildingInfo.js"></script>
            <script src="${pageContext.request.contextPath}/js/mapFunction.js"></script>

            <script>
                const viewer = new Ditap.DitapViewer("ditapContainer", {
                    editingTools: {
                        createTools: {
                            point: true,
                            linestring: true,
                            polygon: true,
                        },
                        select: {
                            hoverColor: Ditap.Color.fromCssColorString("#BDBDBD"),
                            selectedColor: Ditap.Color.fromCssColorString("#9DCFFF"),
                        },
                        remove: true,
                    },
                    analysisTools: {
                        visibility: true,
                        clipping: true,
                        split: true,
                    },
                    measurementTools: {
                        altitude: true,
                        straight: true,
                        ground: true,
                        plane: true,
                        vertical: true,
                        horizontal: true,
                        area: true,
                        volume: true,

                    },
                    homeButton: true,
                    navigationHelpButton: true,
                    fullscreenButton: true,
                    baseLayerPicker: true,
                    imageryProviderViewModels: createCustomImageryProviderViewModels(),
                    terrainProviderViewModels: createCustomTerrainProviderViewModels(),
                });

                const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
                  21.27879878293835,
                  -21.34390550872461,
                  0.0716951918898415
                );

                //속성 관련 시연 위치
                /*viewer.camera.setView({
                    destination: new Cesium.Cartesian3.fromDegrees(
                        127.105982702949,
                        35.8191364247799,
                        120.00
                    ),
                    orientation: new Cesium.HeadingPitchRoll(
                        6.3,
                        -0.276607153839886,
                        6.281110875400085
                    )
                });*/

               addTilesetToCesium();

                let previousNode;
                let previousColor;
                // Property Click Handler
                const handler = new Ditap.ScreenSpaceEventHandler(viewer.canvas);
                handler.setInputAction(async function (event) {
                    const pickObject = viewer.scene.pick(event.position);

                    //건물 정보 보기
                    if (Cesium.defined(pickObject)) {
                        getBuildingInfoPopup(event, viewer, pickObject);
                    }

                    if (Cesium.defined(pickObject) && pickObject.detail.node) {
                        const guid = pickObject.detail.node._name;
                        const node = pickObject.detail.node;

                        if(pickObject.id != "lx_model"){

                            handleNodeFocus(node);

                            //const URL = "http://localhost:8000/ifc/properties/" + guid;

                            const URL = "http://ifc-to-gis-platform:8000/ifc/properties/" + guid;
                           
                            axios.get(URL)
                                .then(function (response) {
                                    const propertyData = {
                                        property: response.data.element_property,
                                        pset: response.data.pset_property
                                    };

                                    document.getElementById('property-section').innerHTML = '';
                                    document.getElementById('pset-section').innerHTML = '';

                                    document.getElementById('h2-property').style.display = "block";
                                    document.getElementById('h2-pset').style.display = "block";

                                    document.getElementById('tree-container').style.display = "block";
                                    document.getElementById('floor-tree-container').style.display = "block";
                                    displaySectionData(propertyData.property, "property-section");
                                    displaySectionData(propertyData.pset, "pset-section");

                                    highlightNodeByGuid(guid);
                                    showPropertyModal();
                                })
                                .catch(function (error) {
                                    console.error(error);
                                });
                            }
                    }

                }, Ditap.ScreenSpaceEventType.LEFT_CLICK);

                const handlerBuildingInfo = new Ditap.ScreenSpaceEventHandler(viewer.canvas);
                handlerBuildingInfo.setInputAction(async function (event) {
                    const pickObject = viewer.scene.pick(event.position);

                    //건물 정보 보기
                    if (Cesium.defined(pickObject)) {
                        displayBuildingPopup(event, viewer, pickObject);
                    }
                }, Ditap.ScreenSpaceEventType.RIGHT_CLICK);

                // rectangle


                var selector;
                var rectangleSelector = new Cesium.Rectangle();
                var screenSpaceRectEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                var cartesian = new Cesium.Cartesian3();
                var tempCartographic = new Cesium.Cartographic();
                var center = new Cesium.Cartographic();
                var firstPoint = new Cesium.Cartographic();
                var firstPointSet = false;
                var mouseDown = false;
                var camera = viewer.camera;

                screenSpaceRectEventHandler.setInputAction(function drawSelector(movement) {
                    if (!mouseDown || !rectangleSearch) {
                        return;
                    }

                    cartesian = camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid, cartesian);

                    if (cartesian) {
                        //mouse cartographic
                        tempCartographic = Cesium.Cartographic.fromCartesian(cartesian, Cesium.Ellipsoid.WGS84, tempCartographic);

                        if (!firstPointSet) {
                            Cesium.Cartographic.clone(tempCartographic, firstPoint);
                            firstPointSet = true;
                        }
                        else {
                            rectangleSelector.east = Math.max(tempCartographic.longitude, firstPoint.longitude);
                            rectangleSelector.west = Math.min(tempCartographic.longitude, firstPoint.longitude);
                            rectangleSelector.north = Math.max(tempCartographic.latitude, firstPoint.latitude);
                            rectangleSelector.south = Math.min(tempCartographic.latitude, firstPoint.latitude);
                            selector.show = true;
                        }
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE, Cesium.KeyboardEventModifier.SHIFT);

                var getSelectorLocation = new Cesium.CallbackProperty(function getSelectorLocation(time, result) {
                    return Cesium.Rectangle.clone(rectangleSelector, result);
                }, false);

                screenSpaceRectEventHandler.setInputAction(function startClickShift() {
                    if(!rectangleSearch) {
                        return;
                    }
                    mouseDown = true;
                    selector.rectangle.coordinates = getSelectorLocation;
                }, Cesium.ScreenSpaceEventType.LEFT_DOWN, Cesium.KeyboardEventModifier.SHIFT);

                screenSpaceRectEventHandler.setInputAction(function endClickShift() {
                    if(!rectangleSearch) {
                        return;
                    }
                    mouseDown = false;
                    firstPointSet = false;
                    selector.rectangle.coordinates = rectangleSelector;
                    setROI(Cesium.Math.toDegrees(rectangleSelector.east),
                        Cesium.Math.toDegrees(rectangleSelector.west),
                        Cesium.Math.toDegrees(rectangleSelector.north),
                        Cesium.Math.toDegrees(rectangleSelector.south));
                    resetRectangleSearch();
                }, Cesium.ScreenSpaceEventType.LEFT_UP, Cesium.KeyboardEventModifier.SHIFT);


                //Hide the selector by clicking anywhere
                screenSpaceRectEventHandler.setInputAction(function hideSelector() {
                    selector.show = false;
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


                selector = viewer.entities.add({
                    selectable: false,
                    show: false,
                    rectangle: {
                        coordinates: getSelectorLocation,
                        material: new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.3))
                    }
                });

                // GLB Models
                // viewer.scene.primitives.add(siheung_model);
                viewer.scene.primitives.add(siheung_floor_model);
                siheung_floor_model.show = false
                viewer.scene.primitives.add(siheung_wrong_model);
                viewer.scene.primitives.add(siheung_station_location_model);

                //전주
                var model = viewer.scene.primitives.add(lx_model);

                // keyboard Event
                Heliosen.keyboard.initKeyboard(viewer);

                document.addEventListener("keydown", function (e) {
                    Heliosen.keyboard.KeyboardEvent("keydown", e.keyCode);
                }, false);

                document.addEventListener("keyup", function (e) {
                    Heliosen.keyboard.KeyboardEvent("keyup", e.keyCode);
                }, false);

                let nodeObjects;
                document.addEventListener("DOMContentLoaded", function () {
                    setTimeout(function () {
                        nodeObjects = siheung_wrong_model._nodesByName;
                    }, 2000);
                });

                compassMove(viewer);

                $(document).on("click", ".compass", function () {
                    compassClick(viewer);
                });

                let flags = { mousedown: false, directionId: null };

                $(document).on("mousedown", ".compass-arrow p", function () {
                    let directionId = $(this).attr("id");

                    flags.mousedown = true;
                    flags.directionId = directionId;

                    locationMove(viewer, flags);

                });

                $(document).on("mouseup", ".compass-arrow p", function () {
                    flags.mousedown = false;
                    flags.directionId = null;

                    locationMove(viewer, flags);
                });

            </script>
            <script src="${pageContext.request.contextPath}/js/NonSpatial/searchAdmin.js"/>
    </body>

    </html>
