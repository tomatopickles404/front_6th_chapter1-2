const eventHandlers = new WeakMap();

const handleEvent = (event) => {
  const { target, type } = event;

  const elementHandlers = eventHandlers.get(target);

  if (elementHandlers && elementHandlers.has(type)) {
    const handler = elementHandlers.get(type);
    handler(event);
  }
};

export function setupEventListeners(root) {
  const eventTypes = ["click", "mouseover", "focus", "keydown", "submit", "change"];

  eventTypes.forEach((eventType) => {
    root.addEventListener(eventType, handleEvent);
  });

  return () => {
    eventTypes.forEach((eventType) => {
      root.removeEventListener(eventType, handleEvent);
    });
  };
}

export function addEvent(element, eventType, handler) {
  if (!eventHandlers.has(element)) {
    eventHandlers.set(element, new Map());
  }

  const elementHandlers = eventHandlers.get(element);
  elementHandlers.set(eventType, handler);
}

export function removeEvent(element, eventType) {
  const elementHandlers = eventHandlers.get(element);
  if (elementHandlers) {
    elementHandlers.delete(eventType);

    if (elementHandlers.size === 0) {
      eventHandlers.delete(element);
    }
  }
}
