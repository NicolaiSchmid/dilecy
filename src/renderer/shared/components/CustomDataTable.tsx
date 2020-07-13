/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// typings are here:
import { Icons, Localization } from 'material-table';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { customTheme } from '../styles/theme';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

declare global {
  type Dictionary<T> = { [key: string]: T };
}

export interface Column {
  title: string;
  field: string;
  customSort?: (a: any, b: any) => number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,

    '& .MuiTableCell-root': {
      fontSize: customTheme.fontSizeBodySmall
    },
    '& th': {
      backgroundColor: '#EBEBEB'
    },
    '& .MuiPaper-elevation2': {
      boxShadow: 'none'
    },
    '& tr:nth-child(even)': {
      backgroundColor: '#f2f2f2'
    },
    '& .MuiTypography-caption': {
      fontSize: '1rem',
      fontFamily: 'Montserrat',
      fontWeight: '400',
      lineHeight: '1.5'
    },

    '& .MuiSelect-select.MuiSelect-select': {
      paddinRight: '2.25rem'
    },

    '& .MuiSelect-icon': {
      top: 'unset'
    },

    '& .MuiTableCell-footer': {
      borderBottom: 'none'
    },

    '& .MuiTable-root': {
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white'
    },

    '& .MuiToolbar-root': {
      position: 'sticky',
      top: '0',
      backgroundColor: 'white',
      zIndex: '11'
    }
  }
}));
interface Props<T> {
  columns: Column[];
  rows: T[];
  title: string;
  // If Table needs to be full-height set height manually and apply overflow
  rootStyle?: { [key: string]: string };
  onSelectionChange?: (data: T[], rowData: T | undefined) => void;
  selected?: (data: T) => { checked: boolean };
}
const localization: Localization = {
  toolbar: {
    searchPlaceholder: 'Suchtext'
  }
};
const CustomDataTable = <T extends Dictionary<any>>(props: Props<T>) => {
  const { columns, rows, onSelectionChange, rootStyle, selected } = props;
  const classes = useStyles();
  return (
    <div className={classes.root} style={rootStyle}>
      <MaterialTable
        columns={columns}
        data={rows}
        options={{
          selection: true,
          showTitle: false,
          showTextRowsSelected: false,
          showFirstLastPageButtons: false,
          pageSize: 5,
          showSelectAllCheckbox: true,
          emptyRowsWhenPaging: false,
          selectionProps: selected
        }}
        icons={tableIcons}
        localization={localization}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
};

export default CustomDataTable;