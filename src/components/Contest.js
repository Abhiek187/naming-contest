import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

const Contest = ({_id, description, contestListClick, fetchNames, nameIds, lookupName, addName}) => {
	const [error, setError] = useState(false);
	const newNameInput = useRef(null);

	useEffect(() => {
		fetchNames(nameIds);
	}, [fetchNames, nameIds]); // only fetch names when the component did mount

	const handleSubmit = event => {
		event.preventDefault(); // don't reload the browser
		const newName = newNameInput.current.value;

		if (newName.length === 0) {
			return; // don't add an empty name to the list
		}

		// Read the value that the user typed
		addName(newName, _id).then(() => {
			newNameInput.current.value = ""; // clear the text field
			setError(false);
		}).catch(() => {
			// The server is down
			setError(true);
		});
	};

	return (
		<div className="Contest">
			<div className="card mb-3">
				<div className="card-header">
					<h3 className="card-title">Contest Description</h3>
				</div>
				<div className="card-body">
					<div className="contest-description">
					 	{description}
					</div>
				</div>
			</div>

			<div className="card mb-3">
				<div className="card-header">
					<h3 className="card-title">Proposed Names</h3>
				</div>
				<div className="card-body name-scroll">
					<ul className="list-group">
						{nameIds.map(nameId =>
							<li key={nameId} className="list-group-item">
								{lookupName(nameId).name}
							</li>
						)}
					</ul>
				</div>
			</div>

			<div className="card mb-3">
				<div className="card-header bg-info">
					<h3 className="card-title">Propose a New Name</h3>
				</div>
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="input-group">
							<input type="text"
								placeholder="New Name Here..."
								ref={newNameInput}
								className="form-control" />
							<span className="input-group-btn">
								<button type="submit" className="btn btn-info">Submit</button>
							</span>
						</div>
					</form>
				</div>
			</div>

			{error &&
				<div>
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
						The server has encountered an error. Please try again later.
						<button type="button" className="btn-close" data-bs-dismiss="alert"
							aria-label="Close"></button>
					</div>
				</div>
			}

			<div className="home-link link mb-3"
				onClick={contestListClick}>
				Contest List
			</div>
		</div>
	);
};

Contest.propTypes = {
	_id: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	contestListClick: PropTypes.func.isRequired,
	fetchNames: PropTypes.func.isRequired,
	nameIds: PropTypes.array.isRequired,
	lookupName: PropTypes.func.isRequired,
	addName: PropTypes.func.isRequired
};

export default Contest;
