import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class Predictions extends Component {

	constructor(props) {
		super(props)

		this.state = {
			add: false,
			predictions: [],
		};
	}

	render() {
		return (
			<div className = "predictions">
				<div className = "add-predictions">
					<button 
						className = "add-button" 
						onClick = {() => this.setState({add:!this.state.add})}
					>
						New Prediction
						<FontAwesomeIcon icon={faPlus} />
					</button>

					{this.state.add &&
						<Formik
							initialValues = {{ name: '', date: new Date(), prob: null}}
							validate = {values => {
								const errors = {};
								if (!values.name) {
									errors.name = 'Name is required';
								} if (values.prob == null || values.prob < 0 || values.prob > 100) {
									errors.prob = 'Probability must be between 0 and 100'
								} if (values.date > new Date()) {
									errors.date = 'Date cannot be before today'
								}
								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
						        this.setState({
						        	predictions: this.state.predictions.concat(values)
						        })
						    }}
						>
							{({ isSubmitting }) => (
								<Form>
									<Field type = "text" name = "name" />
									<Field type = "date" name = "date" />
									<Field type = "number" name = "prob" />
									

									<ErrorMessage name="name" component="div"/>
									<ErrorMessage name="date" component="div"/>
									<ErrorMessage name="prob" component="div"/>

									<button type = "submit" disabled = {isSubmitting}>
										Submit
									</button>
								</Form>
							)}
						</Formik>
					}
				</div>

				<div className = "past-predictions">
					<p1> Past predictions:</p1>
					{this.state.predictions.map(item => {
						const { name, date, prob} = item
						return (
							<tr>
								<td>{name.toString()}</td>
								<td>{date.toDateString()}</td>
								<td>{prob.toString()}</td>
							</tr>
						)
					})}
				</div>
			</div>
		);
	}
}

export default Predictions;