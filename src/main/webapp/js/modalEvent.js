let modal = document.getElementById('property_modal');
let propertyModalContent = document.getElementById('property_modal_content')
let nonPropertyModalContent = document.getElementById('non_property_modal_content')

let closePropertyModal = document.getElementById('property_modal_close')
let closeNonPropertyModal = document.getElementById('non_property_modal_close')

let propertyModalButton = document.getElementById('property_modal_button')
let nonPropertyModalButton = document.getElementById('non_property_modal_button')

function showPropertyModal() {
    propertyModalContent.style.display = 'block';
    nonPropertyModalContent.style.display = 'none';
}

function onClickPropertyModalButton() {
    togglePropertyModal()
    nonPropertyModalContent.style.display = 'none'
}

function onClickNonPropertyModalButton() {
    toggleNonPropertyModal()
    propertyModalContent.style.display = 'none'
}

function togglePropertyModal() {
    if(propertyModalContent.style.display === 'block') {
        propertyModalContent.style.display = 'none'
    } else {
        propertyModalContent.style.display = 'block'
    }
}

function toggleNonPropertyModal() {
    if(nonPropertyModalContent.style.display === 'block') {
        nonPropertyModalContent.style.display = 'none'
    } else {
        nonPropertyModalContent.style.display = 'block'
    }
}

nonPropertyModalButton.addEventListener('click', onClickNonPropertyModalButton)
propertyModalButton.addEventListener('click', onClickPropertyModalButton)

closePropertyModal.addEventListener('click', onClickPropertyModalButton)
closeNonPropertyModal.addEventListener('click', onClickNonPropertyModalButton)