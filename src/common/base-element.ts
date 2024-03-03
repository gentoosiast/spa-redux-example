export class BaseElement {
  private readonly node;

  constructor(
    tag = 'div',
    cssClasses: string[] = [],
    attributes: Record<string, string> = {},
    innerContent = '',
  ) {
    this.node = document.createElement(tag);

    if (cssClasses.length > 0) {
      this.node.classList.add(...cssClasses);
    }

    this.setAttributes(attributes);
    this.node.innerHTML = innerContent;
  }

  getNode() {
    return this.node;
  }

  append(...children: (HTMLElement | BaseElement)[]) {
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        this.node.append(child);
      } else if (child instanceof BaseElement) {
        this.node.append(child.node);
      }
    });
  }

  appendTo(parent: HTMLElement | BaseElement) {
    if (parent instanceof HTMLElement || parent instanceof BaseElement) {
      parent.append(this.node);
    }
  }

  setTextContent(text: string) {
    this.node.innerText = text;
  }

  getAttribute(attribName: string) {
    return this.node.getAttribute(attribName);
  }

  setAttributes(attribs: Record<string, string>) {
    Object.entries(attribs).forEach(([attrName, attrValue]) =>
      this.node.setAttribute(attrName, attrValue),
    );
  }

  addListener(eventName: string, listener: VoidFunction) {
    this.node.addEventListener(eventName, listener);
  }

  removeListener(eventName: string, listener: VoidFunction) {
    this.node.removeEventListener(eventName, listener);
  }

  replaceChildren(...children: (HTMLElement | BaseElement)[]) {
    const elements = children.map((child) => {
      if (child instanceof BaseElement) {
        return child.node;
      }
      return child;
    });
    this.node.replaceChildren(...elements);
  }

  remove() {
    this.node.remove();
  }
}
