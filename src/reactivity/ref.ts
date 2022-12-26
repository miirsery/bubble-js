const ref = (value: string | number | boolean | object): ProxyConstructor => {
    let obj: any = {}

    if (typeof value === 'object') {
        obj = value
    } else {
        obj.value = value
    }

    const handler: ProxyHandler<any> = {
        get(target: any, prop: any, receiver: any) {
            return Reflect.get(target, prop, receiver)
        },
        set(target: any, prop: any, value: any) {
            target[prop] = value

            return Reflect.set(target, prop, value)
        }
    }

    return new Proxy(obj, handler)
}

export { ref }
