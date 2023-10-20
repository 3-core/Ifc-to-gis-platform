let buildingPropertyModal = document.getElementById('building_property_modal');
let buildingPropertyModalContent = document.getElementById('building_property_modal_content')
let buildingPropertyCloseModal = document.getElementById('building_property_modal_close')
let buildingPropertyModalButton = document.getElementById('building_property_modal_button')

function onClickBuildingPropertyModalButton() {
    toggleBuildingPropertyModal()
}

function toggleBuildingPropertyModal() {
    console.log(buildingPropertyModalContent.style.display)
    if(buildingPropertyModalContent.style.display === 'block') {
        buildingPropertyModal.style.display = 'none';
        buildingPropertyModalContent.style.display = 'none';

    } else {
        buildingPropertyModal.style.display='block';
        buildingPropertyModalContent.style.display = 'block';
    }
}

buildingPropertyCloseModal.addEventListener('click', onClickBuildingPropertyModalButton)
buildingPropertyModalButton.addEventListener('click', onClickBuildingPropertyModalButton)
