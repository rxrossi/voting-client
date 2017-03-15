import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

class Voting extends React.PureComponent {
	render () {
		const { winner, ...otherProps } = this.props; 
		return (
			<div className="voting">
				{
					winner !== undefined ?
					<Winner winner={winner} /> :
					<Vote {...otherProps} /> 
				}
			</div>
		);	
	}
}
export default Voting;
