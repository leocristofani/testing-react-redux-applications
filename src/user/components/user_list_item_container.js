import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUser } from '../action_creators/user_delete_action_creators';
import UserListItem from './user_list_item';

function mapStateToProps(state) {
    return {
        deletingUserId: state.user.deletingUserId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListItem);
