from flask import Flask, render_template,request,render_template, url_for,redirect,flash,session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app =Flask(__name__)
app.secret_key="thisissecreatkey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sai@localhost:5432/authenticationdb'

db= SQLAlchemy(app)
bcrypt = Bcrypt(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password= db.Column(db.String(120), unique=True, nullable=False)

with app.app_context():
    db.create_all() 

@app.route('/')
def home():
    return render_template('login.html')

# @app.route('/login',methods=['GET','POST'])
# def login():
#     if request.method=='POST':
#       #handel login

#         pass
#     return render_template('login.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    session.clear()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            # Successful login
            flash('Login successful!', 'success')
            # Store user information in the session
            session["user_id"] = user.id
            session["username"] = user.username

            return redirect(url_for('dashboard'))
        else:
            # Failed login
            flash('Login failed. Check your username and password.', 'danger')

    return render_template('login.html')

@app.route('/logout')
def logout():
    # Clear the session variables to log the user out
    session.pop("user_id", None)
    session.pop("username", None)

    # Redirect to the login page or any other page you prefer
    return redirect(url_for('login'))

@app.route('/register',methods=['GET','POST'])
def register():
    session.clear()
    if request.method=='POST':
        username = request.form['username']
        password = request.form['password']
        password_repeat = request.form['password-repeat']

        # Check if password and password-repeat match
        if password == password_repeat:
            # Hash the password
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

            # Store hashed password in the database
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            session["username"] = new_user.username
            return render_template('index.html')

        else:
            return "Password and password-repeat do not match"

    return render_template("register.html")

@app.route('/dashboard')
def dashboard():
        # Access user info from the session
    user_id = session.get('user_id')
    username = session.get('username')

    return render_template('index.html', user_id=user_id, username=username)

@app.route('/bsort')
def bsort():
        # Access user info from the session
    user_id = session.get('user_id')
    username = session.get('username')

    return render_template('bsort.html', user_id=user_id, username=username)

if __name__=='__main__':
    app.run(debug=True)


