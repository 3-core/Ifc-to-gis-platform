document.addEventListener("DOMContentLoaded", function () {
    const buildingKindSelect = document.getElementById("buildingKind");
    const buildingFieldSelect = document.getElementById("buildingField");

    buildingKindSelect.addEventListener("change", function () {
        const selectedValue = buildingKindSelect.value;
        buildingFieldSelect.innerHTML = "<option value='00'>검색필드</option>";

        if (selectedValue === "01") { // 병원 선택
            buildingFieldSelect.innerHTML += "<option value='01'>병상수</option>";
        } else if (selectedValue === "02") { // 약국 선택
            buildingFieldSelect.innerHTML += "<option value='02'>면적</option>";
        } else if (selectedValue === "03") { // 어린이집 선택
            buildingFieldSelect.innerHTML += "<option value='03'>보육실수</option>";
        }
    });
});