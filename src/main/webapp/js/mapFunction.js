
    // 포인트 클라우드, 행정정보 버튼 생성
    $(document).ready(function() {
     let addBtn = `
                    <button class="ditap-toolbar-btn ditap-weather-btn">
                        <p id ="ditap-weather" class="ditap-function-btn-img"></p>
                        <p class="ditap-btn-tooltip">LAS</p>
                    </button>
                    <button class="ditap-toolbar-btn ditap-building-btn">
                        <p id ="ditap-building" class="ditap-function-btn-img"></p>
                        <p class="ditap-btn-tooltip">행정정보</p>
                    </button>
                    `;

        $(addBtn).insertBefore(".ditap-full-btn");

     });

     //추가 아이콘 클릭시 활성화
      $(document).on('click', '.ditap-weather-btn', function(){

            const classes = document.getElementById("ditap-weather").classList;
            if (classes.contains('on')) {

                document.getElementById("ditap-weather").classList.remove('on');

            }else{
                document.getElementById("ditap-weather").classList.add('on');
            }

      });

    //로컬 환경
    //터레인 호출 함수
    function requestDemTileMap() {
        const provider = new Cesium.CesiumTerrainProvider({
            url: "http://211.47.67.141:8090/tilesets/layer"
        });
        return provider;
    }

    //타일셋 호출 함수
    function addTilesetListToCesium(viewer, tileName, tileUrl){

        const tile = new Ditap.Cesium3DTileset({
            url: tileUrl,
            debugShowBoundingVolume: false,
            preferLeaves: true,
            skipLevelOfDetail: true,
            dynamicScreenSpaceError: true,
            dynamicScreenSpaceErrorDensity : 0.00278,
            dynamicScreenSpaceErrorFactor : 4.0,
            dynamicScreenSpaceErrorHeightFalloff : 0.25,
            maximumMemoryUsage: 1024,
            shadows: Ditap.ShadowMode.ENABLED,
        });

        let tileset = viewer.scene.primitives.add(tile);

        //타일셋 위치로 이동
        viewer.zoomTo(tileset);

        //투명화 모델 id 수정
        let modelList = ["34002"];
        let conditions = [];

        //glb가 위치할 기본 tileset 투명화 적용
        for (let i = 0; i < modelList.length; i++){
            let obj = ["${feature['id']} === '"+modelList[0]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
            conditions.push(obj)
        }

        tileset.style  = new Cesium.Cesium3DTileStyle({
            color: {conditions: conditions},
        });

      return tile;
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

