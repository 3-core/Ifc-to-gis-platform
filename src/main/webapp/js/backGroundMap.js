    // base64 를 URL로 변환하는 함수
    const getUrlFromBase64 = (base64Data) => {
      const b64Data = base64Data;
      console.log(b64Data)
      const byteCharacters = window.atob(b64Data);
      console.log(byteCharacters)
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      return URL.createObjectURL(blob);
    };

    // 배경지도 이미지 객체를 배열 형식으로 리턴해주는 함수
    const createCustomImageryProviderViewModels = () => {
    const providerViewModels = [];

    //  // OSM 지도
      providerViewModels.push(
        new Ditap.ProviderViewModel({
          name: "Open\u00adStreet\u00adMap",
          iconUrl: getUrlFromBase64(
            Ditap.IconBase64UrlStream.OSM_MAP_IMG_URL
          ),
          tooltip: "",
          category: "Other",
          creationFunction: function () {
            return new Ditap.OpenStreetMapImageryProvider({
              url: "https://a.tile.openstreetmap.org/",
            });
          },
        })
      );

    //  // DITAP 전국 정사영상
//      providerViewModels.push(
//        new Ditap.ProviderViewModel({
//          name: "Ditap Korea Map",
//          iconUrl: getUrlFromBase64(
//            Ditap.IconBase64UrlStream.DITAP_MAP_IMG_URL
//          ),
//          tooltip: "Ditap Korea Map",
//          category: "Other",
//          creationFunction: function () {
//            return new Ditap.NationwideOrthoImageryProvider({
//              tilingScheme: new Ditap.DitapEpsg5179TilingSchema(), // EPSG:5179 스키마 적용
//              customTags: {
//                csZ: (imageryProvider, x, y, level) => {
//                  const lz = level + 5;
//                  return `${lz}`;
//                },
//              },
//            });
//          },
//        })
//      );


      // VWorld
      providerViewModels.push(
        new Ditap.ProviderViewModel({
          name: "VWorld Korea Map",
          iconUrl: getUrlFromBase64(
            Ditap.IconBase64UrlStream.VWORLD_MAP_IMG_URL
          ),
          tooltip: "VWorld Korea Map",
          category: "Other",
          creationFunction: function () {
            return new Ditap.VWorldImageryProvider({
              apiKey: "E0868E25-5CEF-3D22-8302-6707C223B244",
              mapType: "base",
            });
          },
        })
      );

      // 바로 E맵
      // 인증키 없음
      providerViewModels.push(
        new Ditap.ProviderViewModel({
          name: "Ngii Map",
          iconUrl: getUrlFromBase64(
            Ditap.IconBase64UrlStream.NGII_MAP_IMG_URL
          ),
          tooltip: "Ngii Map",
          category: "Other",
          creationFunction: function () {
            return new Ditap.NgiiMapImageryProvider({
              apiKey: "657E858946F95A289AF493D992E1FF9A",
              tilingScheme: new Ditap.DitapEpsg5179TilingSchema(), // EPSG:5179 스키마 적용
              mapType: "korean_map",
            });
          },
        })
      );

      // 지도(정사영상) 추가

          providerViewModels.push(
            new Ditap.ProviderViewModel({
              name: "Ditap New Korea Map",
              //iconUrl: getUrlFromBase64(Ditap.IconBase64UrlStream.NEW_MAP_IMG_URL),
              iconUrl: getUrlFromBase64(Ditap.IconBase64UrlStream.NGII_MAP_IMG_URL),
              tooltip: "Ditap New Korea Map",
              category: "Other",
              creationFunction: function () {
                return new Cesium.UrlTemplateImageryProvider({
                  // Geoserver 프록시 주소 입력
                  url: `${location.origin}/proxy/tileMap001.do?tilematrix={z}&tilerow={y}&tilecol={x}`,
//                  tilingScheme : new Ditap.DitapEpsg5179TilingSchema(),
                  tilingScheme: new Ditap.GeographicTilingScheme(),
                  maximumLevel: 18,
                });
              },
            })
          );

      return providerViewModels;
    };

    // 지형 객체를 배열 형식으로 리턴해주는 함수
    const createCustomTerrainProviderViewModels = () => {
      const providerViewModels = [];

      providerViewModels.push(
        new Ditap.ProviderViewModel({
          name: "WGS84 Ellipsoid",
          iconUrl: getUrlFromBase64(
            Ditap.IconBase64UrlStream.ELLIPSOIDE_TERRAIN_IMG_URL
          ),
          tooltip: "WGS84 standard ellipsoid, also known as EPSG:4326",
          category: "Ditap",
          creationFunction: function () {
            return new Ditap.EllipsoidTerrainProvider();
          },
        })
      );

      // 지형(터레인) 추가

      providerViewModels.push(
        new Ditap.ProviderViewModel({
          name: "Ditap Korea Terrain",
          iconUrl: getUrlFromBase64(
            Ditap.IconBase64UrlStream.DITAP_TERRAIN_IMG_URL
          ),
          tooltip: "",
          category: "Ditap",
          creationFunction: function () {
            return new Ditap.CesiumTerrainProvider({
              // 터레인 주소 입력
              url: "http://192.168.40.121:7100/tilesets/layer",
            });
          },
        })
      );

      return providerViewModels;
    };