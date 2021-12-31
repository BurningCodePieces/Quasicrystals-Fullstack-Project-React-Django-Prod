import { React, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'
export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.status != null) {
                if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
                else if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
                else if (error.msg.password) alert.error(`Password: ${error.msg.password.join()}`);
                else if (error.msg.new_password) alert.error(`Password: ${error.msg.new_password.join()}`);
                else if (error.msg.re_new_password) alert.error(`Password: ${error.msg.re_new_password.join()}`);
                else if (error.msg.non_field_errors) alert.error(`Passwords: ${error.msg.non_field_errors.join()}`);
                else if (error.msg.token) alert.error(`Token: ${error.msg.token.join()} It probably means you are trying to change password again from the same link.`);
                else if (error.status === 401) alert.error(`Invalid credentials, try again.`);
                else if (error.status === 500) alert.error(`Server error, try again or contact administrator. Make sure you are not using incorrect characters (polish letters)`);
                else if (error.status === 511) alert.error(`Server error while connecting to database`);
                else alert.error(`Error: Provided data is invalid, try again`);
            }
        }

        if (message !== prevProps.message) {
            if (message.reset_password_link_sent) { alert.success(message.reset_password_link_sent) }
            else if (message.logged_in_successfully) { alert.success(message.logged_in_successfully) }
            else if (message.logged_out) { alert.success(message.logged_out) }
            else if (message.signed_up_successfully) { alert.success(message.signed_up_successfully) }
            else if (message.need_to_be_logged_in) { alert.error(message.need_to_be_logged_in) }
            else if (message.provide_both_inputs_for_element) { alert.error(message.provide_both_inputs_for_element) }
            else if (message.range_values_0_1) { alert.error(message.range_values_0_1) }
            else if (message.sum_of_percents_formula_need_to_be_equal_100) { alert.error(message.sum_of_percents_formula_need_to_be_equal_100) }
            else if (message.admin_route) { alert.error(message.admin_route) }
            else if (message.user_route) { alert.error(message.user_route) }
            else if (message.structure_added) { alert.success(message.structure_added) }
            else if (message.structure_adding_fail) { alert.error(message.structure_adding_fail) }
            else if (message.structure_deleted) { alert.success(message.structure_deleted) }
            else if (message.structure_deleting_fail) { alert.error(message.structure_deleting_fail) }
            else if (message.structure_not_verified) { alert.error(message.structure_not_verified) }
            else if (message.structure_status_changed) { alert.success(message.structure_status_changed) }
            else if (message.structure_status_unchanged) { alert.error(message.structure_status_unchanged) }
            else if (message.structure_error_field_info) { alert.error(message.structure_error_field_info) }
            else if (message.user_permission_bad_request) { alert.error(message.user_permission_bad_request) }
            else if (message.not_logged_in) { alert.error(message.not_logged_in) }
            else if (message.user_permission_changed) { alert.success(message.user_permission_changed) }
            else if (message.reset_password_error) { alert.error(message.reset_password_error) }
            else if (message.reset_password_confirmed) { alert.success(message.reset_password_confirmed) }
            else if (message.reset_password_confirming_error) { alert.error(message.reset_password_confirming_error) }
            else if (message.no_server_response) { alert.error(message.no_server_response) }
        }
    };

    render() {
        return <Fragment />
    }
}
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});
export default connect(mapStateToProps)(withAlert()(Alerts));