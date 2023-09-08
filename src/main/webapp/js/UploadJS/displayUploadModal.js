const uploadModal = document.getElementById("upload_modal");
const uploadModalButton = document.getElementById("upload_modal_button");

function openUploadModal() {
    if (uploadModal.style.display === 'block') {
        uploadModal.style.display = "none";
    } else {
        uploadModal.style.display = "block";
    };
};

uploadModalButton.addEventListener('click', openUploadModal)