import React from 'react';
import Winner from './Winner';
import Vote from './Vote';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

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

const mapStateToProps = (state) => ({
	pair: state.getIn(['vote', 'pair']),
	winner: state.get('winner'),
	hasVoted: state.get('hasVoted')
});
export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);

export default Voting;
