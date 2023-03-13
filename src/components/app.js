import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import AIChatUI from './ChatUI';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

const App = () => (
	<div id="app">
		{/* <Header /> */}
		<AIChatUI/>
		{/* <Router>
			<Home path="/" />
			<Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" />
		</Router> */}
	</div>
)

export default App;
