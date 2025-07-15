import { isFalsy } from "../utils/isFalsy";

export function createVNode(type, props, ...children) {
  return {
    type,
    props,
    children: children.filter((child) => !isFalsy(child)).flat(),
  };
}
