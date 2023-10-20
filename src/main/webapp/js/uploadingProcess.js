document.addEventListener("DOMContentLoaded", function() {
    const textArray = [
        '위치정보 확인중',
        'GLB로 변환중',
        '속성정보 추출중',
        '속성정보 저장중'
    ];

    let currentIndex = 0;
    let uploadTextElement = document.getElementById('uploading-text');
    let uploadButton = document.getElementById('upload_button');

    function displayText() {
        if (currentIndex < textArray.length) {
            uploadTextElement.innerHTML = textArray[currentIndex];
            currentIndex++;

            setTimeout(displayText, 3000);
        }
    }

    uploadButton.addEventListener('click', displayText);
});
