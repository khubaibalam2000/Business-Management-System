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
import PacmanLoader from "react-spinners/PacmanLoader";
import TableSortLabel from '@mui/material/TableSortLabel';
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
// import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {motion, AnimatePresence} from "framer-motion";
// import "../styles.css";
import { id } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  {
    name: 'Potato',
    batchReleased: 5000,
    batchInventory: 8000,
    amt: 2400,
  },
  {
    name: 'Soap',
    batchReleased: 200,
    batchInventory: 6000,
    amt: 2210,
  },
  {
    name: 'Shampoo',
    batchReleased: 2000,
    batchInventory: 9800,
    amt: 2290,
  },
  {
    name: 'Bags',
    batchReleased: 2780,
    batchInventory: 3908,
    amt: 2000,
  },
  {
    name: 'Towels',
    batchReleased: 1890,
    batchInventory: 4800,
    amt: 2181,
  },
  {
    name: 'Medicines',
    batchReleased: 2390,
    batchInventory: 3800,
    amt: 2500,
  },
  {
    name: 'Printers',
    batchReleased: 3490,
    batchInventory: 4300,
    amt: 2100,
  },
];

const data2= [
  {
    name: 'Potato',
    sales: 300000,
  },
  {
    name: 'Soap',
    sales: 340000,
  },
  {
    name: 'Shampoo',
    sales: 250000,
  },
  {
    name: 'Bags',
    sales: 400000,
  },
  {
    name: 'Towels',
    sales: 230000,
  },
  {
    name: 'Medicines',
    sales: 360000,
  },
  {
    name: 'Printers',
    sales: 180000,
  },
];

const data3= [
  {
    Department: 'Human Resources',
    Averge_salary: 300000,
  },
  {
    Department: 'Information Security',
    Averge_salary: 340000,
  },
  {
    Department: 'Bussiness Intelligence',
    Averge_salary: 250000,
  },
];

const data4= [
  {
    name: 'Potato',
    BatchRelease: 5000,
  },
  {
    name: 'Soap',
    BatchRelease: 200,
  },
  {
    name: 'Shampoo',
    BatchRelease: 2000,
  },
  {
    name: 'Bags',
    BatchRelease: 2780,
  },
  {
    name: 'Towels',
    BatchRelease: 1890,
  },
  {
    name: 'Medicines',
    BatchRelease: 2390,
  },
  {
    name: 'Printers',
    BatchRelease: 3490,
  },
];

const data5= [
  {
    name: 'Potato',
    batchInventory: 8000,
  },
  {
    name: 'Soap',
    batchInventory: 6000,
  },
  {
    name: 'Shampoo',
    batchInventory: 9800,
  },
  {
    name: 'Bags',
    batchInventory: 3908,
  },
  {
    name: 'Towels',
    batchInventory: 4800
  },
  {
    name: 'Medicines',
    batchInventory: 3800,
  },
  {
    name: 'Printers',
    batchInventory: 4300,
  },
];


export default function Homepage ()  {
  // static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

    return (
      // <ResponsiveContainer width="100%" height="100%">
      
      <div>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h3"
          id="tableTitle"
          component="div"
          alignItems={"center"}
        >
          Dashboard
        </Typography>
        <br></br><br></br><br></br>
        <div style={{float: "left"}}>
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="batchInventory" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="batchReleased" stroke="#82ca9d" />
        </LineChart>
        </div>
        <div style={{float: "left"}}>
        <BarChart
          width={550}
          height={300}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
        </div>
        <div style={{float: "right"}}>
        <BarChart
          width={600}
          height={300}
          data={data3}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Averge_salary" fill="#82ca9d" />
        </BarChart>
        </div>
        <div style={{float: "right"}}>
        <BarChart
          width={600}
          height={300}
          data={data4}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="BatchRelease" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="BatchRelease" fill="#82ca9d" />
        </BarChart>
        </div>
        <div style={{float: "right"}}>
        <BarChart
          width={600}
          height={300}
          data={data5}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="batchInventory" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="batchInventory" fill="#82ca9d" />
        </BarChart>
        </div>
      </div>
      // </ResponsiveContainer>
    );
  }