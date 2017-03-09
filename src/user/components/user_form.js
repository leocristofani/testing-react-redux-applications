import React, { PropTypes, Component } from 'react';
import Panel from '../../shared_components/panel';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createUser(this.state);
  }
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.isCreatingUser || !!nextProps.createUserFailureMessage) return;
    this.setState({
      name: '',
      email: ''
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    const { isCreatingUser, createUserFailureMessage } = this.props;
    return (
      <Panel title="Create User">
        <form action="" className="row" onSubmit={this.handleSubmit}>
            <div className="col-sm-12">
              {createUserFailureMessage && <div className="alert alert-danger">{createUserFailureMessage}</div>}
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="name" className="control-label">Name <small className="text-muted">(required)</small></label>
              <input value={this.state.name} type="text" name="name" id="name" className="form-control" onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="email" className="control-label">Email <small className="text-muted">(required)</small></label>
              <input value={this.state.email} type="text" name="email" id="email" className="form-control" onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-12">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isCreatingUser}
              >{isCreatingUser ? 'Creating user...' : 'Create User'}</button>
            </div>
          </form>  
      </Panel>
    );
  }
}

UserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
  isCreatingUser: PropTypes.bool.isRequired,
  createUserFailureMessage: PropTypes.string
};

export default UserForm;