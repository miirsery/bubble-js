import {ref} from "../../reactivity/ref";

export const CounterBase = () => {
    const searchedData: any = ref({
        name: '',
        searchValue: ''
    })

    window.addEventListener('DOMContentLoaded', () => {
        const input = document.querySelector('.input') as HTMLInputElement
        // const counter = document.querySelector('.counter') as HTMLDivElement

        input.addEventListener('input', (e: any) => {
            searchedData.name = e.target.value

            // counter.innerHTML = searchedData.name
            console.log('input', searchedData)
        })

    })

    console.log(searchedData)
    searchedData.name = 'Some name'
    console.log(searchedData)

    return `
        <div>
            <p>This is counter</p>
            <input class="input" />
            <div class="counter">counter is: ${searchedData.name}</div>
        </div>
    `
}


export default { CounterBase }
