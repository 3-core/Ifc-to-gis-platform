//const siheung_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
//    new Ditap.Cartesian3.fromDegrees(
//        127.058968,
//        35.835169,
//        34.97499999999889
//    ),
//    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(18), 0, 0),
//    Ditap.Ellipsoid.WGS84,
//    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
//);
//
//const siheung_model = Ditap.Model.fromGltf({
//    id: "siheung_model",
//    url: "public/glb/siheung/siheung_demonstration.glb",
//    modelMatrix: siheung_model_matrix,
//});

const siheung_floor_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.058968,
        35.835169,
        34.97499999999889
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(18), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const siheung_floor_model = Ditap.Model.fromGltf({
    id: "siheung_floor_model",
    url: "public/glb/siheung/siheung_demonstration_floor.glb",
    modelMatrix: siheung_floor_model_matrix,
});

const siheung_wrong_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.058968,
        35.835169,
        34.97499999999889
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(228), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const siheung_wrong_model = Ditap.Model.fromGltf({
    id: "siheung_wrong_model",
    url: "public/glb/siheung/siheung_demonstration.glb",
    modelMatrix: siheung_wrong_model_matrix,
});



