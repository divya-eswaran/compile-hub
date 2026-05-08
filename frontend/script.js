let editor;

// Monaco Setup
require.config({
    paths: {
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs'
    }
});

require(["vs/editor/editor.main"], function () {

    editor = monaco.editor.create(document.getElementById("editor"), {

        value: getTemplate("cpp"),

        language: "cpp",

        theme: "vs-dark",

        automaticLayout: true,

        fontSize: 16

    });

});

// Templates
function getTemplate(language) {

    // C++
    if(language === "cpp") {

        return `#include<iostream>
using namespace std;

int main() {

    int n;

    cin >> n;

    cout << n * 2;

    return 0;
}`;
    }

    // C
    else if(language === "c") {

        return `#include<stdio.h>

int main() {

    int n;

    scanf("%d", &n);

    printf("%d", n * 2);

    return 0;
}`;
    }

    // Python
    else if(language === "python") {

        return `n = int(input())

print(n * 2)`;
    }

}

// Language Change
function changeLanguage() {

    const language = document.getElementById("language").value;

    // Change Monaco syntax highlighting
    monaco.editor.setModelLanguage(
        editor.getModel(),
        language === "python" ? "python" : "cpp"
    );

    // Set starter code
    editor.setValue(getTemplate(language));

}

// Run Code
async function runCode() {

    const code = editor.getValue();

    const input = document.getElementById("input").value;

    const language = document.getElementById("language").value;

    const outputBox = document.getElementById("output");

    outputBox.innerText = "Running...";

    try {

        const response = await fetch("http://localhost:5000/run", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                code: code,
                input: input,
                language: language
            })

        });

        const data = await response.json();

        // Success
        if (data.success) {

            outputBox.innerText =
                data.output +
                "\n\nExecution Time: " +
                data.executionTime +
                " ms";

        }

        // Error
        else {

            outputBox.innerHTML =
                `<span class="error">${data.error}</span>`;

        }

    }
    catch (error) {

        outputBox.innerText = "Server Error";

    }

}

// Clear
function clearAll() {

    editor.setValue("");

    document.getElementById("input").value = "";

    document.getElementById("output").innerText = "";

}

// Download
function downloadCode() {

    const code = editor.getValue();

    const language = document.getElementById("language").value;

    let extension = ".txt";

    if(language === "cpp") {
        extension = ".cpp";
    }
    else if(language === "c") {
        extension = ".c";
    }
    else if(language === "python") {
        extension = ".py";
    }

    const blob = new Blob([code], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "code" + extension;

    link.click();

}