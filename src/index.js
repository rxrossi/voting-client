import React from 'react';
import ReactDOM from 'react-dom';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';
import reducer from './reducer';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { setState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state => 
		store.dispatch(setState(state))
);

const Router = () => (
	<BrowserRouter>
		<div>
			<Route exact path="/" component={VotingContainer} />
			<Route path="/results" component={ResultsContainer} />
		</div>
	</BrowserRouter>
); 


ReactDOM.render(
	<Provider store={store}>
		<Router />
	</Provider>,
  document.getElementById('root')
);
