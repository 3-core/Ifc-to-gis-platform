

    //로컬 환경
    //터레인 호출 함수
    function requestDemTileMap() {
        const provider = new Cesium.CesiumTerrainProvider({
            url: "http://211.47.67.141:8090/tilesets/layer"
        });
        return provider;
    }

   //클릭한 이전 건물을 저장하기 위해 사용
   let previousModel;

    //건물 정보 팝업 띄우기
   function getBuildingInfoPopup(event,viewer,pickObject) {

        //투명화 모델 id 수정
        let modelList = ["34002"];

        if (pickObject._batchId == undefined) {
        //glb클릭
        }else{
        //타일셋 클릭

            //클릭시 tileset 색상 변경
            // 이전에 선택된 모델과 현재 선택 모델이 같음
            // 부동산 종합정보 닫기
            if (previousModel === pickObject) {

                let conditions = [
                    [
                        "(regExp('^46').test(${feature['id']}))",'color("white", 0.75)',
                    ],
                    [
                        "${feature['id']} === '" + pickObject.getProperty("id") + "'",'color("white")',
                    ],
                ]

                //glb가 위치할 기본 tileset 투명화 적용
                for (let i = 0; i < modelList.length; i++){
                    let obj = ["${feature['id']} === '"+modelList[0]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                    conditions.push(obj)
                }

                pickObject.tileset.style = new Cesium.Cesium3DTileStyle({
                    color: {conditions: conditions},
                });

                previousModel = undefined;

                //팝업 닫기 - 수정

            }else{
                //이전에 선택된 모델과 현재 선택 모델이 다름 : 이전 모델 색상 초기화 및 현재 모델 색상 변경

                //이전 모델 색상 초기화
                if (previousModel) {
                    if (previousModel?.tileset) {

                        let conditions = [
                            [
                                "(regExp('^46').test(${feature['id']}))",'color("white", 0.75)',
                            ],
                            [
                                "${feature['id']} === '" + previousModel.getProperty("id") +"'",'color("white")',
                            ],
                        ]

                        previousModel.tileset.style = new Cesium.Cesium3DTileStyle({
                            color: {conditions: conditions},
                        });
                    } else {
                        previousModel.color = new Cesium.Color(1, 1, 1, 1);
                    }
                }

                //현재 모델 색상 변경
                previousModel = pickObject;
                let conditions = [
                    [
                        "${feature['id']} === '" +pickObject.getProperty("id") +"'",'color("lightcoral")',
                    ],
                    [
                        "(regExp('^46').test(${feature['id']}))",'color("white", 0.75)',
                    ],
                ]

                //glb가 위치할 기본 tileset 투명화 적용
                for (let i = 0; i < modelList.length; i++){
                    let obj = ["${feature['id']} === '"+modelList[0]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                    conditions.push(obj)
                }

                pickObject.tileset.style = new Cesium.Cesium3DTileStyle({
                    color: {    conditions: conditions},
                });

                //Remove browser right-click context menu
                window.addEventListener("contextmenu", (e) => e.preventDefault());

                //dim
                $("#loadingDim").css("display", "block");

                //getCoordinates 함수 호출
                setTimeout(() => {
                    getBuildingInfo(event,viewer,pickObject.getProperty("id"));
                    $("#loadingDim").hide();
                }, 2);
            }
        }
   }

    //getBuildingInfo
    // 1. 좌표 조회 -> 2. pnu값 조회 -> 3.건물 정보 조회 -> 4. 팝업 표출
    function getBuildingInfo(event, viewer, bid) {

      //1. 좌표 조회
      const cartesian = viewer.scene.pickPosition(event.position);

      if (Cesium.defined(cartesian)) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        const heightString = cartographic.height;

        //2. pnu값 조회
        let pnu = getPnuNumber(`${longitudeString},${latitudeString}`,bid);

        //3.건물 정보 조회
        if(pnu){

             let apiDate = getAPIInfo(pnu);

             console.log(apiDate)
             $("#loadingDim").hide();

             //4. 팝업 표출
             //if (showPopup(apiDate)) {
             //   document.body.append(showPopup(apiDate)[0]);
             //}

        }else{
          //pnu 조회 안됨
         //정보 없음 팝업 띄우기
        }

      }else{
      //좌표조회 안됨
      //정보 없음 팝업 띄우기
      }
    }

   //pnu값 조회
   function getPnuNumber(coords, bid) {

      let pnu;

      $.ajax({
            url: `api/getPnu.do?coords=${coords}`,
            type: "GET",
            async: false, // 동기식 요청
            contentType: "charset:UTF-8",
            success: function (response) {

                if(!response){
                    pnu = false;
                }else{
                    pnu =  response
                }
            },
            error: function (e) {
              pnu = false;
            },
      });
      return pnu;
   }


   //건물 정보 조회
   function getAPIInfo(pnu) {

      let data = {};

      //토지대장 Land
      $.ajax({
        url: `api/getBuildingInfo.do?apiType=Land&pnu=${pnu}`,
        type: "GET",
        async: false, // 동기식 요청
        contentType: "charset:UTF-8",
        success: function (response) {
          data["Land"] = response;
        },
        error: function (e) {
          console.log(e);
          pnu = false;
        },

      });

      //건물 기본 정보 Base
      $.ajax({
        url: `api/getBuildingInfo.do?apiType=Base&pnu=${pnu}`,
        type: "GET",
        async: false, // 동기식 요청
        contentType: "charset:UTF-8",
        success: function (response) {
          data["Base"] = response;
        },
        error: function (e) {
          console.log(e);
          pnu = false;
        },

      });

      //공시지가 PPrice
      $.ajax({
        url: `api/getBuildingInfo.do?apiType=PPrice&pnu=${pnu}`,
        type: "GET",
        async: false, // 동기식 요청
        contentType: "charset:UTF-8",
        success: function (response) {
          data["PPrice"] = response;
        },
        error: function (e) {
          console.log(e);
          pnu = false;
        },

      });

      //공동 주택가격 BPrice
      $.ajax({
        url: `api/getBuildingInfo.do?apiType=BPrice&pnu=${pnu}`,
        type: "GET",
        async: false, // 동기식 요청
        contentType: "charset:UTF-8",
        success: function (response) {
          data["BPrice"] = response;
        },
        error: function (e) {
          console.log(e);
          pnu = false;
        },

      });

      return data;
   }
