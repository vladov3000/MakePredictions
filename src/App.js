import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Predictions from './Predictions.js';
import Home from './Home.js';
import Tabs from './Tabs';

require('./styles.css');

class App extends Component {

  state = {
    data: [],
    intervalIsSet: false,
    username: "",
  };

  // fetch data here
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // kill the process
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    if (this.state.username) {
      fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    }
    console.log(this.state.data);
  };

  addUserToDB = (username, password) => {
    axios.post('http://localhost:3001/api/putData', {
      username: username,
      password: password,
    });
  };

  deleteUserFromDB = (username) => {
    let userToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.username == username) {
        userToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: userToDelete,
      },
    });
  };

  /*
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };
  */

  render() {
    return (
      <div>
        <h1> Best Bet </h1>
          <Tabs>
          <div label="Home">
            {!this.state.username &&
              <Formik
                initialValues = {{ username: '', password: ''}}
                validate = {values => {
                  const errors = {};
                  if (!values.username) {
                    errors.username = 'Username required';
                  }
                  if (!values.password) {
                    errors.password = 'Password required';
                  }
                  return errors;
                }}
                onSubmit = {(values, { setSubmitting }) =>{
                  /*
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                  */

                  this.addUserToDB(values.username,values.password);
                  this.setState({username: values.username})
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field type="text" name="username" />
                    <ErrorMessage name="username" component="div" />
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            }
            {this.state.username != "" && 
              <Home
                username = {this.state.username}
                data = {this.state.data}
              >
              </Home>
            }
          </div>
          <div label="Predictions">
            <Predictions></Predictions>
          </div>
          <div label="Tab3">
            Nothing to see here, this tab is <em>tab3</em>
          </div>
        </Tabs>
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
export default App;
