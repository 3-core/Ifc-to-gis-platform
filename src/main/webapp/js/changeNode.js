function changeNodeColor(node) {
    const color = new Ditap.Cartesian4(0, 230, 202, 0.1);
    const primitives = node.runtimePrimitives;

    for (const primitive of primitives) {
        color.w = primitive.primitive.material.metallicRoughness.baseColorFactor.w;
        primitive.primitive.material.metallicRoughness.baseColorFactor = color;
    }
}

function resetNodeColor(node, originalColor) {
    const primitives = node.runtimePrimitives;
    for (const primitive of primitives) {
        primitive.primitive.material.metallicRoughness.baseColorFactor = originalColor;
    }
}

let preNode;
let preColor;

function handleNodeFocus(node) {
    if (preNode && preColor) {
        resetNodeColor(preNode, preColor);
    }

    const primitives = node.runtimePrimitives;
    if (primitives.length > 0) {
        preColor = primitives[0].primitive.material.metallicRoughness.baseColorFactor.clone();
    }

    changeNodeColor(node);
    preNode = node;
}