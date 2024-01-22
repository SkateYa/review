import Element from "./Element";

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function setAttrs(node, prop, value) {
  console.log("setAttrs", node, prop, value);
  switch (prop) {
    case "value":
      console.log("value=====", value);
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      console.log('other', prop)
      node.setAttribute(prop, value);
      break;
  }
}

function render(vDom) {
  console.log("vDom", vDom);
  let { type, props, children } = vDom;
  let el = document.createElement(type);

  for (let key in props) {
    setAttrs(el, key, props[key]);
  }
  children.map(c=>{
   c = c instanceof Element ? render(c) : document.createTextNode(c)
   el.appendChild(c)
  })
  return el
}

function renderDom(el, rootEl){
  rootEl.appendChild(el)
}

export { createElement, render, setAttrs, renderDom };
