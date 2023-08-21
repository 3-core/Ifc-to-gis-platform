function closeUploadModal() {
    const uploadModal = document.getElementById("upload_modal");
    const overlay = document.getElementById("uploading-overlay");
    const fileInput = document.getElementById('file_input');
    const fileName = document.getElementById('file_name');

    uploadModal.style.display = "none";
    overlay.style.display = "none";

    fileInput.value = '';
    fileName.innerText = "선택된 IFC 파일이 없습니다.";
}