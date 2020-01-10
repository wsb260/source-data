class Element {
  constructor(type,props,children){
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

// 给节点设置属性
function setAttr(node,key,value){
  switch(key) {
    case 'value': // node是一个input或者textarea
        if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA'){
          node.value = value
        }else{
          node.setAttribute(key,value)
        }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key,value)
      break;
  }
}

// 创建虚拟dom实例
function createElement(type,props,children){
  return new Element(type,props,children)
}

// render方法可以将vnode转换为真是dom
function render(eleObj){
  let el = document.createElement(eleObj.type)
  for(let key in eleObj.props){
    // 设置属性的方法
    setAttr(el,key,eleObj.props[key])
  }
  // 遍历渲染子节点
  eleObj.children.forEach(child=>{
    child = (child instanceof Element) ? render(child):document.createTextNode(child)
    el.appendChild(child)
  })
  return el;
}
// 挂载到页面中
function renderDom(el,target){
  target.appendChild(el)
}
export { createElement, render, Element, renderDom }
