
let code_syntex = generate('C++');
document.getElementById("code-snippet").innerHTML = "<pre>" + code_syntex + "</pre>";

var buttons = document.querySelectorAll(".code");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var code = this.textContent;
        var code_syntex = generate(code);
        document.getElementById("code-snippet").innerHTML = "<pre>" + code_syntex + "</pre>";

        // Remove the "clicked_button" class from all buttons
        buttons.forEach(function (btn) {
            btn.classList.remove("clicked_button");
        });
        // Add the "clicked_button" class to the clicked button
        this.classList.add("clicked_button");
    });
});
copyBtn.addEventListener("click", function () {
    var codeSnippet = document.getElementById("code-snippet");
    copyTextToClipboard(codeSnippet.innerText);
});

function generate(language){

    switch(language){
        case 'C++':
            return `
            void insertionSort(int arr[], int n) {
                // Start from the second element
                for (int i = 1; i < n; i++) {
                  // Store the current element
                  int key = arr[i];
                  
                  // Initialize the insertion position
                  int j = i - 1;
              
                  // Compare the current element with the sorted part
                  while (j >= 0 && arr[j] > key) {
                    // Shift larger elements to the right
                    arr[j + 1] = arr[j];
                    j--;
                  }
              
                  // Insert the current element at the correct position
                  arr[j + 1] = key;
                }
              }
            `;

        case 'Python':
            return  `
            def insertion_sort(arr):
            """
            Sorts an array in ascending order using the insertion sort algorithm.
          
            Args:
              arr: The array to be sorted.
          
            Returns:
              The sorted array.
            """
          
            for i in range(1, len(arr)):
              key = arr[i]
              j = i - 1
          
              # Move elements of arr[0..i-1], that are
              # greater than key, to one position ahead
              # of their current position
              while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
          
              arr[j + 1] = key
          
            return arr
          
          # Example usage
          arr = [12, 11, 13, 5, 6]
          sorted_arr = insertion_sort(arr)
          print("Sorted array:", sorted_arr)
          

            `
        case 'Javascript':
            return `
            function insertionSort(arr) {
                // Loop through each element in the array, starting from the second
                for (let i = 1; i < arr.length; i++) {
                  // Store the current element
                  let key = arr[i];
                  // Initialize a variable to track the insertion position
                  let j = i - 1;
              
                  // Compare the current element with the sorted part of the array
                  while (j >= 0 && arr[j] > key) {
                    // Shift larger elements to the right
                    arr[j + 1] = arr[j];
                    // Decrement the insertion position
                    j--;
                  }
              
                  // Insert the current element at the correct position
                  arr[j + 1] = key;
                }
              
                // Return the sorted array
                return arr;
              }
              `
        case 'C':
            return `
            void insertionSort(int arr[], int n) {
                for (int i = 1; i < n; i++) {
                  int key = arr[i];
                  int j = i - 1;
              
                  while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j--;
                  }
              
                  arr[j + 1] = key;
                }
              }`
            

    }
}

function copyTextToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert("Code copied to clipboard!");
}

document.getElementById("copyBtn").addEventListener("mouseover",function(){
    document.getElementById("copyBtn").innerHTML="<i class='bx bx-clipboard bx-tada' ></i> Copy to Clipboard "
})
document.getElementById("copyBtn").addEventListener("mouseout",function(){
    document.getElementById("copyBtn").innerHTML="<i class='bx bx-clipboard'></i> Copy to Clipboard"
})
