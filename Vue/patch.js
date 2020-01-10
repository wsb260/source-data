 import { Element, render } from './element'
let allPatches;
  let index = 0;
// 给原始dom打补丁
function patch(node,patches){
  allPatches = patches;
  walk(node)
}

function walk(node) {
  let currentPatch = allPatches[index++];
  let childNodes = node.childNodes;
  childNodes.forEach(child => walk(chilk));
  if(currentPatch){
    doPatch(node,currentPatch)
  }
}

// 更新节点
function doPatch(node,patches){
  patches.forEach(patch=>{
    switch(patch.type){
      case 'ATTRS':
        for(let key in patch.attrs){
          let value = patch.attrs[key]
          if(value){
            setAttr(node,key,value)
          }else{
            node.removeAttribute(key)
          }
        }
        break;
      case 'TEXT':
        node.textContent = patch.text;
        break;
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Element ? render(patch.newNode):document.createTextNode(patch.newNode))
        // 替换新的节点
        node.parentNode.replaceChild(newNode,node)
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break;
       default:
        break;
    }
  })
}
export default patch
