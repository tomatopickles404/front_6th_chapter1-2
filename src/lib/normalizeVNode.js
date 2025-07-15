const isFalsy = (vNode) => vNode === null || typeof vNode === "undefined" || typeof vNode === "boolean";

export function normalizeVNode(vNode) {
  if (isFalsy(vNode)) return "";
  const safeChildren = vNode.children ?? [];

  // console.log("vNode", vNode);

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  // 함수형 컴포넌트 재귀 처리
  if (typeof vNode.type === "function") {
    const safeProps = vNode.props ?? {};
    // children을 포함하여 전달
    const propsWithChildren = { ...safeProps, children: safeChildren };
    return normalizeVNode(vNode.type(propsWithChildren));
  }

  if (Array.isArray(vNode)) {
    return vNode.filter((child) => !isFalsy(child)).flatMap((child) => normalizeVNode(child));
  }

  return {
    ...vNode,
    children: safeChildren.filter((child) => !isFalsy(child)).flatMap((child) => normalizeVNode(child)),
  };
}
