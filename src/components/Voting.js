import React from 'react';

class Voting extends React.Component {
	render() {
		const { pair } = this.props;

		return(
			<div className="voting">
				{
					(pair || []).map( entry => (
						<button key={entry}>
							<h1>{entry}</h1>
						</button>
					))
				}
			</div>
		);
	}
}
export default Voting;
