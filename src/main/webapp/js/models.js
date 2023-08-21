const subway_siheung_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        126.90155165017461,
        37.45330471900097,
        55.9029385
    ),
    new Ditap.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const subway_siheung_model = Ditap.Model.fromGltf({
    id: "subway_siheung",
    url: "public/glb/subway_siheung/subway_siheung.glb",
    modelMatrix: subway_siheung_matrix,
});

const jeonju_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.065465892762,
        35.8380850335775,
        34.97499999999889
    ),
    new Ditap.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const jeonju_model = Ditap.Model.fromGltf({
    id: "lx_jeonju",
    url: "public/glb/lx_jeonju/lx_jeonju.glb",
    modelMatrix: jeonju_model_matrix,
});
