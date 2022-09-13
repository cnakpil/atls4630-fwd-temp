const ttt = {
    xTurn: true,
    xState: [],
    oState: [],
    winStates: [
        // Rows
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columns
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

document.addEventListener('click', event => {
    const target = event.target
    const isCell = target.classList.contains('cell')
    const isDisabled = target.classList.contains('disabled')

    if (isCell && !isDisabled) {
        const cellValue = target.dataset.value

        ttt.xTurn === true
            ? ttt.xState.push(cellValue)
            : ttt.oState.push(cellValue)

        target.classList.add('disabled')
        target.classList.add(ttt.xTurn ? 'x' : 'o')

        ttt.xTurn = !ttt.xTurn
    }
})