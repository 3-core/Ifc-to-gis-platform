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
        <!-- font -->
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css">
        <!-- CSS -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/uploadModal.css">
        <!-- DitapJS -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/js/DitapJS/Widgets/widgets.css">

        <title>다이탭</title>
        <style>
            #citySelect,
            #custom_button {
                margin-top: 10px;
                margin-left: 10px;
                padding: 10px;
                font-size: 13px;
                border: none;
                border-radius: 5px;
                box-sizing: border-box;
            }

            #citySelect {
                margin-right: 10px;
                width: 200px;
            }

            #custom_button {
                background-color: #dbe0e2;
                cursor: pointer;
            }

            #custom_button:hover {
                background-color: #efeded;
            }
        </style>
    </head>

    <body>
        <div id="wrap">
            <div id="header_wrap" style="display:flex; justify-content: space-between; width: 100%">
                <div>
                    <select id="citySelect">
                        <option value="jeonju">전주-LX사옥</option>
                        <option value="siheung">시흥-정류장</option>
                    </select>
                    <button id="custom_button" class="btn_move" onclick="moveLocation()">이동하기</button>
                </div>
                <div style="margin-right: 20px; margin-top: 13px">
                    <button id="upload_modal_button">업로드</button>
                </div>
            </div>
            <div id="ditapContainer">
                <div id="modal_div" class="modal">
                    <div id="modal" class="modal-content">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <pre id="modalContent"></pre>
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


        <script>
            const viewer = new Ditap.DitapViewer("ditapContainer", {
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
                if (Cesium.defined(pickObject) && pickObject.detail.node) {
                    const guid = pickObject.detail.node._name;
                    const URL = "http://localhost:8000/ifc/properties/" + guid;

                    axios.get(URL)
                        .then(function (response) {
                            openModal(response.data);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            }, Ditap.ScreenSpaceEventType.LEFT_CLICK);

            // GLB Models
            viewer.scene.primitives.add(jeonju_model);
            viewer.scene.primitives.add(subway_siheung_model);
        </script>
    </body>

    </html>