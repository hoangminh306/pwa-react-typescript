import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Switch, Route, } from 'react-router-dom';
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));
const TodoList = lazy(() => import('./pages/TodoList'));

function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<nav className="w-100">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/todolist">To do list</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path="/todolist">
						<TodoList />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
