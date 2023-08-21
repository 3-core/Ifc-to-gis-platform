const modal = document.getElementById("modal_div");
function closeModal() {
    modal.style.display = "none";
}

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", closeModal);

function openModal(data) {
    const { element_property, pset_property } = data;
    const excludeKeys = ["OwnerHistory", "ObjectPlacement", "Representation"];

    let elementPropertyTable = "<h2>Element Property</h2><table>";
    for (let key in element_property) {
        if (!excludeKeys.includes(key)) {
            const value = renderValue(element_property[key]);
            elementPropertyTable += "<tr><th>" + key + "</th><td>" + value + "</td></tr>";
        }
    }
    elementPropertyTable += "</table>";

    let groupedProperties = {};
    for (let key in pset_property) {
        let prefix;
        if (key.includes(".")) {
            prefix = key.split(".")[0];
        } else {
            prefix = "";
        }
        if (!groupedProperties[prefix]) {
            groupedProperties[prefix] = {};
        }
        groupedProperties[prefix][key] = pset_property[key];
    }

    let psetPropertyTables = "<h2>Pset Property</h2>";
    for (let group in groupedProperties) {
        psetPropertyTables += "<h3>" + group + "</h3><table>";
        for (let key in groupedProperties[group]) {
            let value = renderValue(groupedProperties[group][key]);
            psetPropertyTables += "<tr><th>" + key + "</th><td>" + value + "</td></tr>";
        }
        psetPropertyTables += "</table>";
    }

    document.getElementById("modalContent").innerHTML = elementPropertyTable + "<br>" + psetPropertyTables;
    modal.style.display = "block";
}

function renderValue(value) {
    const specialKeys = {
        mm: ["폭", "Height", "Length", "Width", "길이", "거리", "간격띄우기"],
        squareMeters: ["Area", "면적"],
        cubicMeters: ["Volume", "볼륨", "체적"],
    };

    if (typeof value === "object" && value !== null) {
        let output = "<table>";
        for (let key in value) {
            let displayKey = key;
            if (specialKeys.mm.some((specialKey) => key.includes(specialKey))) {
                displayKey += " (m)";
            }
            if (specialKeys.squareMeters.some((specialKey) => key.includes(specialKey))) {
                displayKey += " (㎡)";
            }
            if (specialKeys.cubicMeters.some((specialKey) => key.includes(specialKey))) {
                displayKey += " (㎥)";
            }
            output += "<tr><th>" + displayKey + "</th><td>" + value[key] + "</td></tr>";
        }
        output += "</table>";
        return output;
    } else {
        return value;
    }
}
