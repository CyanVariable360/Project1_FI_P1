const charcaters = "/characters"

function displayButtons(data)
{
    const container = document.querySelector('.names-container')
    const characterImg = document.querySelector('#character-image')
    const characterName = document.querySelector('#character-name')
    container.innerHTML = ''

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key]
            const button = document.createElement('button')
            button.textContent = item.name || 'Unnamed Killer'
            button.addEventListener('click', () => {
                characterImg.src = item.image
                characterName.textContent = item.name
                displayPerks(item.perks)
            })
            container.appendChild(button)            
        }
    }
}

function displayPerks(perkNames) 
{
    fetch("http://localhost:3000/perks")
        .then(response => response.json())
        .then(data => {
            const perks = data
            const filteredPerks = perkNames.map(name => perks[name]).filter(perk => perk !== undefined)
            const perksContainer = document.querySelector('.perk-holder')
            perksContainer.innerHTML = ''
            filteredPerks.forEach(perk => {
                const perkElement = document.createElement('img')
                perkElement.src = perk.image
                perkElement.alt = perk.name
                perkElement.classList.add('perk-image')
                perkElement.dataset.description = perk.description
                perksContainer.appendChild(perkElement)
            })

            const tooltip = document.getElementById('tooltip')
            document.querySelectorAll('.perk-image').forEach(perkImage => {
                perkImage.addEventListener('mouseover', (event) => {
                    tooltip.innerHTML = event.target.dataset.description
                    tooltip.style.display = 'block'
                    tooltip.style.left = event.pageX + 'px'
                    tooltip.style.top = event.pageY + 'px'
                })

                perkImage.addEventListener('mousemove', (event) => {
                    tooltip.style.left = event.pageX + 'px'
                    tooltip.style.top = event.pageY + 'px'
                })

                perkImage.addEventListener('mouseout', () => {
                    tooltip.style.display = 'none'
                })
            })
        })
}

function switchChar()
{
    let charSwitch = true

    const charButton = document.querySelector('#Switch')
    const container = document.querySelector('.names-container')

    charButton.addEventListener('click', () => {
        if(charSwitch) {
            container.innerHTML = ''
            fetch("http://localhost:3000" + charcaters)
            .then(response => response.json())
            .then(data => {
                displayButtons(data.survivors) 
            })
            charSwitch = false
        } else {
            container.innerHTML = ''
            fetch("http://localhost:3000" + charcaters)
            .then(response => response.json())
            .then(data => {
                displayButtons(data.killers) 
            })
            charSwitch = true
        }
    })
}

function main()
{
    fetch("http://localhost:3000" + charcaters)
    .then(response => response.json())
    .then(data => {
        displayButtons(data.killers)
        switchChar()
    })
}

addEventListener("DOMContentLoaded", () => {
    main()
})
