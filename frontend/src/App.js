import React from "react"
import "./css/App.css";
import Top from "./page/Top";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/Header";

function App() {
    return (
        <div className="app">
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Top />
                    </Route>

                    <Route>
                        <h2>not found</h2>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
