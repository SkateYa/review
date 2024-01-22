import { ATTR, TEXT, REPLACE, REMOVE } from "./pathTypes";

let patches = {};
let vnIndex = 0;
function domDiff(oldVDom, newVDom) {
  let index = 0;
  vNodeWalk(oldVDom, newVDom, index);
  return patches;
}

function vNodeWalk(oldNode, newNode, index) {
  let vnPatch = [];

  if (!newNode) {
    // 删除节点
    vnPatch.push({
      type: REMOVE,
      index,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    // 文本节点 （改变节点）
    if (oldNode !== newNode) {
      vnPatch.push({
        type: TEXT,
        text: newNode,
      });
    }
  } else if (oldNode.type === newNode.type) {
    // 标签名相同，对比属性
    const attPatch = attrsWalk(oldNode.props, newNode.props);

    if (Object.keys(attPatch).length > 0) {
      vnPatch.push({
        type: ATTR,
        attrs: attPatch,
      });
    }
    childrenWalk(oldNode.children, newNode.children);
    console.log("attPatch", attPatch);
  } else {
    // 替换
    vnPatch.push({
      type: REPLACE,
      newNode,
    });
  }
  if (vnPatch.length > 0) {
    patches[index] = vnPatch;
  }
}

function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {};
  for (let key in oldAttrs) {
    // 修改属性
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key];
    }
  }
  for (let key in newAttrs) {
    // 新增属性
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }
  return attrPatch;
}

function childrenWalk(oldChildren, newChildren) {
  //   console.log("newChildren", oldChildren, newChildren);
  oldChildren.map((c, idx) => {
    vNodeWalk(c, newChildren[idx], ++vnIndex);
  });
}

export default domDiff;
