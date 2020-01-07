import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SearchablePresets from './SearchablePresets';

SearchableList.propTypes = {
  // heading props
  title: PropTypes.string,

  // filter props
  searchPlaceholder: PropTypes.string,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      variables: PropTypes.object
    })
  ),

  // table props
  renderRow: PropTypes.func.isRequired,
  renderHeadRow: PropTypes.func,

  // new props from container
  rows: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  loadData: PropTypes.func.isRequired,
  per: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  preset: PropTypes.string.isRequired,
  setPer: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setPreset: PropTypes.func.isRequired
};

SearchableList.defaultProps = {
  searchPlaceholder: 'Search Here',
  baseVariables: {}
};

function SearchableList({
  title,
  searchPlaceholder,
  presets,
  renderRow,
  renderHeadRow,
  rows,
  totalCount,
  per,
  setPer,
  page,
  setPage,
  search,
  setSearch,
  preset,
  setPreset
}) {
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="flex-end" flex={1}>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            &nbsp;({totalCount})
          </Typography>
        </Box>
        <Box>
          <TextField
            id="search"
            placeholder={searchPlaceholder}
            fullWidth
            margin="normal"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
      <SearchablePresets
        presets={presets}
        preset={preset}
        setPreset={setPreset}
      />

      <Table>
        {renderHeadRow && <TableHead>{renderHeadRow(preset)}</TableHead>}
        <TableBody>{rows.map(row => renderRow(row, preset))}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={totalCount}
              rowsPerPage={per}
              page={page}
              onChangePage={(e, p) => setPage(p)}
              onChangeRowsPerPage={e => setPer(+e.target.value)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
}

export default SearchableList;
