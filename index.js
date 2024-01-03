
const n=10;
const array=[];
init();

function init() {
    const inputValues = document.getElementById("inputValues").value;
    const inputArray = inputValues.split(",").map(Number);

    // Check if input values are provided
    if (inputValues.trim() === "") {
        // Generate random values if no input is provided
        for (let i = 0; i < n; i++) {
            array[i] =Math.round(Math.random()*100);
        }
    } else {
        // Use the provided input values
        if (inputArray.length !== n) {
            alert(`Please enter ${n} values.`);
            return;
        }

        for (let i = 0; i < n; i++) {
            array[i] = inputArray[i];
        }
    }

    showBars();
}

// Initial call to generate random values when the page loads
init();

function bsort(){
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);
}
function insert() {
    const copy = [...array];
    const moves = insertionSort(copy);
    animate(moves);
}



function animate(moves){
    if(moves.length==0){             // if there is no swap in array we just return and done animating
        showBars();
        return ;
    }
    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap"){
        [array[i],array[j]]=[array[j],array[i]];
    }
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },50);
}



function bubbleSort(array){
    const moves=[];                    //recored changes
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++)
        {
            moves.push({indices:[i-1,i],type:"comp"});   
            if(array[i-1]>array[i])
            {
                swapped=true;
                moves.push({indices:[i-1,i],type:"swap"});      //this move tell which indices is involve and it type
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return moves;
}

function insertionSort(array) {
    const moves = []; // Record changes

    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;

        moves.push({ indices: [i, j], type: "comp" });

        while (j >= 0 && array[j] > current) {
            moves.push({ indices: [j, j + 1], type: "swap" });
            array[j + 1] = array[j];
            j--;

            if (j >= 0) {
                moves.push({ indices: [j, j + 1], type: "comp" });
            }
        }

        array[j + 1] = current;
    }

    return moves;
}
function msort() {
    const copy = [...array];
    const moves = mergeSort(copy, 0, copy.length - 1);
    animate(moves);
}

function mergeSort(array, left, right) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        const leftMoves = mergeSort(array, left, middle);
        const rightMoves = mergeSort(array, middle + 1, right);
        const mergeMoves = merge(array, left, middle, right);
        return [...leftMoves, ...rightMoves, ...mergeMoves];
    }
    return [];
}

// function merge(array, left, middle, right) {
//     const leftArr = array.slice(left, middle + 1);
//     const rightArr = array.slice(middle + 1, right + 1);
//     let i = 0, j = 0, k = left;
//     const moves = [];

//     while (i < leftArr.length && j < rightArr.length) {
//         if (leftArr[i] <= rightArr[j]) {
//             moves.push({ indices: [k, left + i], type: "swap" });
//             array[k++] = leftArr[i++];
//         } else {
//             moves.push({ indices: [k, middle + 1 + j], type: "swap" });
//             array[k++] = rightArr[j++];
//         }
//     }

//     while (i < leftArr.length) {
//         moves.push({ indices: [k, left + i], type: "swap" });
//         array[k++] = leftArr[i++];
//     }

//     while (j < rightArr.length) {
//         moves.push({ indices: [k, middle + 1 + j], type: "swap" });
//         array[k++] = rightArr[j++];
//     }

//     return moves;
// }
function merge(array, left, middle, right) {
    const leftArr = array.slice(left, middle + 1);
    const rightArr = array.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;
    const moves = [];

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            moves.push({ indices: [k, left + i], type: "swap" });
            array[k++] = leftArr[i++];
        } else {
            moves.push({ indices: [k, middle + 1 + j], type: "swap" });
            array[k++] = rightArr[j++];
        }
    }

    while (i < leftArr.length) {
        moves.push({ indices: [k, left + i], type: "swap" });
        array[k++] = leftArr[i++];
    }

    while (j < rightArr.length) {
        moves.push({ indices: [k, middle + 1 + j], type: "swap" });
        array[k++] = rightArr[j++];
    }

    // Add a final animation to show the merged array
    for (let i = 0; i < leftArr.length; i++) {
        moves.push({ indices: [left + i, left + i], type: "comp" });
    }
    for (let i = 0; i < rightArr.length; i++) {
        moves.push({ indices: [middle + 1 + i, middle + 1 + i], type: "comp" });
    }

    return moves;
}


// function showBars(move) {
//     container.innerHTML = "";
//     for (let i = 0; i < array.length; i++) {
//         const bar = document.createElement("div");
//         bar.style.height = array[i] * 100 + "%";
//         bar.classList.add("bar");
//         const value= Math.round(array[i]*10)
//         // Display the numerical value of the bar
//         const valueLabel = document.createElement("span");
//         valueLabel.textContent = value; // Adjust the decimal places as needed
//         bar.appendChild(valueLabel);

//         if (move && move.indices.includes(i)) {
//             bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
//         }

//         container.appendChild(bar);
//     }
// }

function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i]+ "%";
        bar.classList.add("bar");
        const value= array[i];
        // Display the numerical value of the bar
        const valueLabel = document.createElement("span");
        valueLabel.textContent = value; // Adjust the decimal places as needed
        bar.appendChild(valueLabel);

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }

        container.appendChild(bar);
    }
}

document.querySelector('.dropdown-toggle i').addEventListener('click', function() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    this.classList.toggle('bx-rotate-90');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

