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
        <!-- DitapJS -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/js/DitapJS/Widgets/widgets.css">

        <title>다이탭</title>
    </head>

    <body>
        <%@ include file="./buildingPopup.jsp"%>
        <div id="wrap">
            <div id="header_wrap" style="display:flex; justify-content: space-between; align-items: center; width: 100%">
                <div id="header_logo" style="display: flex;">
                    <div style="display: flex; align-items: center; margin-right: 10px;">
                        <img src="${pageContext.request.contextPath}/public/img/lx_logo.png" alt="lx_logo" style="margin-left:10px; width: auto; height: 50px">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="color:white; font-size: 30px; font-weight: bold">한국국토정보공사</span>
                    </div>
                </div>

            </div>
            <div style="height: 60px;"></div>
            <div id="ditapContainer">
                <div id="property_modal" class="property_modal">
                    <div class="property_modal_content">
                        <div>모달창</div>
                        <div class="property_modal_close" onclick="closeModal()">
                            <img src="${pageContext.request.contextPath}/public/img/close.png" alt="property_modal_close" style="margin-left:10px; width: auto; height: 20px">
                        </div>
                    </div>
                </div>

                <div id="upload_modal" class="upload_modal">
                    <div class="upload_modal_content">
                        <span id="upload_modal_close" class="upload_modal_close" onclick="closeUploadModal()">&times;</span>
                        <div style="margin:10px; color: white">
                            <div style="font-size: 20px">IFC 파일을 선택해 주세요.</div>
                        </div>
                        <label id="upload_file_input" for="file_input">파일 선택</label>
                        <input type="file" id="file_input">
                        <p id="file_name" class="file_input_div">선택된 IFC 파일이 없습니다.</p>
                        <button id="upload_button" onclick="fileUpload()">업로드</button>
                    </div>
                </div>

            </div>
            <div id="uploading-overlay" style="display: none;">
                <div id="spinner" class="loader"></div>
                <div id="uploading-text">UPLOADING</div>
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
        <script src="${pageContext.request.contextPath}/js/modal.js"></script>
        <!-- MoveFunction -->
        <script src="${pageContext.request.contextPath}/js/moveLocation.js"></script>
        <!-- UploadJS -->
        <script src="${pageContext.request.contextPath}/js/UploadJS/closeUploadModal.js"></script>
        <script src="${pageContext.request.contextPath}/js/UploadJS/displayUploadModal.js"></script>
        <script src="${pageContext.request.contextPath}/js/UploadJS/fileSelect.js"></script>
        <script src="${pageContext.request.contextPath}/js/UploadJS/fileUpload.js"></script>

        <!-- Keyboard Event -->
        <script src="${pageContext.request.contextPath}/js/keyboard.js"></script>
        <script src="${pageContext.request.contextPath}/js/buildingInfo.js"></script>


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

        viewer.camera.setView({
                destination: new Cesium.Cartesian3.fromDegrees(127.06546589276200, 35.83808503357750, 34.97499999999889),
                orientation: {
                    heading: Cesium.Math.toRadians(90.0),
                    pitch: Cesium.Math.toRadians(-90),
                    roll: 0.0
                }
        });

        // Property Click Handler
        const handler = new Ditap.ScreenSpaceEventHandler(viewer.canvas);
        handler.setInputAction(async function (event) {
            const pickObject = viewer.scene.pick(event.position);

                //건물 정보 보기
                if (Cesium.defined(pickObject)) {

                    getBuildingInfoPopup(event,viewer,pickObject)
                }

               if (Cesium.defined(pickObject) && pickObject.detail.node) {
                    const guid = pickObject.detail.node._name;
                }

        }, Ditap.ScreenSpaceEventType.LEFT_CLICK);

        // GLB Models
        viewer.scene.primitives.add(jeonju_model);

        // keyboard Event
        Heliosen.keyboard.initKeyboard(viewer);

        document.addEventListener("keydown",function (e) {
           Heliosen.keyboard.KeyboardEvent("keydown",e.keyCode);
        },false);

        document.addEventListener("keyup",function (e) {
           Heliosen.keyboard.KeyboardEvent("keyup",e.keyCode);
        },false);

        </script>
    </body>

    </html>