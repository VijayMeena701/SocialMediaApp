import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";
import axios from "axios";

//Redux importing Stuff
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//import Pages
import home from "./pages/home";
// import login from './pages/login';
import signup from "./pages/signup";
import signin from "./pages/signin";
import user from "./pages/user";
import about from "./pages/About";

//import Components
import Navbar from "./components/layout/Navbar";

axios.defaults.baseURL =
	"https://asia-south1-socialmedia-78833.cloudfunctions.net/api";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#629749",
			main: "#33691e",
			dark: "#003d00",
			contrastText: "#fff",
		},
		secondary: {
			light: "#484848",
			main: "#212121",
			dark: "#000000",
			contrastText: "#fff",
		},
	},
	typography: {
		useNextVariants: true,
	},
});

const token = localStorage.FireBaseIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	console.log(decodedToken);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = "/login";
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common["Authorization"] = token;
		store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<Navbar></Navbar>
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute exact path="/login" component={signin} />
								<AuthRoute exact path="/signup" component={signup} />
								<Route exact path="/users/:handle" component={user} />
								<Route
									exact
									path="/users/:handle/post/:postId"
									component={user}
								/>
								<Route exact path="/users/:handle/about" component={about} />
							</Switch>
						</div>
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
