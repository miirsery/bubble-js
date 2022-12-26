export function h(tag: any, props: any, children: any) {
    return {
        h,
        tag,
        props,
        children
    }
}

export function mount(vnode: any, container: any) {
    const el = document.createElement(vnode.tag)

    for (const key in vnode.props) {
        el.setAttribute(key, vnode.props[key])
    }

    if (typeof vnode.children === 'string')
        el.textContent = vnode.children
    else {
        vnode.children.forEach((child: any) => {
            mount(child, el)
        });
    }

    if (container) {
        
        container.appendChild(el)
    }

    vnode.$el = el  
}


export function unmount(vnode: any) {
    vnode.$el.parentNode.removeChild(vnode.$el)
}

export function patch(n1: any, n2: any) {
    if (n1.tag !== n2.tag) {
        mount(n2, n1.$el.parentNode)

        unmount(n1)
    } else {
        n2.$el = n1.$el

        if (typeof n2.children === 'string')
            n2.$el.textContent = n2.children
        else {
            while (n2.$el.attributes.length > 0) {
                n2.$el.removeAttribute(n2.$el.attributes[0].name)
            }

            for (const key in n2.props) {
                n2.$el.setAttribute(key, n2.props[key])
            }

            if (typeof n1.children === 'string') {
                n2.$el.textContent = null

                n2.children.forEach((child: any) => {
                    mount(child, n2.$el)
                })
            } else {
                const commonLength = Math.min(n1.children.length, n2.children.length)

                for (let i = 0; i < commonLength; i++) {
                    patch(n1.children[i], n2.children[i])
                }

                if (n1.children.length > n2.children.length) {
                    n1.children.slice(n2.children.length).forEach((child: any) => {
                        unmount(child)
                    })
                } else if (n2.children.length > n1.children.length) { 
                    n2.children.slice(n1.children.length).forEach((child: any) => {
                        mount(child)
                    })
                }
            }
        }
    }
}