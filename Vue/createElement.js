import { createElement, render, renderDom } from './element.js'
import diff from './diff.js'
import patch from './patch.js'

let vertualDom1 = createElement('ul',{class:'list'},[
  createElement('li',{class:'item'},['a'])
  createElement('li',{class:'item'},['b'])
  createElement('li',{class:'item'},['c'])
])

let vertualDom2 = createElement('ul',{class:'list'},[
  createElement('li',{class:'item'},['1'])
  createElement('li',{class:'item'},['b'])
  createElement('li',{class:'item'},['3'])
])
// 将虚拟dom转换为真实dom
let el = render(vertualDom)
renderDom(el,window.root)
// 获得补丁包
let patchs = diff(vertualDom1,vertualDom2)
// 给元素打补丁 重新更新视图
patch(el,patches)
console.log(vertualDom)
