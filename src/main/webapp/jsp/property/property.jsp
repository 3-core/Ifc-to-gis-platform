<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <style>
        .tab-button {
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            transition: 0.3s;
            margin: 5px;
        }

        .tab-button:hover {
            color: #00b8a3
        }

        .tab-button-div {
            transition: border-bottom 0.3s ease-in-out;
        }

        .tab-button.active {
            font-weight: bold;
            color: #00b8a3
        }

        .tab-button-div.active {
            border-bottom: 1px solid transparent !important;
        }

        .tab-content {
            margin-top: 5px;
            height: 300px;
            padding: 15px;
            color: black;
            overflow: auto;
        }

        .tab-content::-webkit-scrollbar {
            width: 12px;
        }


        .tab-content::-webkit-scrollbar-thumb {
            background-color: #00b8a3;
            border-radius: 6px;
            border: 3px solid white;
        }

        .tab-content::-webkit-scrollbar-track {
            border-radius: 6px;
        }

        #tree-container,
        #floor-tree-container {
            font-size: 17px;
        }

        .tree-node {
            position: relative;
            padding: 5px 10px;
            padding-left: 20px;
            margin-bottom: 5px;
            transition: background-color 0.3s ease, padding 0.3s ease;
        }

        .tree-children {
            padding-left: 20px;
            font-size: 13px;
        }

        .tree-node:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: #141C26;
        }

        .tree-node.has-children:before {
            background-image: url('../public/img/plus.png');
        }

        .tree-node.expanded:before {
            background-image: url('../public/img/minus.png');
        }

        .selected {
            background-color: #00b8a3;
            color: white
        }

        .tree-node.highlighted {
            background-color: #00b8a3;
            color: white;
        }
    </style>

    <script src="../public/data/sample_type.js"></script>
    <script src="../public/data/sample_floor.js"></script>

    <script>

        function openTab(tabId) {
            let i, tabContents;
            tabContents = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabContents.length; i++) {
                tabContents[i].style.display = "none";
            }

            let buttons = document.getElementsByClassName("tab-button");
            for (i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("active");
            }

            let tabDivs = document.getElementsByClassName("tab-button-div");
            for (i = 0; i < tabDivs.length; i++) {
                tabDivs[i].classList.remove("active");
            }

            document.getElementById(tabId).style.display = "block";
            event.currentTarget.classList.add("active");
            event.currentTarget.parentElement.classList.add("active");
        }

        function renderTreeByType(organizedData, container) {
            Object.keys(organizedData).forEach(type => {
                const typeElement = createTypeNode(type);
                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'tree-children';
                childrenContainer.style.display = 'none';

                typeElement.addEventListener('click', (event) => {
                    toggleChildren(event, childrenContainer, typeElement);
                });

                organizedData[type].forEach(item => {
                    renderTreeNode(item, childrenContainer);
                });

                container.appendChild(typeElement);
                container.appendChild(childrenContainer);
            });
        }

        function toggleChildren(event, childrenContainer, nodeElement) {
            const selectedNodes = document.querySelectorAll('.tree-node.selected');
            selectedNodes.forEach(node => node.classList.remove('selected'));
            event.currentTarget.classList.add('selected');

            const isHidden = childrenContainer.style.display === 'none';
            childrenContainer.style.display = isHidden ? '' : 'none';

            if (isHidden) {
                nodeElement.classList.replace('has-children', 'expanded');
            } else {
                nodeElement.classList.replace('expanded', 'has-children');
            }
        }

        function organizeByType(treeData) {
            const organizedData = {};
            treeData.tree.forEach(item => {
                const type = item.type || 'Root';
                if (!organizedData[type]) {
                    organizedData[type] = [];
                }
                if (type === 'IfcBuildingStorey' && item.children) {
                    item.organizedChildren = organizeByType({ tree: item.children });
                }
                organizedData[type].push(item);
            });
            return organizedData;
        }

        function renderTreeNode(item, container) {
            const nodeElement = createChildNode(item);
            nodeElement.addEventListener('click', onFileTreeNodeClick);
            nodeElement.addEventListener('click', (event) => {
                const highlightedNodes = document.querySelectorAll('.tree-node.highlighted');
                highlightedNodes.forEach(node => {
                    node.classList.remove('highlighted');
                });

                const selectedNodes = document.querySelectorAll('.tree-node.selected');
                selectedNodes.forEach(node => {
                    node.classList.remove('selected');
                });
                event.currentTarget.classList.add('selected');
                event.stopPropagation();
            });
            container.appendChild(nodeElement);

            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';
            childrenContainer.style.display = 'none';
            container.appendChild(childrenContainer);

            if (item.type === 'IfcBuildingStorey' && item.children) {
                const organizedChildren = organizeByType({ tree: item.children });
                Object.keys(organizedChildren).forEach(type => {
                    const typeElement = createTypeNode(type);
                    const typeChildrenContainer = document.createElement('div');
                    typeChildrenContainer.className = 'tree-children';
                    typeChildrenContainer.style.display = 'none';

                    typeElement.addEventListener('click', (event) => {
                        toggleChildren(event, typeChildrenContainer, typeElement);
                    });

                    organizedChildren[type].forEach(childItem => {
                        renderTreeNode(childItem, typeChildrenContainer);
                    });

                    childrenContainer.appendChild(typeElement);
                    childrenContainer.appendChild(typeChildrenContainer);
                });
            } else if (item.children && item.children.length > 0) {
                item.children.forEach(child => {
                    renderTreeNode(child, childrenContainer);
                });
            }

            if ((item.children && item.children.length > 0) || (item.type === 'IfcBuildingStorey' && item.children)) {
                nodeElement.addEventListener('click', (event) => {
                    toggleChildren(event, childrenContainer, nodeElement);
                });
            }
        }


        function createTypeNode(type) {
            const typeElement = document.createElement('div');
            typeElement.className = 'tree-node type-node has-children';
            typeElement.textContent = type;
            return typeElement;
        }

        function createChildNode(item) {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'tree-node child-node';
            nodeElement.textContent = item.name || item.project_name;
            nodeElement.dataset.guid = item.guid;

            if (item.children && item.children.length > 0) {
                nodeElement.classList.add('has-children');
            }
            return nodeElement;
        }

        function highlightNodeByGuid(guid) {
            const highlightedNodes = document.querySelectorAll('.tree-node.highlighted');
            highlightedNodes.forEach(node => {
                node.classList.remove('highlighted');
            });

            const selectedNodes = document.querySelectorAll('.tree-node.selected');
            selectedNodes.forEach(node => {
                node.classList.remove('selected');
            });

            const targetGuid = ".tree-node[data-guid='" + guid + "']";
            const targetNodes = document.querySelectorAll(targetGuid);

            targetNodes.forEach(targetNode => {
                if (targetNode) {
                    let parentNode = targetNode.parentElement;
                    while (parentNode) {
                        if (parentNode.classList.contains('tree-children')) {
                            parentNode.style.display = '';
                        }
                        parentNode = parentNode.parentElement;
                    }

                    targetNode.classList.add('highlighted');
                    targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });  // 스크롤 이동
                }
            });
        }

        function fetchDataAndDisplay(guid) {
            const URL = "http://localhost:8000/ifc/properties/" + guid;

            axios.get(URL)
                .then(function (response) {
                    const propertyData = {
                        property: response.data.element_property,
                        pset: response.data.pset_property
                    };

                    document.getElementById('property-section').innerHTML = '';
                    document.getElementById('pset-section').innerHTML = '';

                    // 데이터를 받아온 후에 displaySectionData 함수를 호출합니다.
                    displaySectionData(propertyData.property, 'property-section');
                    displaySectionData(propertyData.pset, 'pset-section');
                })
                .catch(function (error) {
                    console.error(error);
                });
        }

        function onFileTreeNodeClick(event) {
            const guid = event.currentTarget.dataset.guid;
            const node = findNodeByGuid(guid);
            if (node) {
                handleNodeFocus(node);
            }
        }

        function findNodeByGuid(guid) {
            return nodeObjects[guid]._runtimeNode;
        }


        function onTreeNodeClick(event) {
            const guid = event.currentTarget.dataset.guid;
            fetchDataAndDisplay(guid);
        }

        document.addEventListener("DOMContentLoaded", function () {
            const treeContainer = document.getElementById('tree-container');

            const organizedData = organizeByType(typeTreeData);
            renderTreeByType(organizedData, treeContainer);

            const organizedFloorData = organizeByType(floorTreeData);
            const floorTreeContainer = document.getElementById('floor-tree-container');
            renderTreeByType(organizedFloorData, floorTreeContainer);

            const treeNodes = document.querySelectorAll('.tree-node');
            treeNodes.forEach(node => {
                node.addEventListener('click', onTreeNodeClick);
            });
        });
    </script>

    <div>
        <!--IFC 구조-->
        <div>
            <div style="margin-top: 30px; display: flex; justify-content: space-between;">
                <div>
                    <div style="font-size: 20px">IFC 구조</div>
                    <div style="font-size: 15px; color: #7A7A7A; margin-top: 3px">BIM 데이터의 구조를 확인할 수 있습니다.</div>
                </div>
            </div>
            <div style="margin-top:10px; background-color: white; border-radius: 10px; border: 1px solid #00b8a3">
                <div class="tabs" style="display: flex; justify-content: space-between;">
                    <div class="tab-button-div active"
                        style="flex: 1; text-align: center; border-right: 1px solid #00b8a3; border-bottom: 1px solid #00b8a3">
                        <button class="tab-button active" onclick="openTab('tab1')">유형</button>
                    </div>
                    <div class="tab-button-div" style="flex: 1; text-align: center; border-bottom: 1px solid #00b8a3">
                        <button class="tab-button" onclick="openTab('tab2')">층</button>
                    </div>
                </div>

                <div id="tab1" class="tab-content">
                    <div id="tree-container" style="display:none"></div>
                </div>
                <div id="tab2" class="tab-content" style="display:none">
                    <div id="floor-tree-container" style="display:none"></div>
                </div>
            </div>
        </div>

        <!--속성정보-->
        <div>
            <div style="margin-top: 30px">
                <div style="font-size: 20px">속성 정보</div>
                <div style="font-size: 15px; color: #7A7A7A; margin-top: 3px">객체별 속성을 확인할 수 있습니다.</div>
            </div>
            <div style="margin-top:10px; background-color: white; border-radius: 10px; border: 1px solid #00b8a3">
                <%@ include file="./ifcPropertyInfo.jsp" %>
            </div>
        </div>
    </div>

    <script>

    </script>