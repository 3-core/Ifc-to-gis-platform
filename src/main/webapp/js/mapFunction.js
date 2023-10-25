
    var globalTileset = undefined;

    //tileset 요청
    const tilesetURLList = {
        //아파치 타일 경로 - 장성 내부
        //"jangseongTileset":`http://103.55.189.14/jsdt/model/3dtiles/jangseong/all/tileset.json`,
        "pointCloudFull":`http://server.heliosen.co.kr:38090/lx_pc/3d_full/tileset.json`,

        "LOD":`http://server.heliosen.co.kr:38090/3dtileset/Jeonbuk/LOD/tileset.json`,
        "Deokjin":`http://server.heliosen.co.kr:38090/3dtileset/Jeonbuk/Deokjin/tileset.json `,
        "Wansan":`http://server.heliosen.co.kr:38090/3dtileset/Jeonbuk/Wansan/tileset.json`,

    }

    // 포인트 클라우드, 행정정보 버튼 생성
    $(document).ready(function() {
     let addBtn = `
                    <button class="ditap-toolbar-btn ditap-weather-btn">
                        <p id ="ditap-weather" class="ditap-function-btn-img"></p>
                        <p class="ditap-btn-tooltip">LAS</p>
                    </button>

                    <button class="ditap-toolbar-btn ditap-box-btn" id="ditap-box-btn-id" style = "display : none">
                        <p id ="ditap-box" class="ditap-function-btn-img"></p>
                        <p class="ditap-btn-tooltip">Bounding Volumes</p>
                    </button>

                    <button class="ditap-toolbar-btn ditap-building-btn">
                        <p id ="ditap-building" class="ditap-function-btn-img"></p>
                        <p class="ditap-btn-tooltip">행정정보</p>
                    </button>
                    `;

        $(addBtn).insertBefore(".ditap-full-btn");

     });

    function addTilesetToCesium(){

        //기본 타일셋 부르기
        addTilesetListToCesium(viewer, "LOD", tilesetURLList["LOD"]);
        addTilesetListToCesium(viewer, "Deokjin", tilesetURLList["Deokjin"]);
        addTilesetListToCesium(viewer, "Wansan", tilesetURLList["Wansan"]);

    }
    function addTilesetChangLocation(){

        globalTileset.readyPromise.then(function(globalTileset) {
            var heightOffset = 0.5; //고도값 셋팅

            var boundingSphere = globalTileset.boundingSphere;
            var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
            var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
            var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);

            var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());

            globalTileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        });
    }


    function removeTilesetToCesium(){

        //globalTileset에는 가장 늦게 추가가 타일셋 경로가 들어있음(포인트 클라우드).
        viewer.scene.primitives.remove(globalTileset);
    }

    //타일셋 호출 함수

    var tilesetList = [];
    function addTilesetListToCesium(viewer, tileName, tileUrl){

        //타일셋 색상 밝게 변경 위해 타임라인 고정
        var afternoonTime = Cesium.JulianDate.fromIso8601("2023-10-19T08:27:11.7899999999935972Z");
        viewer.clock.currentTime = afternoonTime;
        viewer.clock.shouldAnimate = false;

        var tile = undefined;
        var tileset = undefined;

        //타일셋 데이터 타입에 따라 스타일 분기
        if(tileName == "Wansan"){

            tile = new Ditap.Cesium3DTileset({
                    url: tileUrl,
                    debugShowBoundingVolume: false,
                    preferLeaves: true,
                    skipLevelOfDetail: true,
                    dynamicScreenSpaceError: true,
                    dynamicScreenSpaceErrorDensity : 0.00278,
                    dynamicScreenSpaceErrorFactor : 20,
                    dynamicScreenSpaceErrorHeightFalloff : 0.25,
                    maximumMemoryUsage: 1024,
                    shadows: Ditap.ShadowMode.ENABLED,
                    maximumScreenSpaceError :70
                });

            tileset = viewer.scene.primitives.add(tile);

            //투명화 모델 id 수정
            //LX위치 삭제
            let modelList = ["29000137"];
            let conditions = [];

            //glb가 위치할 기본 tileset 투명화 적용
            for (let i = 0; i < modelList.length; i++){
                let obj = ["${feature['id']} === '"+modelList[i]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                conditions.push(obj)
            }

            tileset.style = new Cesium.Cesium3DTileStyle({
                color: {conditions: conditions},
            });

        }else if(tileName == "Deokjin"){

            tile = new Ditap.Cesium3DTileset({
                    url: tileUrl,
                    debugShowBoundingVolume: false,
                    preferLeaves: true,
                    skipLevelOfDetail: true,
                    dynamicScreenSpaceError: true,
                    dynamicScreenSpaceErrorDensity : 0.00278,
                    dynamicScreenSpaceErrorFactor : 20,
                    dynamicScreenSpaceErrorHeightFalloff : 0.25,
                    maximumMemoryUsage: 1024,
                    shadows: Ditap.ShadowMode.ENABLED,
                    maximumScreenSpaceError :70
                });

            tileset = viewer.scene.primitives.add(tile);

            let modelList = ["J01_743"];
            let conditions = [];

            //glb가 위치할 기본 tileset 투명화 적용
            for (let i = 0; i < modelList.length; i++){
                let obj = ["${feature['id']} === '"+modelList[i]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                conditions.push(obj)
            }

            tileset.style = new Cesium.Cesium3DTileStyle({
                color: {conditions: conditions},
            });




        }else if(tileName == "LOD"){

            tile = new Ditap.Cesium3DTileset({
                    url: tileUrl,
                    debugShowBoundingVolume: false,
                    preferLeaves: true,
                    skipLevelOfDetail: true,
                    dynamicScreenSpaceError: true,
                    dynamicScreenSpaceErrorDensity : 0.00278,
                    dynamicScreenSpaceErrorFactor : 20,
                    dynamicScreenSpaceErrorHeightFalloff : 0.25,
                    maximumMemoryUsage: 1024,
                    shadows: Ditap.ShadowMode.ENABLED,
                    maximumScreenSpaceError :40
                });


            tileset = viewer.scene.primitives.add(tile);

            tileset.style = new Cesium.Cesium3DTileStyle({
                color: 'color("White", 0.7)'
            });
        }else if(tileName == "pointCloudFull" ){

            tile = new Ditap.Cesium3DTileset({
                    url: tileUrl,
                    debugShowBoundingVolume: false,
                    preferLeaves: true,
                    skipLevelOfDetail: true,
                    dynamicScreenSpaceError: true,
                    dynamicScreenSpaceErrorDensity : 0.00278,
                    dynamicScreenSpaceErrorFactor : 20,
                    dynamicScreenSpaceErrorHeightFalloff : 0.25,
                    maximumMemoryUsage: 1024,
                    shadows: Ditap.ShadowMode.ENABLED,

                });

            tileset = viewer.scene.primitives.add(tile);
            globalTileset=tileset

            tileset.style = new Ditap.Cesium3DTileStyle({
                pointSize: 3 // 포인트 크기 설정
            });
            viewer.zoomTo(tileset);
        }

        tilesetList.push(tileset)


        return tileset;
    }


    // 나침반 클릭시 북방향 이동
    function compassClick(viewer) {

        // 카메라 좌표
        let origin = viewer.camera.position;

        // 카메라 시선 벡터
        let direction = viewer.camera.direction;

        // 카메라 Ray Point 계산
        let viewerRay = new Cesium.Ray(origin, direction);
        let ellipsoid = Cesium.Ellipsoid.WGS84;
            const intersection = Cesium.IntersectionTests.rayEllipsoid(
                viewerRay,
                ellipsoid
            );

        const point = Cesium.Ray.getPoint(viewerRay, intersection.start); // 카메라 Ray Point

        // 카메라 이동 후 Heading, Pitch, Roll
        let heading = Cesium.Math.toRadians(0);
        let pitch = viewer.camera.pitch;
        let roll = viewer.camera.roll;

        // 카메라 이동 속도
        let duration = 0.05;
        if (Cesium.Math.toDegrees(pitch) !== -90) {
          duration = 3;
        }

        // 카메라 Ray Point를 축으로 쿼터니언 계산
        const qtn = Cesium.Quaternion.fromAxisAngle(
          point,
          viewer.camera.heading,
          new Cesium.Quaternion()
        );

        // 회전행렬 계산
        const matrix = Cesium.Matrix3.fromQuaternion(qtn, new Cesium.Matrix3());
        // 회전행렬 X 카메라 좌표 = 회전 후 카메라 좌표
        const newPos = Cesium.Matrix3.multiplyByVector(matrix, origin, new Cesium.Cartesian3());

        // 카메라 이동
        viewer.camera.flyTo({
          destination: newPos, // 회전 후 카메라 좌표
          duration: duration, // 이동 시간
          orientation: { // 이동 후 카메라 HeadingPitchRoll
            heading: heading,
            pitch: pitch,
            roll: roll
          },
          // 카메라 이동 끝나면 발생하는 이벤트 => 나침반 북방향 세팅
          complete: function() {
            let compass = $(".compass-img");
            for(let i = 0 ; i < compass.length ; i++){
            compass[i].style.transform = 'rotate(0deg)';
            }
          }
        });
      locationMove(viewer,'null');
    };

    //나침반 화살표 클릭
    function locationMove(viewer) {
      viewer.clock.onTick.addEventListener(function (clock) {
        if (flags.mousedown) {
          const camera = viewer.camera;
          const ellipsoid = viewer.scene.globe.ellipsoid;

          const cameraHeight = ellipsoid.cartesianToCartographic(
            camera.position
          ).height;

          const moveRate = cameraHeight / 100.0;

          if (flags.directionId == "upCtrlBtn") {
            camera.moveUp(moveRate);
          } else if (flags.directionId == "leftCtrlBtn") {
            camera.moveLeft(moveRate);
          } else if (flags.directionId == "rightCtrlBtn") {
            camera.moveRight(moveRate);
          } else if (flags.directionId == "downCtrlBtn") {
            camera.moveDown(moveRate);
          }
        }
      });
    }


    //나침반 move
    function compassMove(viewer) {
      viewer.camera.changed.addEventListener(function () {
        //카메라 각도 출력
        let cameraPitch = Cesium.Math.toDegrees(viewer.camera.pitch);
        $("#cameraAngle").text(`${Math.abs(Math.round(cameraPitch))}`);

        //카메라 고도 출력
        let height = viewer.camera.positionCartographic.height;
        $("#cameraHeight").text(`${height.toFixed(2)}`);

        //나침반
        let compass = document.getElementsByClassName('tool_compass');
        let heading = 360 - ( viewer.camera.heading * 180 / Math.PI ).toFixed(1);
        for(let i = 0 ; i < compass.length ; i++){
          compass[i].style.transform = 'rotate(' + heading + 'deg)';
        }

      });
    }

