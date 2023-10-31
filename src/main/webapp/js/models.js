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
        127.105482702949,
        35.8198364247799,
        100
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(198), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const siheung_floor_model = Ditap.Model.fromGltf({
    id: "siheung_floor_model",
    url: "public/glb/siheung/siheung_station_length.glb",
    modelMatrix: siheung_floor_model_matrix,
});

const siheung_wrong_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.105982702949,
        35.8191364247799,
        34.98499999999889
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(48), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const siheung_wrong_model = Ditap.Model.fromGltf({
    id: "siheung_wrong_model",
    url: "public/glb/siheung/siheung_station.glb",
    modelMatrix: siheung_wrong_model_matrix,
});

const siheung_station_background_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.105482702949,
        35.8197814247799,
        26.39499999999889
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(180), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const siheung_station_location_model = Ditap.Model.fromGltf({
    id: "siheung_station_location",
    url: "public/glb/siheung/siheung.glb",
    modelMatrix: siheung_station_background_matrix,
});

//전주
const lx_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
    new Ditap.Cartesian3.fromDegrees(
        127.06538207261136,
        35.83800908939431,
        51.00
    ),
    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(0), 0, 0),
    Ditap.Ellipsoid.WGS84,
    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
);

const lx_model = Ditap.Model.fromGltf({
    id: "lx_model",
    url: "public/glb/lx_jeonju/lx_jeonju.glb",
    modelMatrix: lx_model_matrix,
});


