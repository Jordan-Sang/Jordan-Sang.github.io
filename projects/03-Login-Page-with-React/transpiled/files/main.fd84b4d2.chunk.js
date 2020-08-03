(this.webpackJsonpapp = this.webpackJsonpapp || []).push([
    [0], {
        13: function (e, t, a) {},
        14: function (e, t, a) {},
        15: function (e, t, a) {
            "use strict";
            a.r(t);
            var n = a(0),
                s = a.n(n),
                r = a(7),
                l = a.n(r),
                i = (a(13), a(2)),
                o = a(3),
                c = a(5),
                u = a(4),
                m = (a(14), a(1)),
                g = function (e) {
                    Object(c.a)(a, e);
                    var t = Object(u.a)(a);

                    function a(e) {
                        var n;
                        return Object(i.a)(this, a), (n = t.call(this, e)).state = {
                            hasAccount: !0,
                            isLoggedIn: !1,
                            users: [],
                            currentUser: void 0
                        }, n.toggleForm = n.toggleForm.bind(Object(m.a)(n)), n.signIn = n.signIn.bind(Object(m.a)(n)), n.register = n.register.bind(Object(m.a)(n)), n.signOut = n.signOut.bind(Object(m.a)(n)), n.getUsers = n.getUsers.bind(Object(m.a)(n)), n.render = n.render.bind(Object(m.a)(n)), n
                    }
                    return Object(o.a)(a, [{
                        key: "toggleForm",
                        value: function () {
                            this.state.hasAccount ? this.setState({
                                hasAccount: !1
                            }) : this.setState({
                                hasAccount: !0
                            })
                        }
                    }, {
                        key: "signIn",
                        value: function () {
                            this.getUsers();
                            for (var e = document.getElementById("email").value, t = document.getElementById("password").value, a = JSON.parse(localStorage.getItem("users")), n = 0; n < a.length; n++) {
                                if (a[n].email === e.toLowerCase() && a[n].password === t) {
                                    var s = a[n].name;
                                    return this.setState({
                                        currentUser: s,
                                        isLoggedIn: !0
                                    }), console.log(this.state.currentUser), console.log(this.state.isLogginIn), console.clear(), !0
                                }
                                return alert("Your email or password is incorrect. Please try again."), !1
                            }
                            0 === a.length && e.length > 10 && t.length > 8 && alert("Your email or password is incorrect. Please try again.")
                        }
                    }, {
                        key: "register",
                        value: function () {
                            var e = document.getElementById("name").value,
                                t = document.getElementById("email").value,
                                a = document.getElementById("password").value,
                                n = /[A-Za-z]{2,35}/,
                                s = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                r = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
                                l = JSON.parse(localStorage.getItem("users"));
                            if (!(n.test(e) && s.test(t) && r.test(a))) return n.test(e) ? s.test(t) ? r.test(a) || alert("Please make sure that your password is between 8 and 16 characters and contains at least one number, one lowercase letter, and one capital letter.") : alert("Please enter a valid email address.") : alert("Please enter a valid name."), !1;
                            var i = !1;
                            if (l)
                                for (var o = 0; o < l.length; o++) l[o].email === t && (i = !0);
                            if (!i) {
                                var c = {
                                    name: e,
                                    email: t,
                                    password: a
                                };
                                this.setState({
                                    currentUser: c.name
                                });
                                var u = this.state.users;
                                return u.push(c), this.setState({
                                    users: u
                                }), localStorage.removeItem("users"), localStorage.setItem("users", JSON.stringify(this.state.users)), this.setState({
                                    isLoggedIn: !0
                                }), !0
                            }
                            alert("An account with that email already exists.")
                        }
                    }, {
                        key: "signOut",
                        value: function () {
                            this.setState({
                                isLoggedIn: !1,
                                hasAccount: !0
                            })
                        }
                    }, {
                        key: "getUsers",
                        value: function () {
                            localStorage.getItem("users") || localStorage.setItem("users", JSON.stringify(this.state.users));
                            var e = JSON.parse(localStorage.getItem("users"));
                            this.setState({
                                users: e
                            })
                        }
                    }, {
                        key: "render",
                        value: function () {
                            if (this.state.isLoggedIn) {
                                var e = (new Date).getHours();
                                e >= 3 && e < 12 ? e = "morning" : e >= 12 && e < 18 ? e = "afternoon" : (e >= 18 || e < 3) && (e = "evening");
                                var t = this.state.currentUser;
                                return s.a.createElement("main", null, s.a.createElement("div", {
                                    className: "login-container"
                                }, s.a.createElement("form", {
                                    className: "login"
                                }, s.a.createElement("h1", null, "Welcome"), s.a.createElement("h2", {
                                    style: {
                                        marginBottom: "483px"
                                    }
                                }, "Good ", e, ", ", t, "!"), s.a.createElement("p", {
                                    className: "toggle"
                                }, s.a.createElement("span", {
                                    onClick: this.signOut
                                }, "Click here"), " to sign out"))))
                            }
                            return s.a.createElement("main", null, s.a.createElement("div", {
                                className: "login-container"
                            }, s.a.createElement("form", {
                                className: "login"
                            }, s.a.createElement("h1", null, this.state.hasAccount ? "Login" : "Register"), this.state.hasAccount ? "" : s.a.createElement("input", {
                                className: "credentials",
                                type: "text",
                                placeholder: "Name",
                                id: "name"
                            }), s.a.createElement("input", {
                                className: "credentials",
                                type: "email",
                                placeholder: "Email",
                                id: "email"
                            }), s.a.createElement("input", {
                                className: "credentials",
                                type: "password",
                                placeholder: "Password",
                                id: "password",
                                autoComplete: "password"
                            }), this.state.hasAccount ? s.a.createElement("input", {
                                className: "button",
                                type: "button",
                                onClick: this.signIn,
                                value: "Login"
                            }) : s.a.createElement("input", {
                                className: "button",
                                type: "button",
                                style: {
                                    marginBottom: "222px"
                                },
                                onClick: this.register,
                                value: "Sign Up"
                            }), this.state.hasAccount ? s.a.createElement("p", {
                                className: "toggle"
                            }, "Not a member? ", s.a.createElement("span", {
                                onClick: this.toggleForm
                            }, "Sign up now")) : s.a.createElement("p", {
                                className: "toggle"
                            }, "Already have an account? ", s.a.createElement("span", {
                                onClick: this.toggleForm
                            }, "Sign in here")))))
                        }
                    }]), a
                }(s.a.Component),
                d = function (e) {
                    Object(c.a)(a, e);
                    var t = Object(u.a)(a);

                    function a() {
                        return Object(i.a)(this, a), t.apply(this, arguments)
                    }
                    return Object(o.a)(a, [{
                        key: "render",
                        value: function () {
                            return s.a.createElement(g, null)
                        }
                    }]), a
                }(s.a.Component);
            l.a.render(s.a.createElement(s.a.StrictMode, null, s.a.createElement(d, null)), document.getElementById("app"))
        },
        8: function (e, t, a) {
            e.exports = a(15)
        }
    },
    [
        [8, 1, 2]
    ]
]);
//# sourceMappingURL=main.fd84b4d2.chunk.js.map