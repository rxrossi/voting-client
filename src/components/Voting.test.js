import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './Voting';
import { mount, shallow, render } from 'enzyme';
import { scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';

describe('Voting', () => {

	it('renders a pair of buttons', () => {
		const component = mount(
			<Voting pair={["Trainspotting", "28 Days Later"]} />
		);

		const buttons = component.find('button');

		expect(buttons.length).toEqual(2);
		expect(buttons.at(0).text()).toEqual('Trainspotting');
		expect(buttons.at(1).text()).toEqual('28 Days Later');
	});

	it('invokes callback when a button is clicked', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;

		const component = mount(
			<Voting pair={["Trainspotting", "28 Days Later"]} 
							vote={vote} />
		);

		const buttons = component.find('button');
		buttons.at(0).simulate('click')

		expect(votedWith).toEqual('Trainspotting');
	});

	it('disables buttons when user has voted', () => {
		const component = mount(
			<Voting pair={['Trainspotting', '28 Days Later']}
							hasVoted='Trainspotting' />
		);
		const buttons = component.find('button');
		
		expect(buttons.length).toEqual(2);
		expect(buttons.at(0).props().disabled).toEqual(true);
		expect(buttons.at(1).props().disabled).toEqual(true);
	});	
	
	it('adds label to the voted entry', () => {
		const component = mount(
			<Voting pair={["Trainspotting", "28 Days Later"]}
							hasVoted="Trainspotting" />
		);
		const buttons = component.find('button');

		expect(buttons.at(0).text()).toContain('Voted');
	});	

	it('renders just the winner when there is on', () => {
		const component = mount(
			<Voting winner="Trainspotting" />
		);
		const buttons = component.find('button');

		expect(buttons.length).toEqual(0);

		const winner = component.find('.winner');
		expect(winner.text()).toContain('Trainspotting');
	});

	it('renders as pure component', () => {
		const pair = ['Trainspotting', '28 Days Later'];
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).toEqual('Trainspotting');
	
		pair[0] = 'Sunshine';

		component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).toEqual('Trainspotting');
	});

});
