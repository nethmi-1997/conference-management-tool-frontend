import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./service/auth.service";

import Login from "./component/common/login.component";
import Register from "./component/common/register.component";
import Home from "./component/common/home.component";
import RP from "./component/common/rp.component";
import WP from "./component/common/wp.component";
import Download from "./component/common/download.component";
import ContactUs from "./component/common/contact-us.component";
import Profile from "./component/common/profile.component";

import BoardAdmin from "./component/admin/board-admin.component";
import BoardEditor from "./component/editor/board-editor.component";
//import BoardReviewer from "./component/board-reviewer.component";
import BoardReviewerRP from "./component/reviewer/board-reviewer-rp.component";
import BoardReviewerWP from "./component/reviewer/board-reviewer-wp.component";
import BoardRP from "./component/research-presenter/board-rp.component";
import BoardWP from "./component/workshop-presenter/board-wp.component";
import BoardAttendee from "./component/attendee/board-attendee.component";
//import BoardUser from "./component/board-user.component";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            showReviewerBoard: false,
            showReviewerBoardRP: false,
            showReviewerBoardWP: false,
            showRPBoard: false,
            showWPBoard: false,
            showAttendeeBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                showEditorBoard: user.roles.includes("ROLE_EDITOR"),
                //showReviewerBoard: user.roles.includes("ROLE_REVIEWER"),
                showReviewerBoardRP: user.roles.includes("ROLE_REVIEWER"),
                showReviewerBoardWP: user.roles.includes("ROLE_REVIEWER"),
                showRPBoard: user.roles.includes("ROLE_RP"),
                showWPBoard: user.roles.includes("ROLE_WP"),
                showAttendeeBoard: user.roles.includes("ROLE_ATTENDEE"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showAdminBoard, showEditorBoard, showReviewerBoardRP,
            showReviewerBoardWP, showRPBoard, showWPBoard, showAttendeeBoard } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        ICAF
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/all/rp"} className="nav-link">
                                Research Presentation
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/all/wp"} className="nav-link">
                                Workshop Presentation
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/download"} className="nav-link">
                                Download
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/contactus"} className="nav-link">
                                Contact Us
                            </Link>
                        </li>

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {showEditorBoard && (
                            <li className="nav-item">
                                <Link to={"/editor"} className="nav-link">
                                    Editor Board
                                </Link>
                            </li>
                        )}

                        {showReviewerBoardRP && (
                            <li className="nav-item">
                                <Link to={"/reviewer/rp"} className="nav-link">
                                    Reviewer Board RP
                                </Link>
                            </li>
                        )}

                        {showReviewerBoardWP && (
                            <li className="nav-item">
                                <Link to={"/reviewer/wp"} className="nav-link">
                                    Reviewer Board WP
                                </Link>
                            </li>
                        )}

                        {showRPBoard && (
                            <li className="nav-item">
                                <Link to={"/rp"} className="nav-link">
                                    RP Board
                                </Link>
                            </li>
                        )}

                        {showWPBoard && (
                            <li className="nav-item">
                                <Link to={"/wp"} className="nav-link">
                                    WP Board
                                </Link>
                            </li>
                        )}

                        {showAttendeeBoard && (
                            <li className="nav-item">
                                <Link to={"/attendee"} className="nav-link">
                                    Attendee Board
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href={"/login"} className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/all/rp" component={RP} />
                        <Route exact path="/all/wp" component={WP} />
                        <Route exact path="/download" component={Download} />
                        <Route exact path="/contactus" component={ContactUs} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/editor" component={BoardEditor} />
                        <Route path="/reviewer/rp" component={BoardReviewerRP} />
                        <Route path="/reviewer/wp" component={BoardReviewerWP} />
                        <Route path="/rp" component={BoardRP} />
                        <Route path="/wp" component={BoardWP} />
                        <Route path="/Attendee" component={BoardAttendee} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
