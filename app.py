from flask import Flask, jsonify, request, render_template, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime, date


app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Load users from JSON
def load_users():
    try:
        with open('users.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Save users to JSON
def save_users(users):
    with open('users.json', 'w') as file:
        json.dump(users, file, indent=4)

#Route for registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        # قم بعرض صفحة التسجيل
        return render_template('register.html')
    elif request.method == 'POST':
        # معالجة بيانات التسجيل المرسلة عبر POST
        username = request.form.get('username')
        password = request.form.get('password')
        users = load_users()
        if any(user['username'] == username for user in users):
            return jsonify({'status': 'error', 'message': 'Username already exists!'})
        hashed_password = generate_password_hash(password)  # تشفير كلمة المرور
        users.append({"username": username, "password": hashed_password, "employees" : []})
        save_users(users)
        return jsonify({'status': 'success', 'message': 'User registered successfully!'})

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        users = load_users()
        user = next((user for user in users if user['username'] == username), None)

        if user and check_password_hash(user['password'], password):
            session['user'] = username
            return jsonify({"status": "success", "message": "Login successful!"})
        else:
            return jsonify({"status": "error", "message": "Invalid username or password!"})

    return render_template('login.html')

@app.route('/logout', methods=['GET'])
def logout():
    # إزالة الجلسة
    session.pop('user', None)  # إزالة المستخدم من الجلسة
    session.clear()  # تنظيف الجلسة بالكامل
    return render_template('login.html')
# Main route (Homepage)


class User:
    def __init__(self, id, username, password, email):
        self.id = id
        self.username = username
        self.password = password
        self.email = email



# Employee
class Employee:
    def __init__(self, id, name, age, gender,active,city, email, phone, salary, start_date):
        self.id = id
        self.name = name
        self.age = age
        self.gender = gender
        self.active = active
        self.city = city
        self.email = email
        self.phone = phone
        self.salary = salary
        self.start_date = start_date

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'active': self.active,
            'city': self.city,
            'email': self.email,
            'phone': self.phone,
            'salary': self.salary,
            'start_date': self.start_date
        }

    @staticmethod
    def from_dict(data):
        return Employee(
            id=data.get('id'),
            name=data.get('name'),
            age=data.get('age'),
            gender = data.get('gender'),
            active=data.get('active'),
            city=data.get('city'),
            email=data.get('email'),
            phone=data.get('phone'),
            salary=data.get('salary'),
            start_date=data.get('start_date')
        )

# قراءة البيانات من ملف JSON
def read_data():
    try:
        with open('employees.json', 'r') as file:
            data = json.load(file)
            return [Employee.from_dict(emp) for emp in data]
    except FileNotFoundError:
        return []

# كتابة البيانات إلى ملف JSON
def write_data(employees):
    with open('employees.json', 'w') as file:
        json.dump([emp for emp in employees], file, indent=4)

@app.route('/add_employee', methods=['POST'])
def add_employee():
    
    data = request.get_json()
    users_update = []
    employees_data = load_users()  # تحميل جميع المستخدمين
    current_user = next(user for user in employees_data if user['username'] == session['user'])  # المستخدم الحالي
    for user in employees_data:
        if user['username'] != session['user']:
            users_update.append(user)
            
    # التحقق من المستخدم
    if not current_user:
        return jsonify({"status": "error", "message": "User not found!"}), 404

    # معالجة الموظف الجديد
    max_id = read_max_id()
    date_obj = datetime.strptime(data['start_date'], '%Y-%m-%d')
    formatted_date = date_obj.strftime('%d %B %Y')
    
    new_employee = {
        "id": max_id + 1,
        "name": data['name'],
        "age": data['age'],
        "gender": data['gender'],
        "active": data['active'],
        "city": data['city'],
        "email": data['email'],
        "phone": data['phone'],
        "salary": data['salary'],
        "start_date": formatted_date
    }

    # إضافة الموظف لمصفوفة الموظفين للمستخدم الحالي
    current_user['employees'].append(new_employee)
    users_update.append(current_user)
    
    # حفظ البيانات
    save_users(employees_data)
    write_max_id(max_id + 1)

    return jsonify(new_employee), 201




