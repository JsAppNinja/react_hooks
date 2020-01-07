import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

SearchablePresets.propTypes = {
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      variables: PropTypes.object
    })
  ),
  preset: PropTypes.string.isRequired,
  setPreset: PropTypes.func.isRequired
};

function SearchablePresets({ presets, preset, setPreset, ...rest }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" {...rest}>
      <Tabs value={preset} onChange={(e, newTab) => setPreset(newTab)}>
        {presets.map(p => (
          <Tab key={p.value} label={p.label} value={p.value} />
        ))}
      </Tabs>
    </Box>
  );
}

export default SearchablePresets;
