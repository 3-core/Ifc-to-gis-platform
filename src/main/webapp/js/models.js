const siheung_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.058968,
        35.835069,
        34.97499999999889
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(18), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const siheung_model = Ditap.Model.fromGltf({
    id: "lx_jeonju",
    url: "public/glb/siheung/siheung_demonstration.glb",
    modelMatrix: siheung_model_matrix,
});