import React from 'react';

export default ({pair, vote, hasVoted}) => (
	<div className="voting">
		{
			(pair || []).map( entry => (
				<button key={entry}
								disabled={hasVoted !== undefined}
								onClick={() => vote(entry)} >
					<h1>{entry}</h1>
					{ 
						hasVoted === entry ?
						<div className="label">Voted</div> :
						null
					}
				</button>
			))
		}
	</div>
);
