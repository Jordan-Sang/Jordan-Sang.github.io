import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAccount: true,
            isLoggedIn: false,
            users: [],
            currentUser: undefined
        }

        this.toggleForm = this.toggleForm.bind(this);
        this.signIn = this.signIn.bind(this);
        this.register = this.register.bind(this);
        this.signOut = this.signOut.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.render = this.render.bind(this);
    }

    toggleForm() {
        if (this.state.hasAccount) {
            this.setState({
                hasAccount: false
            });
        } else {
            this.setState({
                hasAccount: true
            })
        }
    }

    signIn() {
        this.getUsers();

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        const logins = JSON.parse(localStorage.getItem('users'));

        for (let i = 0; i < logins.length; i++) {
            if (logins[i].email === emailInput && logins[i].password === passwordInput) {
                let currentUser = logins[i].name;
                this.setState({
                    currentUser: currentUser,
                    isLoggedIn: true
                });

                console.log(this.state.currentUser);
                console.log(this.state.isLogginIn);
                console.clear();

                return true;
            } else {
                alert('Your email or password is incorrect. Please try again.');
                return false;
            }
        }

        if (logins.length === 0 && emailInput.length > 10 && passwordInput.length > 8) {
            alert('Your email or password is incorrect. Please try again.');
        }
    }

    register() {
        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        const nameRegex = /[A-Za-z]{2,35}/;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

        const logins = JSON.parse(localStorage.getItem('users'));

        if (nameRegex.test(nameInput) && emailRegex.test(emailInput) && passwordRegex.test(passwordInput)) {
            let accountExists = false;

            if (logins) {
                for (let i = 0; i < logins.length; i++) {
                    if (logins[i].email === emailInput) {
                        accountExists = true;
                    }
                }
            }

            if (!accountExists) {
                const user = {
                    name: nameInput,
                    email: emailInput,
                    password: passwordInput
                };

                this.setState({
                    currentUser: user.name
                });

                const users = this.state.users;
                users.push(user);

                this.setState({
                    users: users
                });
                
                localStorage.removeItem('users');
                localStorage.setItem('users', JSON.stringify(this.state.users));

                this.setState({
                    isLoggedIn: true
                });

                return true;
            } else {
                alert('An account with that email already exists.')
            }
        } else {
            if (!nameRegex.test(nameInput)) {
                alert('Please enter a valid name.');
            } else if (!emailRegex.test(emailInput)) {
                alert('Please enter a valid email address.');
            } else if (!passwordRegex.test(passwordInput)) {
                alert('Please make sure that your password is between 8 and 16 characters and contains at least one number, one lowercase letter, and one capital letter.');
            }
            return false;
        }
    }

    signOut() {
        this.setState({
            isLoggedIn: false,
            hasAccount: true
        });
    }

    getUsers() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(this.state.users));
        }

        let users = JSON.parse(localStorage.getItem('users'));

        this.setState({
            users: users
        });
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <main>
                    <div className="login-container">
                        <form className="login">
                            <h1>{this.state.hasAccount ? 'Login' : 'Register'}</h1>
                            {!this.state.hasAccount ? <input className="credentials" type="text" placeholder="Name" id="name" /> : ''}
                            <input className="credentials" type="email" placeholder="Email" id="email" />
                            <input className="credentials" type="password" placeholder="Password" id="password" autoComplete="password" />
                            {this.state.hasAccount ? <input className="button" type="button" onClick={this.signIn} value="Login" /> : <input className="button" type="button" style={{marginBottom: 222 + 'px'}} onClick={this.register} value="Sign Up" />}
                            {this.state.hasAccount? <p className="toggle">Not a member? <span onClick={this.toggleForm}>Sign up now</span></p> : <p className="toggle">Already have an account? <span onClick={this.toggleForm}>Sign in here</span></p>}
                        </form>
                    </div>
                </main>
            );
        } else {
            let timeOfDay = new Date().getHours();

            if (timeOfDay >= 3 && timeOfDay < 12) {
                timeOfDay = 'morning';
            } else if (timeOfDay >= 12 && timeOfDay < 18) {
                timeOfDay = 'afternoon';
            } else if (timeOfDay >= 18 || timeOfDay < 3) {
                timeOfDay = 'evening';
            }

            let currentUser = this.state.currentUser;

            return (
                <main>
                    <div className="login-container">
                        <form className="login">
                            <h1>Welcome</h1>
                            <h2 style={{marginBottom: 483 + 'px'}}>Good {timeOfDay}, {currentUser}!</h2>
                            <p className="toggle"><span onClick={this.signOut}>Click here</span> to sign out</p>
                        </form>
                    </div>
                </main>
            )
        }
    }
}

export default Form;