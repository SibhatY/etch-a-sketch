
document.addEventListener('DOMContentLoaded', function() {

    const gridContainer = document.querySelector('#grid-container');

    let isMouseDown = false;

    generateGrid(16);


    document.querySelector(`#resize-button`).addEventListener(`click`, function() {

        let squaresSide = prompt("Enter number of squares-per-side for a new grid. No more than 100!", 0);
        squaresSide = parseInt(squaresSide);

        if (squaresSide > 0 && squaresSide <= 100) {

            generateGrid(squaresSide);
        }
        else {

            alert("Number should be between 1 and 100!");
        }
    });

    function generateGrid(squaresSide) {

        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }

        const squareSize = 100 / squaresSide;
        


        for (let i = 0; i < squaresSide*squaresSide; i++) {

            const square = document.createElement(`div`);
            square.classList.add(`square`);
            square.style.width = `${squareSize}%`;
            square.style.height = `${squareSize}%`;
            square.dataset.strokes = 0;

            square.addEventListener(`mousemove`, function() {

                if (isMouseDown) {

                    let currStrokes = parseInt(square.dataset.strokes, 10);
                    currStrokes += 1;

                    if (currStrokes <= 50) {

                        square.dataset.strokes = currStrokes;
                        square.style.backgroundColor = `rgba(0, 0, 0, ${currStrokes * 0.05})`;
                    }

                }
                
            });
            gridContainer.appendChild(square);
        }

        gridContainer.addEventListener(`mousedown`, function(e) {

            isMouseDown = true;
            e.preventDefault();
        });

        document.addEventListener(`mouseup`, function() {

            isMouseDown = false;
        });
    }


});
