import * as React from 'react';
import { useCallback, useEffect, useState, forwardRef, useImperativeHandle, useRef  } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Slider, { SliderThumb } from '@mui/material/Slider';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import TableSortLabel from '@mui/material/TableSortLabel';
import PacmanLoader from "react-spinners/PacmanLoader";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Paper from '@mui/material/Paper';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {motion, AnimatePresence} from "framer-motion";
import "../../styles.css";
import { id } from 'date-fns/locale';
import Flip from 'react-reveal/Flip';

const Modal2 = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
  
    useImperativeHandle(ref, () => {
      return {
        open: () => setOpen(true),
        close: () => setOpen(false)
      };
    });
  
    return (
        <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{
                transform: "scale(0) rotateX(-360deg)",
                opacity: 0,
                transition: {
                  delay: 0.3,
                },
              }}
              animate={{
                transform: " scale(1) rotateX(0deg)",
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{
                transform: "scale(0) rotateX(360deg)",
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              onClick={() => setOpen(false)}
              className="modal-backdrop"
            />
            <motion.div
              initial={{
                transform: "scale(0) rotateX(-360deg)",
                opacity: 0,
                transition: {
                  delay: 0.3,
                },
              }}
              animate={{
                transform: " scale(1) rotateX(0deg)",
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{
                transform: "scale(0) rotateX(360deg)",
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              className="modal-content-wrapper2"
            >
              <motion.div
                className="modal-content"
                initial={{
                  x: 100,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.3
                  }
                }}
                exit={{
                  x: 100,
                  opacity: 0,
                  transition: {
                    duration: 0.3
                  }
                }}
              >
                {props.children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  });

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'department',
      numeric: false,
      disablePadding: false,
      label: 'Department',
    },
    {
      id: 'reason',
      numeric: false,
      disablePadding: false,
      label: 'Reason',
    },
    {
      id: 'meet',
      numeric: false,
      disablePadding: false,
      label: 'Meeting time',
    }
  ];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Terminations Record
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const style = {
  top: 'auto',
  position: 'fixed',
};

const styleModalForm = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 50,
  borderTopLeftRadius: 50,
  borderTopRightRadius: 10,
  border: '2px solid #000',
  boxShadow: 10,
  p: 4,

  
};

const styleModalForm2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderBottomLeftRadius: 7,
  borderBottomRightRadius: 25,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 7,
  border: '2px solid #000',
  boxShadow: 10,
  p: 4,
};

