// Fetch employees and render them in the table
document.addEventListener('DOMContentLoaded', function() {
    fetchEmployees();
});

function fetchEmployees() {
    fetch('/get_employees')
        .then(response => response.json())
        .then(data => {
            const employeeTable = document.getElementById('employeeTable');
            employeeTable.innerHTML = '';  // Clear the table

            data.forEach(employee => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                    <td>${employee.city}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.start_date}</td>
                    <td class="action-buttons">
                        <button class="btn-update" onclick="showUpdateModal(${employee.id})">View and Update</button>
                        <button class="btn-delete" onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                `;

                employeeTable.appendChild(row);
            });
        });
}

function showUpdateModal(id) {
    fetch(`/employee/${id}`)
        .then(response => response.json())
        .then(employee => {
            document.getElementById('employeeId').value = employee.id;
            document.getElementById('updateName').value = employee.name;
            document.getElementById('updateAge').value = employee.age;
            document.getElementById('updateGender').value = employee.gender;
            document.getElementById('updateActive').checked = employee.active;
            document.getElementById('updateCity').value = employee.city;
            document.getElementById('updateEmail').value = employee.email;
            document.getElementById('updatePhone').value = employee.phone;
            document.getElementById('updateSalary').value = employee.salary;
            document.getElementById('updateStartDate').value = employee.start_date;
            document.getElementById('updateModal').style.display = 'block';
        });
}

function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}

function updateEmployee() {
    const id = document.getElementById('employeeId').value;
    const updatedEmployee = {
        name: document.getElementById('updateName').value,
        age: document.getElementById('updateAge').value,
        gender: document.getElementById('updateGender').value,
        active: document.getElementById('updateActive').checked,
        city: document.getElementById('updateCity').value,
        email: document.getElementById('updateEmail').value,
        phone: document.getElementById('updatePhone').value,
        salary: document.getElementById('updateSalary').value,
        start_date: document.getElementById('updateStartDate').value,
    };
    const updateForm = document.getElementById('updateForm');
    // Convert age to number for validation
    const age = parseInt(updatedEmployee.age, 10);
    const minAge = 18;
    const maxAge = 65;

    // Validate age
    if (age < minAge || age > maxAge) {
        alert(`Please enter age between ${minAge} and ${maxAge}.`);
        return; // Stop execution if age is invalid
    }

    fetch(`/update_employee/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
    })
    .then(response => response.json())
    .then(data => {
        closeUpdateModal();
        updateForm.reset();
        fetchEmployees();  // Refresh the employee list
    })
    .catch(error => console.error('Error updating employee:', error));
}

function deleteEmployee(id) {
    // Show confirmation dialog
    const confirmation = confirm("Are you sure you want to delete this employee?");
    if (!confirmation) {
        return; // If the user clicks "Cancel", exit the function
    }

    // Proceed with deletion if confirmed
    fetch(`/delete_employee/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchEmployees(); // Reload employees after deletion
    })
    .catch(error => console.error('Error:', error));
}

function showAddEmployeeModal() {
    document.getElementById('addEmployeeModal').style.display = 'block';
}

function closeAddEmployeeModal() {
    document.getElementById('addEmployeeModal').style.display = 'none';
}

function addEmployee() {
    // Get the values from the input fields
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const active = document.getElementById('active').checked;
    const gender = document.getElementById('gender').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const salary = document.getElementById('salary').value;
    const start_date = document.getElementById('start_date').value;

    // Check if any field is empty
    if (!name || !age || !city || !email || !phone || !salary || !start_date) {
        alert('Please fill in all fields before adding an employee.');
        return; 
    }

    const minAge = 18;
    const maxAge = 65;

    if (age < minAge || age > maxAge) {
        alert(`Please enter age between${minAge} and ${maxAge}.`);
        return; 
    }
    const addForm = document.getElementById('addEmployeeForm');
    const employeeData = {
        name: name,
        age: age,
        active: active,
        gender: gender,
        city: city,
        email: email,
        phone: phone,
        salary: salary,
        start_date: start_date
    };

    fetch('/add_employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
    .then(response => {
        if (response.ok) {
            closeAddEmployeeModal();
            addForm.reset();
            fetchEmployees();
        } else {
            alert('Failed to add employee');
        }
    });
}

function logout() {
    fetch('/logout', {
        method: 'GET', 
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            localStorage.removeItem('username'); 
            window.location.href = '/login'; 
        } else {
            console.error('Logout failed!');
        }
    });
}

function setActiveNavItem() {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname;
        navLinks.forEach(link => {
        link.classList.remove('active');
    });
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    if (currentPath === '/') {
        navLinks[0].classList.add('active');
    }
}

function handleNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
function logout() {
    window.location.href = "/logout";
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
    handleNavigation();
});
window.addEventListener('popstate', function() {
    setActiveNavItem();
});
