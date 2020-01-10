import { createElement, render, renderDom } from './element.js'
import diff from './diff'

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

let patchs = diff(vertualDom1,vertualDom2)
console.log(vertualDom)
