   //추가 아이콘 클릭시 활성화
   $(document).on('click', '.ditap-building-btn', function(){

       const classes = document.getElementById("ditap-building").classList;
       if (classes.contains('on')) {

           document.getElementById("ditap-building").classList.remove('on');

           closePopup();

       }else{
           document.getElementById("ditap-building").classList.add('on');
       }

   });

   //LAS버튼 클릭시
   $(document).on('click', '.ditap-weather-btn', function(){

       const classes = document.getElementById("ditap-weather").classList;
       if (classes.contains('on')) {

           document.getElementById("ditap-weather").classList.remove('on');

           //바운딩 박스 버튼 안보이게
            $("#ditap-box-btn-id").css("display", "none");
            document.getElementById("ditap-box").classList.remove('on');
            globalTileset.debugShowBoundingVolume = false;

           removeTilesetToCesium()

       }else{
           document.getElementById("ditap-weather").classList.add('on');
           //바운딩 박스 버튼 보이게
            $("#ditap-box-btn-id").css("display", "block");
           addTilesetListToCesium(viewer, "pointCloudFull", tilesetURLList["pointCloudFull"]);
           //addTilesetListToCesium(viewer, "pointCloud", tilesetList["pointCloud"]);
           addTilesetChangLocation();
       }
   });

   //바운딩 볼륨 버튼
   $(document).on('click', '.ditap-box-btn', function(){
      const classes = document.getElementById("ditap-box").classList;

      globalTileset.debugShowBoundingVolume = true;


       if (classes.contains('on')) {


           document.getElementById("ditap-box").classList.remove('on');

           globalTileset.debugShowBoundingVolume = false;



       }else{
           document.getElementById("ditap-box").classList.add('on');

           globalTileset.debugShowBoundingVolume = true;

       }
   });



   //클릭한 이전 건물을 저장하기 위해 사용
   let previousModel;

    //건물 정보 팝업 띄우기
   function getBuildingInfoPopup(event,viewer,pickObject) {

        const classes = document.getElementById("ditap-building").classList;

        if (classes.contains('on')) {

            //투명화 모델 id 수정
            let modelList = ["29000137","J01_743"];

            if (pickObject._batchId == undefined) {
                //이전 모델 지우기
                if (previousModel) {
                    previousModel.color = new Cesium.Color(1, 1, 1, 1);
                }
                // 이전 모델과 선택모델 동일한
                if (previousModel === pickObject.primitive) {

                        previousModel.color = new Cesium.Color(1, 1, 1, 1);
                        previousModel = undefined;

                        //팝업 닫기
                        $(".desc-popup").css("display", "none");
                        $(".desc-popup-none").css("display", "none");
                }else{

                    // 새로 선택된 모델에 색상 입히기
                    previousModel = pickObject.primitive;
                    previousModel.color = Cesium.Color.LIGHTCORAL;

                    //Remove browser right-click context menu
                    window.addEventListener("contextmenu", (e) => e.preventDefault());

                    //dim
                    $("#loadingDim").css("display", "block");

                    //getCoordinates 함수 호출
                    try {
                        setTimeout(() => {
                            getBuildingInfo(event,viewer,"29000137");
                            $("#loadingDim").hide();
                        }, 2);
                    } catch(e) {

                        $(".desc-popup-none").css("display", "block");
                        $("#loadingDim").hide();
                    }

                }

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
                        let obj = ["${feature['id']} === '"+modelList[i]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                        conditions.push(obj)
                    }

                    pickObject.tileset.style = new Cesium.Cesium3DTileStyle({
                        color: {conditions: conditions},
                    });

                    previousModel = undefined;

                    //팝업 닫기
                    $(".desc-popup").css("display", "none");
                    $(".desc-popup-none").css("display", "none");

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
                        let obj = ["${feature['id']} === '"+modelList[i]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                        conditions.push(obj)
                    }


                    pickObject.tileset.style = new Cesium.Cesium3DTileStyle({
                        color: {conditions: conditions},
                    });

                    //Remove browser right-click context menu
                    window.addEventListener("contextmenu", (e) => e.preventDefault());

                    //dim
                    $("#loadingDim").css("display", "block");

                    //getCoordinates 함수 호출
                    try {
                        setTimeout(() => {
                            getBuildingInfo(event,viewer,pickObject.getProperty("id"));
                            $("#loadingDim").hide();
                        }, 2);
                    } catch(e) {

                        $(".desc-popup-none").css("display", "block");
                        $("#loadingDim").hide();
                    }
                }
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

             let resultData = getPopup(apiDate);

             //상단 탭 색상 변경
             document.getElementById("tap2").classList.remove('on');
             document.getElementById("tap3").classList.remove('on');
             document.getElementById("tap4").classList.remove('on');

             document.getElementById("tap2Info").classList.remove('on');
             document.getElementById("tap3Info").classList.remove('on');
             document.getElementById("tap4Info").classList.remove('on');

             document.getElementById("tap1").classList.add('on');
             document.getElementById("tap1Info").classList.add('on');

             $(".desc-popup-none").css("display", "none");
             $(".desc-popup").css("display", "block");

             $("#loadingDim").hide();
        }else{
          //pnu 조회 안됨
          //정보 없음 팝업 띄우기
          $(".desc-popup-none").css("display", "block");


        }

      }else{
      //좌표조회 안됨
      //정보 없음 팝업 띄우기
        $(".desc-popup-none").css("display", "block");
      }
    }

    //팝업 띄우기
    function getPopup(data) {
       //토지대장
       let landUl = `<table class="desc-table">`;
       if (data?.Base) {
            let tr = undefined;
            if (data.Land.length > 0) {
                 tr = `
                            <tr class="desc-table-item">
                                <th class="desc-table-name">소재지</th>
                                <td class="desc-table-cont">
                                    ${data.Land[0]?.ldCodeNm !== undefined? data.Land[0]?.ldCodeNm: "정보없음"}
                                    ${data.Land[0]?.mnnmSlno !== undefined ? data.Land[0]?.mnnmSlno: "정보없음"}
                                </td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">지목명</th>
                                <td class="desc-table-cont" >${data.Land[0]?.lndcgrCodeNm !== null ? data.Land[0]?.lndcgrCodeNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">지목명</th>
                                <td class="desc-table-cont" >${data.Land[0]?.lndpclAr !== null ? data.Land[0]?.lndpclAr: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">이동일자</th>
                                <td class="desc-table-cont" > - </td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">이동사유명</th>
                                <td class="desc-table-cont" >${data.Land[0]?.ownshipChgCauseCodeNm !== null ? data.Land[0]?.ownshipChgCauseCodeNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">소유구분명</th>
                                <td class="desc-table-cont">${data.Land[0]?.posesnSeCodeNm !== null ? data.Land[0]?.posesnSeCodeNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">변동일자</th>
                                <td class="desc-table-cont" >${data.Land[0]?.ownshipChgDe !== null ? data.Land[0]?.ownshipChgDe: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">변동원인명</th>
                                <td class="desc-table-cont">${data.Land[0]?.ownshipChgCauseCodeNm !== null ? data.Land[0]?.ownshipChgCauseCodeNm: "정보없음"}</td>
                            </tr>
                            `


            }else{
                tr = `
                    <tr class="desc-table-item">
                        <td class="desc-table-cont">조회 결과가 없습니다.</td>
                    </tr>
                     `
            }
            landUl += tr;
       }

        document.getElementById('land').innerText = '';
       $("#land").append(landUl);

        //공시지가
        let pPriceUl = `<ul>`;
            if (data?.PPrice) {
                for (let info of data.PPrice) {
                    let li = `
                        <li class="table-item">
                            <p class="table-cont">${info.stdrYear}</p>
                            <p class="table-cont">${info.stdrMt}</p>
                            <p class="table-cont">${convertWonMoneyString(info.pblntfPclnd)}</p>
                        </li>
                        `;
                    pPriceUl += li;
                }
            }else {
                li = `
                    <li class="table-item">
                        <p class="table-cont">조회 결과가 없습니다.</p>
                    </li>
                    `;
                pPriceUl += li;
            }

            document.getElementById('pPrice').innerText = '';
            $("#pPrice").append(pPriceUl);

      //건물 기본 정보
       let baseUl = `<table class="desc-table">`;
       if (data?.Base) {
            let tr = undefined;
            if (data.Base.length > 0) {
                 tr = `
                            <tr class="desc-table-item">
                                <th class="desc-table-name">소재지</th>
                                <td class="desc-table-cont">
                                    ${data.Base[0]?.ldCodeNm !== undefined? data.Base[0]?.ldCodeNm: "정보없음"}
                                </td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">건물명</th>
                                <td class="desc-table-cont" >${data.Base[0]?.buldNm !== null ? data.Base[0]?.buldNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">대지면적(m²)</th>
                                <td class="desc-table-cont" >${data.Base[0]?.buldPlotAr !== null ? data.Base[0]?.buldPlotAr: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">건축면적(m²)</th>
                                <td class="desc-table-cont" >${data.Base[0]?.buldBildngAr !== null ? data.Base[0]?.buldBildngAr: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">연면적(m²)</th>
                                <td class="desc-table-cont">${data.Base[0]?.buldTotar !== null ? data.Base[0]?.buldTotar: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">건폐율(%)</th>
                                <td class="desc-table-cont" >${data.Base[0]?.btlRt !== null ? data.Base[0]?.btlRt: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">용적율(%)</th>
                                <td class="desc-table-cont">${data.Base[0]?.measrmtRt !== null ? data.Base[0]?.measrmtRt: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">층수(지상/지하)</th>
                                <td class="desc-table-cont" >
                                    ${data.Base[0]?.groundFloorCo !== null ? data.Base[0]?.groundFloorCo: "정보없음"}/
                                    ${data.Base[0]?.undgrndFloorCo !== null ? data.Base[0]?.undgrndFloorCo: "정보없음"}
                                    </td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">높이</th>
                                <td class="desc-table-cont">${data.Base[0]?.buldHg !== null ? data.Base[0]?.buldHg: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">구조명</th>
                                <td class="desc-table-cont" >${data.Base[0]?.strctCodeNm !== null ? data.Base[0]?.strctCodeNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">주용도명</th>
                                <td class="desc-table-cont" >${data.Base[0]?.buldPrposClCodeNm !== null ? data.Base[0]?.buldPrposClCodeNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">주부속구분명</th>
                                <td class="desc-table-cont">${data.Base[0]?.mainPrposCodeNm !== null ? data.Base[0]?.mainPrposCodeNm: "정보없음"}</td>
                            </tr>
                            <tr class="desc-table-item">
                                <th class="desc-table-name">사용승인일자</th>
                                <td class="desc-table-cont" >${data.Base[0]?.useConfmDe !== null ? data.Base[0]?.useConfmDe: "정보없음"}</td>
                            </tr>
                             <tr class="desc-table-item">
                                 <th class="desc-table-name">등록일자</th>
                                 <td class="desc-table-cont" >${data.Base[0]?.lastUpdtDt !== null ? data.Base[0]?.lastUpdtDt: "정보없음"}</td>
                             </tr>
                            `
            }else{
                tr = `
                    <tr class="desc-table-item">
                        <td class="desc-table-cont">조회 결과가 없습니다.</td>
                    </tr>
                     `
            }
            baseUl += tr;
       }


        document.getElementById('base').innerText = '';
        $("#base").append(baseUl);

        //공동 주택 가격
        let bPriceUl = `<ul>`;
            if (data?.BPrice) {
                for (let info of data.BPrice) {
                    let li = `
                        <li class="table-item">
                            <p class="table-cont">${info.stdrYear}</p>
                            <p class="table-cont">${info.stdrMt}</p>
                            <p class="table-cont">${convertWonMoneyString(info.pblntfPc)}</p>
                        </li>
                        `;
                    bPriceUl += li;
                }
            }else {
                let li = `
                    <li class="table-item">
                        <p class="table-cont">조회 결과가 없습니다.</p>
                    </li>
                    `;
                bPriceUl += li;
            }

            document.getElementById('bPrice').innerText = '';

            $("#bPrice").append(bPriceUl);

       return;
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

      //공동 주택 가격 BPrice
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


   //부동산 팝업 닫기 및 색상 원복 함수
   function closePopup() {
        //투명화 모델 id 수정

        let modelList = ["29000137","J01_743"];

        if (previousModel?.tileset) {

             let conditions = [
                    ["(regExp('^46').test(${feature['id']}))", 'color("white", 0.75)'],
                    [
                      "${feature['id']} === '" + previousModel.getProperty("id") + "'",
                      'color("white")',
                    ],
             ]

             //투명도 적용
              for (let i = 0; i < modelList.length; i++){
                let obj = ["${feature['id']} === '"+modelList[i]+"'", 'rgba(${COLOR}.r, ${COLOR}.g, ${COLOR}.b, 0)']
                conditions.push(obj)
              }

              previousModel.tileset.style = new Cesium.Cesium3DTileStyle({
                color: {
                  conditions: conditions
                },
              });
        }else{

            if (previousModel) {
                previousModel.color = new Cesium.Color(1, 1, 1, 1);
            }

        }

        previousModel = undefined;
        $(".desc-popup").css("display", "none");
        $(".desc-popup-none").css("display", "none");
   }


    //부동산 정보 팝업 닫기
    $(document).on('click', '.close-btn', function(e){

        closePopup();

    });



    function convertWonMoneyString(priceString) {
      if (priceString !== undefined) {
        return parseInt(priceString).toLocaleString("ko-KR");
      } else {
        return "";
      }
    }

    $('.desc-tap').click(function(){

        //상단 탭 색상 변경
        document.getElementById($('.on').attr('id')).classList.remove('on');

        let tapId = $(this).attr("id");
        document.getElementById($(this).attr("id")).classList.add('on');

        document.getElementById("tap1Info").classList.remove('on');
        document.getElementById("tap2Info").classList.remove('on');
        document.getElementById("tap3Info").classList.remove('on');
        document.getElementById("tap4Info").classList.remove('on');

        if(tapId =="tap1"){
            document.getElementById("tap1Info").classList.add('on');
        }else if(tapId =="tap2"){
            document.getElementById("tap2Info").classList.add('on');
        }else if(tapId =="tap3"){
            document.getElementById("tap3Info").classList.add('on');
        }else if(tapId =="tap4"){
            document.getElementById("tap4Info").classList.add('on');
        }
    });

