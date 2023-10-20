function searchHospital() {
    let numberOfBed = $('#number_of_bed').val();
    if(numberOfBed > 0) {
        fetch("../../public/buildings/output_hospital.json")
            .then(function(response) {
                return response.json();
            })
            .then(function (data){
                all_tree_data = data;
                jstreeBuildingsInstance.settings.core.data=all_tree_data;
                jstreeBuildingsInstance.refresh(false);
            });
    }
}