import React from 'react';
import { shallow, mount } from 'enzyme';
import Results from './Results';
import { List, Map } from 'immutable';

describe('Results', () => {
	
	it('renders entries with vote counts or zero', ()=> {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'Trainspotting': 5});
		const component = shallow(
			<Results pair={pair} tally={tally} />
		);
		const entries = component.find('.entry');
		const [train, days] = entries.map( e => e.text() );

		expect(entries.length).toEqual(2);
		expect(train).toContain('Trainspotting');
		expect(train).toContain('5');
		expect(days).toContain('28 Days Later');
		expect(days).toContain('0');
	});

	it('invokes the next callback when next button is clicked', ()=> {
		let nextInvoked = false;
		const next = () => nextInvoked = true;

		const pair = List.of('Trainspotting', '28 Days Later');
		const component = shallow(
			<Results pair={pair}
							 tally={Map()}
							 goNext={next} />
		);
		component.find('.nextButton').simulate('click');

		expect(nextInvoked).toEqual(true);
	});

	it('render the winner when there is one', ()=> {
		const component = mount(
			<Results winner="Trainspotting"
							 pair={["Trainspotting", "28 Days Later"]}
							 tally={Map()} />
		);
		const winner = component.find('.winner');
		expect(winner.text()).toContain('Trainspotting');
	});


});
