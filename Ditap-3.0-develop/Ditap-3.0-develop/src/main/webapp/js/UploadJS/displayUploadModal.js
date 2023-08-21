function displayUploadModal() {
    const uploadModal = document.getElementById("upload_modal");
    const btn = document.getElementById("upload_modal_button");

    btn.onclick = function () {
        uploadModal.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', displayUploadModal);