# My Final Project: HR Management System

This is a web-based **Human Resources (HR) Management System** that allows organizations to manage employee information, including adding new employees, tracking their roles, and updating or removing records. It includes functionalities like employee leave management, salary records, and performance tracking.

- **New Feature**: The project integrates a dynamic dashboard that visualizes employee data (e.g., employee distribution by department, salary range) using JavaScript charts, allowing HR managers to make data-driven decisions.

## Prerequisites

Before running the project, ensure you have the following Python modules installed:
- Flask: `pip install Flask`



## Project Checklist

- [x] It is available on GitHub.
- [x] It uses the Flask web framework.
- [x] It uses at least one module from the Python Standard Library other than the `random` module.
  - **Module name**: `json` and `datetime`
- [x] It contains at least one class written by you that has both properties and methods. The class uses `__init__()` to initialize attributes and includes methods to handle HR management logic (like adding and managing employees).
  - **File name for the class definition**: `app.py`
  - **Line number(s) for the class definition**: Line 69
  - **Name of two properties**: `self.name`, `self.salary`
  - **Name of two methods**: `to_dict()`, `from_dict()`
  - **File name and line numbers where the methods are used**:
    - `app.py`, Line 126 (for `from_dict()`)
    - `app.py`, Line 72 (for `to_dict()`)
- [x] It makes use of JavaScript in the front end and uses the `localStorage` of the web browser.
- [x] It uses modern JavaScript (for example, `let` and `const` instead of `var`).
- [x] It makes use of reading and writing to the same file feature, such as storing and retrieving employee information from a database.
- [x] It contains conditional statements.
  - **File name**: `app.py`
  - **Line number(s)**: Line 175
- [x] It contains loops.
  - **File name**: `app.py`
  - **Line number(s)**: Line 185
- [x] It lets the user enter a value in a text box at some point. This value is received and processed by your back-end Python code.
  - **Example**: Employee name, salary, and department are entered and saved.
- [x] It doesn't generate any error message even if the user enters wrong input.
- [x] It is styled using your own CSS.
- [x] The code follows the code and style conventions as introduced in the course, is fully documented using comments, and doesn't contain unused or experimental code.
  - All `print()` or `console.log()` statements are removed, and any user feedback is visible directly in the browser.
- [x] All exercises have been completed as per the requirements and pushed to the respective GitHub repository.

## Running the Project

To run the project locally, follow these steps:

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/esraamjdy/Final-Project_remotecoders.git
