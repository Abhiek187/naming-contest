import PropTypes from "prop-types";
import React, { Component } from "react";

class Contest extends Component {
	componentDidMount() {
		this.props.fetchNames(this.props.nameIds);
	}

	render() {
		return (
			<div className="Contest">
				<div className="card m-3">
					<div className="card-header">
						<h3 className="card-title">Contest Description</h3>
					</div>
					<div className="card-body">
						<div className="contest-description">
						 	{this.props.description}
						</div>
					</div>
				</div>

				<div className="card m-3">
					<div className="card-header">
						<h3 className="card-title">Proposed Names</h3>
					</div>
					<div className="card-body">
						<ul className="list-group">
							{this.props.nameIds.map(nameId =>
								<li key={nameId} className="list-group-item">
									{this.props.lookupName(nameId).name}
								</li>
							)}
						</ul>
					</div>
				</div>

				<div className="card m-3">
					<div className="card-header bg-info">
						<h3 className="card-title">Propose a New Name</h3>
					</div>
					<div className="card-body">
						<form>
							<div className="input-group">
								<input type="text" placeholder="New Name Here..." className="form-control" />
								<span className="input-group-btn">
									<button type="submit" className="btn btn-info">Submit</button>
								</span>
							</div>
						</form>
					</div>
				</div>

				<div className="home-link link"
					 onClick={this.props.contestListClick}>
					 Contest List
				</div>
			</div>
		);
	}
}

Contest.propTypes = {
	id: PropTypes.number.isRequired,
	contestListClick: PropTypes.func.isRequired,
	fetchNames: PropTypes.func.isRequired,
	nameIds: PropTypes.array.isRequired,
	lookupName: PropTypes.func.isRequired
};

export default Contest;
