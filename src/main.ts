
import { reactive, watchEffect } from './reactivity'
import { h, mount, patch } from './reactivity/vnode';

const state = reactive({
  inputValue: ''
})

function render(text: string) {
  return h('div', { class: 'container' }, [
    h('h1', {title: 'this is title'}, 'adasdad -- updated'),
    h('div', {class: 'description'}, [
      h('img', {
        src: 'https://i.ytimg.com/vi/X-XZx1o_w-A/maxresdefault.jpg',
        style: 'width: 300px;'
      }, []),
      h('p', {}, text),
      h('input',{ id: 'input-1' }, []),
    ]),
  ])
} 

let currentNode: any;

watchEffect(() => {
  if (!currentNode) {
    currentNode = render(state.inputValue)

    mount(currentNode, document.getElementById('app'))
  } else {
    const newNode = render(state.inputValue)

    patch(currentNode, newNode)
    
    currentNode = newNode
  }
})

const input = document.getElementById('input-1') as HTMLInputElement


input?.addEventListener('input', function (event: any) {
  const target = event.target as HTMLInputElement;
  state.inputValue = target.value
});


export default {}

