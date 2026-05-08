const express = require("express");
const cors = require("cors");

const fs = require("fs");
const path = require("path");

const { exec } = require("child_process");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {

    res.send("Online Compiler Backend Running");

});

// Compile and Run Route
app.post("/run", (req, res) => {

    const code = req.body.code;
    const input = req.body.input;
    const language = req.body.language;

    let filePath;
    let outputPath;
    let command;

    const inputPath = path.join(__dirname, "../temp/input.txt");

    fs.writeFileSync(inputPath, input);

    // C++
    if(language === "cpp") {

        filePath = path.join(__dirname, "../temp/code.cpp");
        outputPath = path.join(__dirname, "../temp/code.exe");

        fs.writeFileSync(filePath, code);

        command =
        `g++ "${filePath}" -o "${outputPath}" && "${outputPath}" < "${inputPath}"`;

    }

    // C
    else if(language === "c") {

        filePath = path.join(__dirname, "../temp/code.c");
        outputPath = path.join(__dirname, "../temp/code.exe");

        fs.writeFileSync(filePath, code);

        command =
        `gcc "${filePath}" -o "${outputPath}" && "${outputPath}" < "${inputPath}"`;

    }

    // Python
    else if(language === "python") {

        filePath = path.join(__dirname, "../temp/code.py");

        fs.writeFileSync(filePath, code);

        command =
        `python "${filePath}" < "${inputPath}"`;

    }

    const startTime = Date.now();

    // Execute with timeout
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {

        // Timeout
        if(error && error.killed) {

            return res.json({
                success: false,
                error: "Execution Timed Out (5 seconds limit)"
            });

        }

        // Compilation / Runtime Error
        if(error) {

            return res.json({
                success: false,
                error: stderr
            });

        }

        const endTime = Date.now();

        const executionTime = endTime - startTime;

        // Success
        res.json({
            success: true,
            output: stdout,
            executionTime: executionTime
        });

    });

});

// Start Server
app.listen(5000, () => {

    console.log("Server running on port 5000");

});