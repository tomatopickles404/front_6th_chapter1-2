import { isArray, isFalsy } from "../utils";

const createTextNode = (text) => document.createTextNode(text);

const createFragment = (vNode) => {
  const fragment = document.createDocumentFragment();
  for (const child of vNode) {
    fragment.appendChild(createElement(child));
  }
  return fragment;
};

const createDOMElement = (vNode) => {
  const $el = document.createElement(vNode.type);
  updateAttributes($el, vNode.props);
  for (const child of vNode.children) {
    $el.appendChild(createElement(child));
  }
  return $el;
};

const handlers = {
  string: createTextNode,
  number: createTextNode,
  object: (vNode) => {
    if (isArray(vNode)) return createFragment(vNode);
    if (vNode.type) return createDOMElement(vNode);
    return "";
  },
};

export function createElement(vNode) {
  if (isFalsy(vNode)) return createTextNode("");

  const handler = handlers[typeof vNode];
  return handler ? handler(vNode) : "";
}

function updateAttributes($el, props) {
  if (isFalsy(props)) return;

  for (const [key, value] of Object.entries(props)) {
    if (key === "children") continue;
    if (key === "className") {
      $el.className = value;
    } else {
      $el.setAttribute(key, value);
    }
  }
}
