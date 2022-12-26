let activeEffect: any;

export function watchEffect(fn: Function) {
    activeEffect = fn
    fn()
    activeEffect = null
}

class Dependency {
    private subscribers;

    constructor() {
        this.subscribers = new Set()
    }

    depend() {
        if (activeEffect) this.subscribers.add(activeEffect)
    }

    notify() {
        this.subscribers.forEach((subscriber: any) => subscriber())
    }
}

// export function reactive(obj: any) {   
//     Object.keys(obj).forEach((key: any) => {
//         const dep = new Dependency()
//         let value = obj[key]

//         Object.defineProperty(obj, key, {
//             get() {
//                 dep.depend()

//                 return value
//             },
//             set(newValue) {
//                 if (newValue !== value) {
//                     value = newValue

//                     dep.notify()
//                 }
//             }
//         })
//     })

//     return obj
// }

export function reactive(obj: any) {  
    const dep = new Dependency()

    const handler: ProxyHandler<any> = {
        get(target: any, prop: any, receiver: any) {
            dep.depend()

            return Reflect.get(target, prop, receiver)
        },
        set(target: any, prop: any, value: any) {
                target[prop] = value

                dep.notify()

                return Reflect.set(target, prop, value)
            }
        }

    return new Proxy(obj, handler)
 }