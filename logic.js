
document.addEventListener('DOMContentLoaded', function () {

    const gridContainer = document.querySelector('#grid-container');

    const colorPicker = document.querySelector(`#color-picker`);

    let isMouseDown = false;
    let isEraser = false;

    generateGrid(16);


    document.querySelector(`#resize-button`).addEventListener(`click`, function () {

        let squaresSide = prompt("Enter number of squares-per-side for a new grid. No more than 100!", 0);
        squaresSide = parseInt(squaresSide);

        if (squaresSide > 0 && squaresSide <= 100) {

            generateGrid(squaresSide);
        }
        else {

            alert("Number should be between 1 and 100!");
        }
    });



    document.querySelector(`#clear-button`).addEventListener(`click`, function () {

        const squares = gridContainer.querySelectorAll(`.square`);

        squares.forEach(square => {
            square.style.backgroundColor = `#f8f8f8`;
            square.dataset.strokes = 0;
        });

    });

    document.querySelector(`#eraser-button`).addEventListener(`click`, function () {

        isEraser = !isEraser;
        this.classList.toggle('active');

    });




    function generateGrid(squaresSide) {

        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }

        const squareSize = 100 / squaresSide;



        for (let i = 0; i < squaresSide * squaresSide; i++) {

            const square = document.createElement(`div`);
            square.classList.add(`square`);
            square.style.width = `${squareSize}%`;
            square.style.height = `${squareSize}%`;
            square.dataset.strokes = 0;

            square.addEventListener(`mousemove`, function () {

                if (isMouseDown) {

                    if (isEraser) {

                        this.style.backgroundColor = `#f8f8f8`;
                        this.dataset.strokes = 0;
                    }
                    else {

                        let currStrokes = parseInt(square.dataset.strokes, 10);
                        currStrokes += 1;

                        if (currStrokes <= 50) {

                            square.dataset.strokes = currStrokes;


                            let opMultiple = 0.05;

                            let convertedColor = hexToRGB(colorPicker.value, currStrokes * opMultiple);

                            square.style.backgroundColor = convertedColor;
                        }


                    }



                }

            });
            gridContainer.appendChild(square);
        }

        gridContainer.addEventListener(`mousedown`, function (e) {

            isMouseDown = true;
            e.preventDefault();
        });

        document.addEventListener(`mouseup`, function () {

            isMouseDown = false;
        });
    }

    function hexToRGB(hex, op) {

        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${op})`;
    }


});