const menuItemAnimation = {
    hidden: (i) => ({
      padding: 0,
      x: "-100%",
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
    show: (i) => ({
      x: 0,
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
  };

export default function Termination() {  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])
    const modalRef = useRef();
    const modalRef2 = useRef();

  const [users, setUser] = useState();
  const [rec_id, setRec_id] = useState(null);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState("");
  const [meet, setMeet] = useState("");
  const [rows2, setRows] = useState();

  const [temp, setTemp] = useState();
  useEffect(() => {
    axios.get('/we/TerView.php').then(response => {
      setRows({ rows2: response.data});
      setUser(rows2 ? Object.values(rows2)[0] : null);
      console.log(rows2 ? Object.values(rows2)[0] : null);
      setRec_id();
      setName("");
      setReason("");
      setDepartment("");
      setMeet("");
    }).catch(function (error) {
      console.log(error);
    })
  }, []);


  function selectUser(id) {
    let item;
    for (let i=0; i<id; i++) {
      if (users != null && users.at(i-1).requestID == id) { 
        item = users[i-1];
        console.log(item);
        break;
      }
    }

    if( item!= null){
        setRec_id(item.requestID);
        setName(item.name);
        setReason(item.reason);
        setMeet(item.meet);
        setDepartment(item.department);
    }
  }

  const { register, reset, handleSubmit, setValue, control, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    
    axios.post("/we/TerInsert.php", data).then(res => console.log(res.data));
    axios.get('/we/TerView.php').then(response => {
      setRows({ rows2: response.data});
      setUser(rows2 ? Object.values(rows2)[0] : null);
      setRec_id();
      setName();
        setReason("");
        setMeet("");
        setDepartment("");
    }).catch(function (error) {
      console.log(error);
    })
  }

  const onUpdate = () => {
    let item={name, department, reason, meet, rec_id};
    console.log("item", item);
    axios.post('/we/TerUpdate.php', item).then(res => console.log(res.data));
    axios.get('/we/TerView.php').then(response => {
      setRows({ rows2: response.data});
      setUser(rows2 ? Object.values(rows2)[0] : null);
      setRec_id();
      setName();
        setReason("");
        setMeet("");
        setDepartment("");
    }).catch(function (error) {
      console.log(error);
    })
    
  }
  
  const onDelete = (data) => {
      console.log(data);
    axios.get("/we/TerDelete.php", { params: { id: data } }).then(console.log("data")).catch(err => console.log(err));
    axios.get('/we/TerView.php').then(response => {
      setRows({ rows2: response.data});
      setUser(rows2 ? Object.values(rows2)[0] : null);
      setRec_id();
      setName();
        setReason("");
        setMeet("");
        setDepartment("");
    }).catch(function (error) {
      console.log(error);
    })
  }

  // Modal forms
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = (Object.values(rows2)[0]).map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (Object.values(rows2)[0]).length) : 0;

  // for date
    const [value, setValue2] = React.useState(new Date().toLocaleDateString());

  const handleChange3 = (newValue) => {
    setValue2(newValue);
  };

  async function multi(row) {
    console.log(row);
    selectUser(row);
    await(3000);
    modalRef2.current.open();
  }

  
  

  return (
    <div >
    {
      loading ?
      
        <PacmanLoader
        size={25}
        color={"#3C5D56"}
        loading={loading}
        
        />
      : 
    <Box sx={{ width: '126%' }}>
      <Flip left>
      <Paper sx={{ width: '100%', mb: 2 }}>
      
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows2 ? (Object.values(rows2)[0]).length : null}
            />
            <TableBody>
              {rows2 ? stableSort(Object.values(rows2)[0], getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                      
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      className="tay"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                      <TableCell align="center">{row.reason}</TableCell>
                      <TableCell align="center">{row.meet}</TableCell>
                      <TableCell align="center">

                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                        <Fab size="small" color="secondary" type="reset"  aria-label="edit" onClick={() => multi(row.requestID)}>
                          <EditIcon />
                        </Fab>
                        </motion.button>
                      </TableCell>
                      <TableCell align="center">
                      <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                        <Fab size="small" color="tri" aria-label="delete" onClick={() => onDelete(row.requestID)}>
                            <DeleteIcon />
                        </Fab>
                    </motion.button>
                      </TableCell>
                    </TableRow>
                    // </motion.div>
                  );
                }) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 8, 15]}
          component="div"
          count={rows2 ? (Object.values(rows2)[0]).length : null}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Flip>
          <Modal2 ref={modalRef2}>
            <Typography fontFamily={"sans-serif"} id="transition-modal-title" variant="h5" component="h2">
              Update Recruitment
            </Typography>
            <br></br>
            <form >
            <FormControl variant="standard" >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{width: "60%"}}><TextField {...register("name", { required: true })} type="text" value={name} onChange={(e)=>{setName(e.target.value)}} id="standard-basic" label="Name" variant="standard" /></div>
                <div style={{width: "40%"}}>
                  <InputLabel style={{marginLeft: "60%"}} variant="standard" htmlFor="uncontrolled-native">
                    Departments
                  </InputLabel>
                  <Select
                    style={{width: "150%"}}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Department"
                    {...register("department", { required: true })}
                    value={department} onChange={(e)=>{setDepartment(e.target.value)}}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem  value={"Human Resources"}>Human Resources</MenuItem>
                    <MenuItem  value={"Information Security"}>Information Security</MenuItem>
                    <MenuItem  value={"Business Analytics"}>Business Analytics</MenuItem>
                  </Select>
                </div>
                  
                
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><TextField {...register("reason", { required: true })} value={reason} onChange={(e)=>{setReason(e.target.value)}} style={{width: "240%"}} id="standard-basic" label="Reason" variant="standard" /></div>
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><TextField {...register("meet", { required: true })} value={meet} onChange={(e)=>{setMeet(e.target.value)}} style={{ width: "240%"}} id="standard-basic" label="Meeting" variant="standard" /></div>
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Fab style={{marginLeft: "330%"}} type="submit" onClick={onUpdate} variant="extended" size="medium" color="primary" aria-label="add">
                    Submit
                  </Fab>
                </div>
                
                <div>
                  <Fab
                style={{marginLeft: "130%"}} type="reset" variant="extended" size="medium" color="" aria-label="add" >
                    Reset
                  </Fab>
                </div>
              </div>
            </FormControl>
            {/* </FormGroup> */}
            </form>
            </Modal2>
          

      
      <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
            <Fab onClick={() => modalRef.current.open()} color="primary" aria-label="add" style={style}>
                <AddIcon />
            </Fab>
        </motion.button>

        
          <Modal2 ref={modalRef}>
            <Typography fontFamily={"sans-serif"} id="transition-modal-title" variant="h5" component="h2">
              Add New Recruitment
            </Typography>
            <br></br>
            <form onSubmit={handleSubmit(onSubmit)} >
            <FormControl variant="standard" >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{width: "60%"}}><TextField {...register("name", { required: true })} type="text" id="standard-basic" label="Name" variant="standard" /></div>
                <div style={{width: "40%"}}>
                  <InputLabel style={{marginLeft: "60%"}} variant="standard" htmlFor="uncontrolled-native">
                    Departments
                  </InputLabel>
                  <Select
                    style={{width: "150%"}}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Department"
                    {...register("department", { required: true })}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem  value={"Human Resources"}>Human Resources</MenuItem>
                    <MenuItem  value={"Information Security"}>Information Security</MenuItem>
                    <MenuItem  value={"Business Analytics"}>Business Analytics</MenuItem>
                  </Select>
                </div>
                  
                
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><TextField {...register("reason", { required: true })} style={{width: "240%"}} id="standard-basic" label="Reason" variant="standard" /></div>
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><TextField {...register("meet", { required: true })} style={{ width: "240%"}} id="standard-basic" label="Meeting" variant="standard" /></div>
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Fab style={{marginLeft: "330%"}} type="submit" variant="extended" size="medium" color="primary" aria-label="add">
                    Submit
                  </Fab>
                </div>
                
                <div>
                  <Fab
                style={{marginLeft: "130%"}} type="reset" variant="extended" size="medium" color="" aria-label="add" >
                    Reset
                  </Fab>
                </div>
              </div>
            </FormControl>
            {/* </FormGroup> */}
            </form>
      </Modal2>
    </Box>
}</div>
  );
}