const setValue = (data: string | number | boolean | object) => {
    return (data)
}

const useState = (value: string | number | boolean | object) => {
    return [value, setValue(value)]
}

export { useState }
