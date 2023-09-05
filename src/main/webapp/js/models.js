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