@app.route('/get_employees')
def get_employees():
    users = load_users()
    employees = []
    for user in users:
        if user["username"] == session["user"]:
            employees = user["employees"]
            
    return jsonify([emp for emp in employees])

@app.route('/employee/<int:id>')
def get_employee(id):
    users = load_users()
    employees = []
    for user in users:
        if user["username"] == session["user"]:
            employees = user["employees"]
    employee = next((emp for emp in employees if emp["id"] == id), None)
    if employee:
        if 'start_date' in employee:
            date_str = employee["start_date"]
            try:
                date_obj = datetime.strptime(date_str, '%d %B %Y')
                updated_start_date = date_obj.strftime('%Y-%m-%d') 
                employee["start_date"] = updated_start_date
            except ValueError:
                return ('Invalid date format', 400)
        return jsonify(employee)
    
    else:
        return ('', 404)

@app.route('/update_employee/<int:id>', methods=['PUT'])
def update_employee(id):
    updated_data = request.get_json()
    users = load_users()
    employees = []
    for user in users:
        if user["username"] == session["user"]:
            employees = user["employees"]
    emp = None 
    for e in employees:
        if e["id"] == id:
            e["name"] = updated_data.get('name')
            e["age"] = updated_data.get('age')
            e["active"] = updated_data.get('active')
            e["gender"] = updated_data.get('gender')
            e["city"] = updated_data.get('city')
            e["email"] = updated_data.get('email')
            e["phone"] = updated_data.get('phone')
            e["salary"] = updated_data.get('salary')
            date_obj = datetime.strptime(updated_data.get('start_date'), '%Y-%m-%d')
            e["start_date"] = date_obj.strftime('%d %B %Y')
            emp = e
            break
    if emp:
        save_users(users)
        return jsonify(emp)
    else:
        return jsonify({'error': 'Employee not found'}), 404
    

@app.route('/delete_employee/<int:id>', methods=['DELETE'])
def delete_employee(id):
    users = load_users()
    user_employees = []
    new_employees = []
    for user in users:
        if user["username"] == session["user"]:
            user_employees = user["employees"]
    
    for employee in user_employees:
        if employee["id"] != id:
            new_employees.append(employee)
    
    for user in users:
        if user["username"] == session["user"]:
            user["employees"] = new_employees
            
    save_users(users)
    return jsonify({'message': 'Employee deleted successfully'})


# Helper function to load the max_id from a JSON file
def read_max_id():
    try:
        with open('max_id.json', 'r') as file:
            return json.load(file).get('max_id', 0)
    except FileNotFoundError:
        return 0  # If file doesn't exist, start with ID 0

# Helper function to save the max_id to a JSON file
def write_max_id(max_id):
    with open('max_id.json', 'w') as file:
        json.dump({'max_id': max_id}, file, indent=4)
        
        
        
@app.route('/employees')
def employees():
    return render_template('employees.html')

@app.route('/')
def index():
    employees = read_data()
    total_employees = len(employees)
    active_employees = sum(1 for emp in employees if emp.active)
    inactive_employees = total_employees - active_employees
    female_employees = sum(1 for emp in employees if emp.gender.lower() == 'female')
    male_employees = sum(1 for emp in employees if emp.gender.lower() == 'male')
    total_salary = sum(float(emp.salary) for emp in employees)
    stats = {
        'total_employees': total_employees,
        'active_employees': active_employees,
        'inactive_employees': inactive_employees,
        'female_employees': female_employees,
        'male_employees': male_employees,
        'total_salary': total_salary
    }
    
    return render_template('index.html', stats=stats)
if __name__ == '__main__':
    app.run(debug=True)