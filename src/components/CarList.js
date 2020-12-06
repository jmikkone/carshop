
import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Addcar from './Addcar';
import Editcar from './Editcar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

export default function Carlist(){
const [cars, setCars] = useState([]);
const [open, setOpen] = useState(false);
useEffect (() => fetchData() , []);

const fetchData = () => {
fetch('https://carstockrest.herokuapp.com/cars')
.then(response => response.json())
.then(data => setCars(data._embedded.cars))
}


const VerifyDelete = () => {
     
    setOpen(true);
}

const handleClose = () => {
    setOpen(false)
}

const saveCar = (car) => {
    fetch('https://carstockrest.herokuapp.com/cars', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(car)
})
    .then(res => fetchData())
    .catch(err => console.error(err))

}

const upDateCar = (car, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(car)
})
    .then(res => fetchData())
    .catch(err => console.error(err)) 
}

const deleteCar = (link) => {
    if(window.confirm('Do you really want to delete the car?')) {
    fetch(link, {method: 'DELETE'})
    .then(res => VerifyDelete())
    .then(res => fetchData())
    
    .catch(err =>console.error(err))
    }
console.log(link)
}



const columns = [
    {
        Header: 'Brand',
        accessor: 'brand'
    },
    {
        Header: 'Model',
        accessor: 'model'
    },
    {
        Header: 'Color',
        accessor: 'color'
    },
    {
        Header: 'Fuel',
        accessor: 'fuel'
    },
    {
        Header: 'Year',
        accessor: 'year'
    },
    {
        Header: 'Price',
        accessor: 'price'
    },
    {
        sortable:false,
        filterable:false,
        width:100,
        Cell: row => <Editcar upDateCar={upDateCar} car={row.original} />
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: row => <Button size='small' color='secondary' 
        onClick={() => deleteCar(row.value)}>
            Delete
            </Button>
    }
]
    return (
    <div >
      <Addcar saveCar={saveCar}/>
      <ReactTable filterable={true} data={cars} columns={columns}/>
      <Snackbar 
      anchorOrigin={{vertical:'top', horizontal:'center'}}
      open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Car deleted succesfully!
        </Alert>
      </Snackbar>
    </div>
    )
}

