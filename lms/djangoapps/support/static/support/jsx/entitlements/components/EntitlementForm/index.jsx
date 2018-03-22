import React from 'react';
import PropTypes from 'prop-types';

import { Button, InputSelect, InputText, TextArea } from '@edx/paragon';


class EntitlementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReissue: false,
      courseUuid: '',
      username: '',
      mode: '',
      comments: 'Add any additional comments here',
    };
    this.handleCourseUUIDChange = this.handleCourseUUIDChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const isReissue = nextProps.entitlement !== null && nextProps.entitlement !== undefined;
    this.setState({
      isReissue,
      comments: 'Add any additional comments here',
    });
    if (isReissue) {
      const { courseUuid, mode, user } = nextProps.entitlement;
      this.setState({
        courseUuid,
        mode,
        username: user,
      });
    }
  }

  onClose() {
    this.props.closeForm();
  }

  handleCourseUUIDChange(courseUuid) {
    this.setState({ courseUuid });
  }

  handleUsernameChange(username) {
    this.setState({ username });
  }

  handleModeChange(mode) {
    this.setState({ mode });
  }

  handleCommentsChange(comments) {
    this.setState({ comments });
  }

  submitForm() {
    if (this.state.isReissue) { // if there is an active entitlement we are updating an entitlement
      const { comments } = this.state;
      const { entitlement } = this.props;
      this.props.reissueEntitlement({ entitlement, comments });
    } else { // if there is no active entitlement we are creating a new entitlement
      const { courseUuid, username, mode, comments } = this.state;
      this.props.createEntitlement({ courseUuid, username, mode, comments });
    }
  }

  render() {
    const { isReissue, courseUuid, username, mode, comments } = this.state;
    const title = isReissue ? 'Re-issue Entitlement' : 'Create Entitlement';

    const body = (
      <div>
        <h3> {title} </h3>
        <InputText
          disabled={isReissue}
          name="courseUuid"
          label="Course UUID"
          value={courseUuid}
          onChange={this.handleCourseUUIDChange}
        />
        <InputText
          disabled={isReissue}
          name="username"
          label="Username"
          value={username}
          onChange={this.handleUsernameChange}
        />
        <InputSelect
          disabled={isReissue}
          name="mode"
          label="Mode"
          value={mode}
          options={[
            { label: '--', value: '' },
            { label: 'Verified', value: 'verified' },
            { label: 'Professional', value: 'professional' },
          ]}
          onChange={this.handleModeChange}
        />
        <TextArea
          name="comments"
          label="Comments"
          value={comments}
          onChange={this.handleCommentsChange}
        />
        <div>
          <Button
            className={['btn', 'btn-secondary']}
            label="Close"
            onClick={this.onClose}
          />
          <Button
            className={['btn', 'btn-primary']}
            label="Submit"
            onClick={this.submitForm}
          />
        </div>
      </div>
    );

    return (
      <div>
        { this.props.isOpen ? body : null }
      </div>
    );
  }
}

EntitlementForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  entitlement:PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    courseUuid: PropTypes.string.isRequired,
    enrollmentCourseRun: PropTypes.string,
    created: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    expiredAt: PropTypes.string,
    mode: PropTypes.string.isRequired,
    orderNumber: PropTypes.string,
    supportDetails: PropTypes.arrayOf(PropTypes.shape({
      supportUser: PropTypes.string,
      action: PropTypes.string,
      comments: PropTypes.string,
      unenrolledRun: PropTypes.string,
    })),
    user: PropTypes.string.isRequired,
  }).isRequired,
  createEntitlement: PropTypes.func.isRequired,
  reissueEntitlement: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default EntitlementForm;
