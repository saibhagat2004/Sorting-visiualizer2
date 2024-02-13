
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
                void bubbleSort(int arr[], int n) {
                    for (int i = 0; i < n - 1; i++) {
                        for (int j = 0; j < n - i - 1; j++) {
                            if (arr[j] > arr[j + 1]) {
                                // Swap arr[j] and arr[j+1]
                                int temp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = temp;
                            }
                        }
                    }
                }
            `;

        case 'Python':
            return  `
            def bubble_sort(arr):
            n = len(arr)

            # Traverse through all array elements
            for i in range(n):
                # Last i elements are already sorted, so we don't need to check them
                for j in range(0, n-i-1):
                    # Swap if the element found is greater than the next element
                    if arr[j] > arr[j+1]:
                        arr[j], arr[j+1] = arr[j+1], arr[j]

            # Example usage:
            arr = [64, 25, 12, 22, 11]
            bubble_sort(arr)

            print("Sorted array:", arr)

            `

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
