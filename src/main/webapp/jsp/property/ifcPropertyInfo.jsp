<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<style>
	#combined-info {
        color: black;
        overflow-x: hidden;
        overflow-y: auto;
        height: 320px;
        max-height: 500px;
        padding: 5px;
    }

    .key, .value {
        flex-shrink: 0;
        align-items: center;
        background-color: transparent;
    }

    .key {
        width: 100px;
        font-size: 12px;
    }

    .value {
        overflow-wrap: break-word;
        word-wrap: break-word;
        flex-grow: 1;
        max-width: calc(100% - 110px);
        font-size: 12px
    }

    #property-section, #pset-section {
        margin-left: 5px;
    }

    #combined-info::-webkit-scrollbar {
        width: 12px;
    }

    #combined-info::-webkit-scrollbar-thumb {
        background-color: #00b8a3;
        border-radius: 6px;
        border: 3px solid white;
    }

    #combined-info::-webkit-scrollbar-track {
        border-radius: 6px;
    }
</style>

<script>
	const specialKeys = {
        mm: ["폭", "Height", "Length", "Width", "길이", "거리", "간격띄우기"],
        squareMeters: ["Area", "면적"],
        cubicMeters: ["Volume", "볼륨", "체적"],
    };

	function normalized(str) {
        return str.toLowerCase().trim();
    }

	function displaySectionData(data, sectionId) {
        const section = document.getElementById(sectionId);
            let count = 0;

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];

                    if (typeof value === 'object' && value !== null) {
                        // 객체의 각 속성을 추가로 표시 (예: 'Reference', 'id' 등)
                        for (const subKey in value) {
                            if (value.hasOwnProperty(subKey)) {
                                displayKeyValue(subKey, value[subKey], section, count);
                                count++;
                            }
                        }
                    } else {
                        displayKeyValue(key, value, section, count);
                        count++;
                    }
                }
            }
    }

    function displayKeyValue(key, value, section, count) {
        const pairDiv = document.createElement('div');
        pairDiv.style.display = 'flex';
        pairDiv.style.alignItems = 'center';
        pairDiv.style.padding = "5px 5px 5px 5px";
        pairDiv.style.backgroundColor = count % 2 === 0 ? 'white' : '#f2f2f2';

        const keyDiv = document.createElement('div');
        keyDiv.className = 'key';
        keyDiv.style.wordWrap = 'break-word'

        let displayKey = key;

        for (const unit in specialKeys) {
            if (specialKeys.hasOwnProperty(unit)) {
                const normalizedKeys = specialKeys[unit].map(k => normalized(k));
                if (normalizedKeys.includes(normalized(key))) {
                    switch (unit) {
                        case "mm":
                            displayKey += " (m)";
                            break;
                        case "squareMeters":
                            displayKey += " (㎡)";
                            break;
                        case "cubicMeters":
                            displayKey += " (㎥)";
                            break;
                    }
                }
            }
        }

        keyDiv.textContent = displayKey;

        const valueDiv = document.createElement('div');
        valueDiv.className = 'value';
        valueDiv.textContent = typeof value === 'object' ? JSON.stringify(value) : value;

        pairDiv.appendChild(keyDiv);
        pairDiv.appendChild(valueDiv);

        section.appendChild(pairDiv);
    }

    document.addEventListener("DOMContentLoaded", function() {
        displaySectionData(propertyData.property, 'property-section');
        displaySectionData(propertyData.pset, 'pset-section');
    });
</script>

<div id="combined-info" style="">
	<h2 id="h2-property" style="color: black; margin: 10px 5px; font-weight: bold; display:none">Property</h2>
	<div id="property-section"></div>

	<h2 id="h2-pset" style="color: black; margin: 10px 5px; font-weight: bold; display:none">Pset</h2>
	<div id="pset-section"></div>
</div>