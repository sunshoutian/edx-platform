import { formActions, entitlementActions } from '../actions/constants';

const clearForm = state => ({
  ...state,
  isOpen: false,
  activeEntitlement: null,
});

const form = (state = {}, action) => {
  switch (action.type) {
    case formActions.OPEN_REISSUE_FORM:
      return { ...state, isOpen: true, activeEntitlement: action.entitlement };
    case formActions.OPEN_CREATION_FORM:
      return { ...state, isOpen: true, activeEntitlement: null };
    case formActions.CLOSE_FORM:
    case entitlementActions.UPDATE_ENTITLEMENT_SUCCESS:
    case entitlementActions.CREATE_ENTITLEMENT_SUCCESS:
      return clearForm();
    default:
      return state;
  }
};

export default form;
