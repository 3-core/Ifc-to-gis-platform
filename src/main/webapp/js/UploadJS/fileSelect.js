function fileSelect() {
    const fileInput = document.getElementById('file_input');
    const fileName = document.getElementById('file_name');

    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const extension = file.name.split('.').pop().toLowerCase();

            if (extension !== 'ifc')  {
                if(extension !== 'las'){
                    alert("IFC, LAS 파일만 선택이 가능합니다. 다시 파일을 선택해 주세요")
                    return;
                }
            }

            fileName.textContent = file.name;
        } else {
            fileName.textContent = '선택된 파일 없습니다.';
        }
        console.log('Changed file name:', fileName.textContent);
    });
}

document.addEventListener('DOMContentLoaded', fileSelect);
