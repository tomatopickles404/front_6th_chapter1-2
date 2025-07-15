const eventHandlers = new Map();

const handleEvent = (event) => {
  const { target, type } = event;
  const key = `${target.id}-${type}`;
  const eventHandler = eventHandlers.get(key);

  if (eventHandler) {
    eventHandler(event);
  }
};

export function setupEventListeners(root, eventType = "click") {
  root.addEventListener(eventType, handleEvent);

  return () => {
    root.removeEventListener(eventType, handleEvent);
  };
}

export function addEvent(element, eventType, handler) {
  const key = `${element.id}-${eventType}`;
  eventHandlers.set(key, handler);
}

export function removeEvent(element, eventType) {
  const key = `${element.id}-${eventType}`;
  eventHandlers.delete(key);
}
