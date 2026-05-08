# Compile-Hub

Compile-Hub is a web-based online compiler that allows users to write, compile, and execute C, C++, and Python programs directly from the browser.

The project provides a VS Code-like coding experience using Monaco Editor and supports real-time code execution through a Node.js backend.

---

# Features

* Supports C programming
* Supports C++ programming
* Supports Python programming
* Monaco Editor integration
* Syntax highlighting
* Custom input support
* Real-time output display
* Execution time tracking
* Execution timeout handling
* Download source code feature
* Error highlighting
* Clean and responsive UI

---

# Tech Stack

## Frontend

* HTML
* CSS
* JavaScript
* Monaco Editor

## Backend

* Node.js
* Express.js

## Languages Supported

* C
* C++
* Python

---

# Project Structure

```txt
compile-hub/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── temp/
│
├── .gitignore
└── README.md
```

---

# How It Works

1. User writes code in Monaco Editor
2. Frontend sends code and input to backend using API requests
3. Backend stores the code temporarily
4. Selected compiler/interpreter executes the code
5. Output is returned to frontend and displayed to the user

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/compile-hub.git
```

---

## Navigate to Backend Folder

```bash
cd compile-hub/backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Server

```bash
node server.js
```

---

# Requirements

Make sure the following are installed:

## C++ Compiler

```bash
g++ --version
```

## C Compiler

```bash
gcc --version
```

## Python

```bash
python --version
```

---

# Future Improvements

* User authentication
* Theme switching
* Code saving feature
* Multiple file support
* Docker sandboxing
* Online deployment
* Code sharing system

---

# Core CS Concepts Used

* Operating Systems
* Process Management
* Compiler Workflow
* File Handling
* API Communication
* Client-Server Architecture
* Execution Timeout Handling

---

# Author

Divya E
