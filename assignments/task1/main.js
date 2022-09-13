document.addEventListener('click', event => {
    const target = event.target
    const isCell = target.classList.contains('cell')
    const isDisabled = target.classList.contains('disabled')

    if (isCell && !isDisabled) {
        // The player clicked on a cell that is still empty
    }
})