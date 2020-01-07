import React from 'react';
import { CustomSelectField } from '@common/components/form';
import PROPERTY_ATTRIBUTES from '@constants/property-attributes';
import PropertyAttributeSelectItem from './PropertyAttributeSelectItem';

export default function PropertyAttributeSelect(props) {
  return (
    <CustomSelectField
      {...props}
      options={PROPERTY_ATTRIBUTES}
      renderItem={({ key, ...itemProps }) => (
        <PropertyAttributeSelectItem key={key} mr={1} mb={1} {...itemProps} />
      )}
    />
  );
}
