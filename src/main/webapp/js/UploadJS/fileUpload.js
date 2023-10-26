function lasActivate() {

    // loding 닫기
    const overlay = document.getElementById("uploading-overlay");
    overlay.style.display = "none";

    //upload popup 닫기
    const uploadModal = document.getElementById("upload_modal");
    const uploadModalButton = document.getElementById("upload_modal_button");

    if (uploadModal.style.display === 'block') {
        uploadModal.style.display = "none";
    } else {
        uploadModal.style.display = "block";
    };

    //las 버튼 활성화
    const classes = document.getElementById("ditap-weather").classList;
    if (classes.contains('on')) {

        document.getElementById("ditap-weather").classList.remove('on');
        //바운딩 박스 버튼 안보이게
        $("#ditap-box-btn-id").css("display", "none");
        document.getElementById("ditap-box").classList.remove('on');
        globalTileset.debugShowBoundingVolume = false;

        removeTilesetToCesium()

    } else {
        document.getElementById("ditap-weather").classList.add('on');
        //바운딩 박스 버튼 보이게
        $("#ditap-box-btn-id").css("display", "block");
        addTilesetListToCesium(viewer, "pointCloudFull", tilesetURLList["pointCloudFull"]);
        addTilesetChangLocation();
    }

}

function fileUpload() {
    const fileInput = document.getElementById('file_input');
    const fileNameDiv = document.getElementById('file_name');
    const uploadModal = document.getElementById("upload_modal");
    const overlay = document.getElementById("uploading-overlay");

    //확장자 추출
    const extension = fileInput.value.split('.').pop().toLowerCase();

    if (extension == "las") {

        overlay.style.display = "block";

        var timer;
        clearTimeout(timer);
        timer = setTimeout("lasActivate()", 7000); //7초 뒤 함수 실행

    } else {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file, file.name);

            overlay.style.display = "block";

            //const URL = "http://localhost:8000/upload";
             const URL = "http://office.heliosen.co.kr:8000/upload"

            axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                console.log('File uploaded successfully');
            }).catch(function (error) {
                console.error('File upload failed:', error);
            }).finally(function () {
                setTimeout(function () {
                    uploadModal.style.display = "none";
                    overlay.style.display = "none";
                    fileInput.value = '';
                    fileNameDiv.innerText = '선택된 IFC 파일이 없습니다.';
                }, 1500);
            });
        } else {
            alert("선택된 파일이 없습니다.")
            console.error('No file selected');
        }
    }
}
