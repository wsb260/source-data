import { createElement, render, renderDom } from './element.js'

let vertualDom = createElement('ul',{class:'list'},[
  createElement('li',{class:'item'},['a'])
  createElement('li',{class:'item'},['b'])
])
// 将虚拟dom转换为真实dom
let el = render(vertualDom)
renderDom(el,window.root)

console.log(vertualDom)
