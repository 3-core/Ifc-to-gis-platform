let isFloorModelVisible = false;

document.addEventListener("DOMContentLoaded", function () {
	const model_change_button = document.getElementById('model-change-button')

	model_change_button.addEventListener('click', function() {
		if (isFloorModelVisible) {
                siheung_floor_model.show = false;

                siheung_wrong_model.show = true;

                model_change_button.style.backgroundColor = "grey"
            } else {
                siheung_wrong_model.show = false;

                siheung_floor_model.show = true;

                model_change_button.style.backgroundColor = "#00b8a3"
            }
            isFloorModelVisible = !isFloorModelVisible;
	})
})
