
const n=10;
const array=[];
init();

function init() {
    const valuedispDiv = document.querySelector('.valuedisp');
    valuedispDiv.style.display = "none";

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
function ssort() {
    const copy = [...array];
    const moves = selectionSort(copy); // Change this line
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
    },animationSpeed);
}

// function bubbleSort(array){
//     const moves=[];                   //recored changes
//     let numswap=0;
//     const startTime = performance.now();
//     do{
//         var swapped=false;
//         for(let i=1;i<array.length;i++)
//         {
//             moves.push({indices:[i-1,i],type:"comp"});   
//             if(array[i-1]>array[i])
//             {
//                 swapped=true;
//                 numswap++;
//                 moves.push({indices:[i-1,i],type:"swap"});      //this move tell which indices is involve and it type
//                 [array[i-1],array[i]]=[array[i],array[i-1]];
//             }
//         }
//     }while(swapped);
//     const endTime = performance.now();
//     const elapsedTime = endTime - startTime;

//     console.log("Number of swap are: " +numswap );
//     console.log("Time Taken (ms):", elapsedTime);
    
//     // Update values in the valuedisp div
//     const valuedispDiv = document.getElementById("valuedisp");
//     if (numswap > 0 || elapsedTime > 0) {
//         // If there are values, show the div
//         valuedispDiv.style.display = "block";
//         document.getElementById("swapCount").textContent = numswap;
//         document.getElementById("timeTaken").textContent = elapsedTime + " ms";
//     } else {
//         // If there are no values, hide the div
//         valuedispDiv.style.display = "none";
//     }
   
  
//     return moves;
    
// }

function bubbleSort(array) {
    const moves = [];                   // recorded changes
    let numswap = 0;
    const startTime = performance.now();
    let swapped;

    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            moves.push({ indices: [i - 1, i], type: "comp" });
            if (array[i - 1] > array[i]) {
                swapped = true;
                numswap++;
                moves.push({ indices: [i - 1, i], type: "swap" }); // this move tells which indices are involved and their type
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    console.log("Number of swaps: " + numswap);
    console.log("Time Taken (ms):", elapsedTime);
    //const valuedispDiv = document.getElementsByClassName("valuedisp");
    const valuedispDiv = document.querySelector('.valuedisp');
    valuedispDiv.style.display = "block";
    document.getElementById("swapCount").textContent = numswap;
    document.getElementById("timeTaken").textContent = elapsedTime.toFixed(6) + " ms";

    return moves;
}


function insertionSort(array, logMetrics = true) {
    const moves = []; // Record changes
    let numswap = 0;

    const startTime = performance.now();

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

            numswap++;
        }

        array[j + 1] = current;
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    if (logMetrics) {
        console.log("Number of swaps: " + numswap);
        console.log("Time Taken (ms):", elapsedTime);  //.toFixed(10)
    }
    const valuedispDiv = document.querySelector('.valuedisp');
    valuedispDiv.style.display = "block";
    document.getElementById("swapCount").textContent = numswap;
    document.getElementById("timeTaken").textContent = elapsedTime.toFixed(9) + " ms";

    return moves;
}



function selectionSort(array) {
    const moves = [];

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            moves.push({ indices: [i, j], type: "comp" });

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        moves.push({ indices: [i, minIndex], type: "swap" });
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    return moves;
}


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

// let animationSpeed = 50;  // Default animation speed

// // Event listener for the range input
// document.getElementById("speedRange").addEventListener("input", function () {
//     animationSpeed = this.value;
// });

// function animate(moves){
//     if(moves.length==0){             // if there is no swap in array we just return and done animating
//         showBars();
//         return ;
//     }
//     const move=moves.shift();
//     const [i,j]=move.indices;
//     if(move.type=="swap"){
//         [array[i],array[j]]=[array[j],array[i]];
//     }
//     showBars(move);
//     setTimeout(function(){
//         animate(moves);
//     },animationSpeed);
// }

let animationSpeed = 540-50;  // Default animation speed


// Event listener for the range input
document.getElementById("speedRange").addEventListener("input", function () {
    animationSpeed = 540 - this.value;  // Reverse the value
    updateSpeedValue(this.value);
    function updateSpeedValue(value) {
        document.getElementById("speedValue").textContent = value;
    }
});



function animate(moves) {
    if (moves.length === 0) {
        showBars();
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(move);

    setTimeout(function () {
        animate(moves);
    }, animationSpeed);  // Use the dynamic animation speed
}

// Initial update of the displayed speed value
updateSpeedValue(animationSpeed);
