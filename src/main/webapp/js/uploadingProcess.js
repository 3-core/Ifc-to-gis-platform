document.addEventListener("DOMContentLoaded", function() {
    const textArray = [
        '위치정보 확인중',
        'GLB로 변환중',
        '속성정보 추출중',
        '속성정보 저장중'
    ];

    const uploadTextElement = document.getElementById('uploading-text');
    const uploadButton = document.getElementById('upload_button');

    function displayText(index = 0) {
        if (index < textArray.length) {
            uploadTextElement.innerHTML = textArray[index];
            setTimeout(function() {
                displayText(index + 1);
            }, 3500);
        }
    }

    uploadButton.addEventListener('click', function() {
        displayText();
    });
});
