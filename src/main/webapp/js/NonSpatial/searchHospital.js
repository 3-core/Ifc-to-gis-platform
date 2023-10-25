function searchHospital() {
    const buildingKindSelect = document.getElementById("buildingKind");
    const selectedValue = buildingKindSelect.value;

    let jsonDataPath = "../../public/buildings/";
    switch (selectedValue) {
        case "01": // 병원
            jsonDataPath += "output_Search1.json";
            break;
        case "02": // 약국
            jsonDataPath += "output_Search2.json";
            break;
        case "03": // 어린이집
            jsonDataPath += "output_Search3.json";
            break;
        default:
            jsonDataPath = "검색결과 없음"; // 이외의 선택에 대한 처리
            break;
    }

    if (jsonDataPath !== "검색결과 없음") {
        fetch(jsonDataPath)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                all_tree_data = data;
                jstreeBuildingsInstance.settings.core.data = all_tree_data;
                jstreeBuildingsInstance.refresh(false);
            });
    }
}
