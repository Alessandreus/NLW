/*
    Arrow function
    () => {}
    res => res.json() nada mais é do que uma arrow funciont com retorno
    como só tem uma linha, pod ficar simplificada dessa maneira

*/

//Functions - Dados da Entidade

const urlIbge = "https://servicodados.ibge.gov.br/api/v1/localidades/"

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    //Executa uma url
    fetch(urlIbge + "estados")
        //Se der certo executa
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

function getCities(event) {
    const citySelect = document.querySelector("select[name=cidade]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value
    const url = urlIbge + `estados/${ufValue}/municipios`

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

//Functions - Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    //Adicionando ou removendo uma classe
    const itemLi = event.target

    //toggle -> add ou remove a classe
    itemLi.classList.toggle("selected")

    const itemID = itemLi.dataset.id
    const alreadySelected = selectedItems.findIndex(item => item == itemID)

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemID)
        selectedItems = filteredItems
    } else {
        //O push é o "add" da List
        selectedItems.push(itemID)
    }

    collectedItems.value = selectedItems
}