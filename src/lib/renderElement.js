import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
// import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  const normalizedVNode = normalizeVNode(vNode);
  // const existingElement = container.firstChild;

  // if (!existingElement) {
  const element = createElement(normalizedVNode);
  if (element && element !== "") {
    container.innerHTML = "";
    container.appendChild(element);
  }
  // } else {
  // 업데이트 렌더링: diff 알고리즘 사용
  // updateElement(existingElement, normalizedVNode, existingElement._vNode);
  // }

  if (!container._eventListenersSetup) {
    setupEventListeners(container);
    container._eventListenersSetup = true;
  }
}
