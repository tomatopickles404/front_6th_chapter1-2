import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";

export function renderElement(vNode, container) {
  // vNode를 정규화
  const normalizedVNode = normalizeVNode(vNode);

  // 기존 DOM이 있는지 확인
  const existingElement = container.firstChild;

  if (!existingElement) {
    // 초기 렌더링: 컨테이너 초기화 후 새로 생성
    container.innerHTML = "";
    const element = createElement(normalizedVNode);
    if (element && element !== "") {
      container.appendChild(element);
    }
  } else {
    // 업데이트 렌더링: diff 알고리즘 사용
    // 기존 vNode 구조를 추정 (실제로는 이전 vNode를 저장해야 함)
    // 현재는 간단히 기존 요소를 교체하는 방식으로 구현
    const newElement = createElement(normalizedVNode);
    if (newElement && newElement !== "") {
      container.replaceChild(newElement, existingElement);
    }
  }

  // 이벤트를 등록합니다. (컨테이너 위임)
  setupEventListeners(container);
}
