
document.addEventListener('DOMContentLoaded', function() {

    const gridContainer = document.querySelector('#grid-container');

    const totalSquares = 16 * 16;

    for (let i = 0; i < totalSquares; i++) {

        const square = document.createElement('div');

        square.classList.add('square');

        square.addEventListener(`mouseover`, function() {
            square.classList.add(`square-hover`);
        });
        
        gridContainer.appendChild(square);
        
    }
});
