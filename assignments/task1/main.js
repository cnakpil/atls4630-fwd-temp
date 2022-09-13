document.addEventListener('click', event => {
    const target = event.target
    const isCell = target.classList.contains('cell')
    const isDisabled = target.classList.contains('disabled')

    if (isCell && !isDisabled) {
        const cellValue = target.dataset.value

        board.xTurn === true
            ? board.xState.push(cellValue)
            : board.oState.push(cellValue)

        target.classList.add('disabled')
        target.classList.add(board.xTurn ? 'x' : 'o')

        board.xTurn = !board.xTurn
    }
})