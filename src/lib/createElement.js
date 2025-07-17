import { isArray, isFalsy } from "../utils";
import { addEvent } from "./eventManager";

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

const createComponent = (vNode) => {
  if (isArray(vNode)) {
    const componentResult = vNode.type(vNode.props);
    return createElement(componentResult);
  }
  return createElement(vNode);
};

const handlers = {
  string: createTextNode,
  number: createTextNode,
  object: (vNode) => {
    if (isArray(vNode)) return createFragment(vNode);
    if (isArray(vNode.type)) return createComponent(vNode);
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

    if (key.startsWith("on")) {
      const eventType = key.slice(2).toLowerCase();
      addEvent($el, eventType, value);
      continue;
    }

    // DOM 속성이 존재하면 DOM 속성으로 설정
    if (key in $el) {
      $el[key] = value;
      continue;
    }

    // DOM 속성이 없으면 HTML 속성으로 설정
    if (typeof value === "boolean") {
      if (value) {
        $el.setAttribute(key, "");
      } else {
        $el.removeAttribute(key);
      }
    } else {
      $el.setAttribute(key, value);
    }
  }
}
