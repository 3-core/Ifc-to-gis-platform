
function searchAdmin() {
    let selectedAdminCode = $("#emd option:selected").val();
    if(selectedAdminCode == "01") {
        fetch("../../public/buildings/output_admin_01.json")
            .then(function(response) {
                return response.json();
            })
            .then(function (data){
                all_tree_data = data;
                jstreeBuildingsInstance.settings.core.data=all_tree_data;
                jstreeBuildingsInstance.refresh(false);
            });
    }
    else if(selectedAdminCode == "02") {
        fetch("../../public/buildings/output_admin_02.json")
            .then(function(response) {
                return response.json();
            })
            .then(function (data){
                all_tree_data = data;
                jstreeBuildingsInstance.settings.core.data=all_tree_data;
                jstreeBuildingsInstance.refresh(false);
            });
    }
    $("#building-list").on("select_node.jstree", function (e, data) {
            var selectedText = data.node.text;

            onResultListItemSelected(selectedText);
        });
    }

    function onResultListItemSelected(selectedText) {
        const selectedPharmacy = all_info.find(pharmacy => pharmacy["사업장명"] === selectedText);

        if (selectedPharmacy) {
            const pharmacyId = selectedPharmacy["id"];

            changeBuildingModelColor(pharmacyId);
        }
    }

    function changeBuildingModelColor(pharmacyId) {
    }

var selectRectangle = null;

function queryRectangle()
{
    let measure = Heliosen.measure;
    measure.resetEvent();
    measure.setEvent('area');
}

