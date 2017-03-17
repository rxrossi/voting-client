import React from 'react';
import Winner from './Winner';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

class Results extends React.PureComponent {

	getVotes(entry) {
		if (this.props.tally && this.props.tally.has(entry)) {
			return this.props.tally.get(entry)
		}
	}

	render () {
		const { pair, goNext, winner } = this.props;

		if (winner) {
			return <Winner winner={winner} />
		}
		return (
				<div className="results">
					<div className="tally">
						{
							(pair || []).map( entry =>
								<div key={entry} className="entry">
									<h1>{entry}</h1>
									<div className="voteCount">
										{this.getVotes(entry) || 0}
									</div>
								</div>
							)
						}
					</div>
					<div className="management">
						<button className="nextButton"
										onClick={goNext}
						>
							Next
						</button>
					</div>
				</div>
		);
	}
}

export default Results;

const mapStateToProps = (state) => ({
	pair: state.getIn(['vote', 'pair']),
	tally: state.getIn(['vote', 'tally']),
	winner: state.get('winner')
});

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
