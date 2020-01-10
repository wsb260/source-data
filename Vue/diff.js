// 规则:当节点类型相同时,去看一下属性是否相同,产生一个属性的不定包{type:ATTRS',attrs:{class:xxx}}
//     新的dom节点不存在{type:'REMOVE',index:xxx}
//     节点类型不同,直接采用替换模式{type:'REPLACE',newNode:newNode}
//     文本的变化{type:'TEXT',text:xxx}
function diff(oldTree,newTree) {
// 大补丁包 
  let patches = {}
  let index = 0
  // 递归树 比较后的结果放到补丁包中
  walk(oldTree,newTrss,index,patches)
  return patches
}

const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0
// 递归树
function walk(oldNode,newNode,index,patches){
  let currentPatch = []
  if(!newNode){ // 节点被移除
    currentPatch.push({type:REMOVE,index})
  }
  // 判断是否是文本类型
  else if(isString(oldNode) && isString(newNode)){
    if(oldNode !== newNode){
      currentPatch.push({type:TEXT,text:newNode})
    }
  }else if(oldNode.type === newNode.type){ // 是否是节点类型
  // 1.比较属性是否更改 返回变化的属性对象补丁包
    let attrs = diffAttr(oldNode.props,newNode.props)
    if(Object.keys(attrs).length>0){
      currentPatch.push({type:ATTRS,attrs})
    }
  // 2.比较子节点
    diffChildren(oldNode.chiildren,newNode.children)
  }else { // 节点被替换
    currentPatch.push({type:REPLACE,newNode:newNode  })
  }
  // 如果补丁包里有东西,将元素和补丁包对应起来放到大补丁包中
  if(currentPatch.length>0){
    patches[index] = currentPatch
  }
}
// 对比老属性和新属性
function diffAttr(oldAttrs,newAttrs){
  let patch = {}
  for(let key in oldAttrs){
    if(oldAttrs[key] !== newAttrs[key]){
      patch[key] = newAttrs[key]
    }
  }
  for(let key in newAttrs){
  // 老节点没有新节点的属性
    if(!oldAttrs.hasOwnProperty(key)){
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object string]'
}

function diffChildren(oldChildren,newChildren,index,patches){
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child,idx)=>{
    // 递归
    // Index每次传递给walk时,Index是递增的,所有人都基于一个序号实现
    walk(child,newChildren[idx],++Index,patches)
  })
}
export default diff
