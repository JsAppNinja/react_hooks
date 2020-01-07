import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { omitDeep } from '@common/helpers/misc';
import { Panel, If } from '@common/components/common';
import { CONNECTIVITY_METHODS } from '@constants/property-connectivity-methods';
import AccountInfoPanel from '@user/components/account-details/AccountInfoPanel';
import { DesignatedContactsForm } from '@hotel/components/hotel-onboard';
import {
  InfoForm,
  DescriptionForm,
  FeesForm,
  ConnectivityForm
} from '@hotel/components/forms';
import AddRoomDescriptionsForm from '@hotel/components/hotel-onboard/SetupRoomInventoryForm/AddRoomDescriptionsForm';
import PropertyDescSummary from '@common/components/properties/PropertySummary/PropertyDescSummary';
import PropertyDesignatedContactsSummary from '@common/components/properties/PropertySummary/PropertyDesignatedContactsSummary';
import PropertyFeeSummary from '@common/components/properties/PropertySummary/PropertyFeeSummary';
import PropertyProfileSummary from '@common/components/properties/PropertySummary/PropertyProfileSummary';
import PropertyConnectivitySummary from '@common/components/properties/PropertySummary/PropertyConnectivitySummary';
import PropertyRoomTypeSummary from '@common/components/properties/PropertySummary/PropertyRoomTypeSummary';
import PropertyImageEditor from '@common/components/properties/PropertyImageEditor';
import {
  SAVE_PROPERTY_MUTATION,
  UPDATE_USER_MUTATION
} from '@common/mutations';
import EditablePanel from './EditablePanel';

function EditPropertyForms({
  property,
  saveProperty,
  updateUser,
  visiblePanels,
  isConnectivityEditable,
  isTaxEditable,
  enqueueSnackbar
}) {
  const user = property.user
    ? property.user
    : {
        id: null,
        username: null,
        email: null
      };

  property = { ...omitDeep(property, ['__typename']) };
  if (property.primaryAddress) {
    property.primaryAddress.city = { ...property.city };
  }

  property.bookingContacts = property.contacts.filter(
    contact => contact.departmentName === 'Bookings'
  );
  property.nonbookingContacts = property.contacts.filter(
    contact => contact.departmentName !== 'Bookings'
  );

  const onFinishRoomTypeEdit = async () => {
    // trick to load room types
    try {
      await saveProperty({ variables: { id: property.id } });
    } catch (err) {
      console.log('error saving property:', err);
    }
  };

  const onSubmitProperty = async (values, actions) => {
    if (!values) {
      return;
    }

    let variables = null;
    if (
      values.rateSource &&
      values.rateSource !== CONNECTIVITY_METHODS.SYNXIS
    ) {
      variables = { rateSource: values.rateSource, id: property.id };
    } else {
      variables = { ...values, id: property.id };
    }

    const address = variables.primaryAddress;
    if (address && address.city.id) {
      variables.cityId = address.city.id;
      address.city = address.city.name;
    }

    if (variables.fees) {
      variables.fees = variables.fees.map(fee => {
        return {
          ...fee,
          amount: Math.round(parseFloat(fee.amount) * 100)
        };
      });
    }

    if (!variables.cancelWithinAmount) {
      delete variables.cancelWithinAmount;
      delete variables.cancelWithinUnit;
      delete variables.cancellationCharge;
      delete variables.nonRefundable;
    }

    if (variables.taxesPaidAtBooking) {
      variables.taxesPaidAtBooking =
        variables.taxesPaidAtBooking === 'booking' ? true : false;
    } else {
      delete variables.taxesPaidAtBooking;
    }

    const { bookingContacts, nonbookingContacts } = variables;

    if (bookingContacts || nonbookingContacts) {
      variables.contacts = (bookingContacts || property.bookingContacts).concat(
        nonbookingContacts || property.nonbookingContacts
      );
    }

    try {
      await saveProperty({ variables });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }

    actions.setSubmitting(false);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <If condition={visiblePanels.includes('account')}>
          <AccountInfoPanel user={user} updateUser={updateUser} />
        </If>
        <If condition={visiblePanels.includes('profile')}>
          <EditablePanel
            title="Hotel Profile Information"
            defaultValues={property}
            onSubmit={onSubmitProperty}
            Form={InfoForm}
            Summary={PropertyProfileSummary}
          />
        </If>
        <If condition={visiblePanels.includes('photos')}>
          <Panel title="Hotel Profile Photos">
            <PropertyImageEditor propertyId={property.id} />
          </Panel>
        </If>
        <If condition={visiblePanels.includes('description')}>
          <EditablePanel
            title="Hotel Description & Amenities"
            defaultValues={property}
            onSubmit={onSubmitProperty}
            Form={DescriptionForm}
            Summary={PropertyDescSummary}
          />
        </If>
        <If condition={visiblePanels.includes('roomType')}>
          <EditablePanel
            title="Room Type & Descriptions"
            defaultValues={property}
            onSubmit={onFinishRoomTypeEdit}
            Form={AddRoomDescriptionsForm}
            Summary={PropertyRoomTypeSummary}
            extraProps={{ propertyId: property.id }}
          />
        </If>
        <If condition={visiblePanels.includes('fees')}>
          <EditablePanel
            title="Hotel Fees & Cancellation Policy"
            defaultValues={{
              ...property,
              fees: get(property, 'fees', []).map(fee => ({
                ...fee,
                amount: parseFloat((fee.amount / 100).toFixed(2))
              })),
              taxesPaidAtBooking:
                property.taxesPaidAtBooking === true
                  ? 'booking'
                  : property.taxesPaidAtBooking === false
                  ? 'check-in'
                  : ''
            }}
            onSubmit={onSubmitProperty}
            Form={FeesForm}
            Summary={PropertyFeeSummary}
            extraProps={{ isTaxEditable }}
          />
        </If>
        <If condition={visiblePanels.includes('contacts')}>
          <EditablePanel
            title="Designated Contacts"
            defaultValues={property}
            onSubmit={onSubmitProperty}
            Form={DesignatedContactsForm}
            Summary={PropertyDesignatedContactsSummary}
          />
        </If>
        <If condition={visiblePanels.includes('connectivity')}>
          <EditablePanel
            title="Connectivity"
            defaultValues={property}
            onSubmit={onSubmitProperty}
            Form={ConnectivityForm}
            Summary={PropertyConnectivitySummary}
            extraProps={{ isEditable: isConnectivityEditable }}
          />
        </If>
      </Grid>
    </Grid>
  );
}

EditPropertyForms.propTypes = {
  isTaxEditable: PropTypes.bool,
  isConnectivityEditable: PropTypes.bool,
  property: PropTypes.object.isRequired,
  saveProperty: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  visiblePanels: PropTypes.array.isRequired,
  enqueueSnackbar: PropTypes.func
};

EditPropertyForms.defaultProps = {
  visiblePanels: [
    'account',
    'profile',
    'photos',
    'description',
    'roomType',
    'fees',
    'contacts',
    'connectivity'
  ]
};

const enhance = compose(
  graphql(SAVE_PROPERTY_MUTATION, { name: 'saveProperty' }),
  graphql(UPDATE_USER_MUTATION, { name: 'updateUser' }),
  withRouter,
  withSnackbar
);

export default enhance(EditPropertyForms);
