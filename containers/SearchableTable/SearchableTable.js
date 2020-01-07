import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Link from '@material-ui/core/Link';
import TablePagination from '@material-ui/core/TablePagination';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SearchablePresets from '@common/containers/SearchableList/SearchablePresets';

SearchableTable.propTypes = {
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
  setCount: PropTypes.func.isRequired,
  setPreset: PropTypes.func.isRequired
};

SearchableTable.defaultProps = {
  searchPlaceholder: 'Search Here',
  setCount: () => undefined
};

function SearchableTable({
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
  setCount,
  preset,
  setPreset,
  ...rest
}) {
  useEffect(() => {
    setCount(totalCount);
  }, [totalCount]);

  return (
    <Box p={3} {...rest}>
      <Box display="flex" mb={3} justifyContent="space-between">
        <SearchablePresets
          presets={presets}
          preset={preset}
          setPreset={setPreset}
        />
        <TextField
          id="search"
          placeholder={searchPlaceholder}
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
      <Table>
        {renderHeadRow && <TableHead>{renderHeadRow()}</TableHead>}
        <TableBody>{rows.map(row => renderRow(row))}</TableBody>
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
      <Box
        pt={1}
        pb={3}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Link>Export CSV</Link>
      </Box>
    </Box>
  );
}

export default SearchableTable;
