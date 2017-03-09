import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../action_creators/user_create_action_creators';
import UserForm from './user_form';

function mapStateToProps(state) {
    return {
        isCreatingUser: state.user.isCreatingUser,
        createUserFailureMessage: state.user.createUserFailureMessage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);