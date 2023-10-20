function fileUpload() {
    const fileInput = document.getElementById('file_input');
    const fileNameDiv = document.getElementById('file_name');
    const uploadModal = document.getElementById("upload_modal");
    const overlay = document.getElementById("uploading-overlay");

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file, file.name);

        overlay.style.display = "block";

        axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function(response) {
            console.log('File uploaded successfully');
        }).catch(function(error) {
            console.error('File upload failed:', error);
        }).finally(function() {
            setTimeout(function() {
                uploadModal.style.display = "none";
                overlay.style.display = "none";
                fileInput.value = '';
                fileNameDiv.innerText = '선택된 IFC 파일이 없습니다.';
            }, 20000);
        });
    } else {
        alert("선택된 파일이 없습니다.")
        console.error('No file selected');
    }
}
