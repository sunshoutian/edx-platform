import React from 'react';
import PropTypes from 'prop-types';

import { Button, StatusAlert } from '@edx/paragon';
import SearchContainer from '../Search/SearchContainer.jsx';
import EntitlementSupportTableContainer from '../Table/EntitlementSupportTableContainer.jsx';
import EntitlementFormContainer from '../EntitlementForm/container.jsx';

const Main = props => (
  <div>
    <h2>
      Entitlement Support Page
    </h2>
    <StatusAlert
      alertType="danger"
      dialog={props.errorMessage}
      onClose={props.dismissErrorMessage}
      open={!!props.errorMessage}
    />
    <EntitlementFormContainer />
    { !props.isFormOpen ? <MainContent { ...props } /> : null }
  </div>
);

const MainContent = props => (
  <div>
    <SearchContainer />
    <Button
      className={['btn', 'btn-primary']}
      label="Create New Entitlement"
      onClick={props.openCreationForm}
    />
    <EntitlementSupportTableContainer ecommerceUrl={props.ecommerceUrl} />
  </div>
);

Main.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  dismissErrorMessage: PropTypes.func.isRequired,
  openCreationForm: PropTypes.func.isRequired,
  ecommerceUrl: PropTypes.string.isRequired,
  isFormOpen: PropTypes.bool.isRequired
};

export default Main;
