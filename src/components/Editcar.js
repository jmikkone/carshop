import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';

export default function Editcar (props) {
const [open, setOpen] = React.useState(false);

const [car, setCar] = React.useState({brand: '', model: '', color: '', fuel: '',
year: '', price: ''})

const handleClickOpen = () => {
    console.log(props.car)
    setCar({brand: props.car.brand, model: props.car.model, color: props.car.color,
    fuel: props.car.fuel, year: props.car.year, price: props.car.price})
   
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (e) => {
    setCar({...car, [e.target.name]:e.target.value})
};

const upDateCar = () => {
    props.upDateCar(car, props.car._links.car.href);
    handleClose();
};

  return (
    <div>
      <Button startIcon={<CreateIcon />} size="small" 
      color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name='brand'
            value={car.brand}
            label="Brand"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='model'
            value={car.model}
            label="Model"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='color'
            value={car.color}
            label="Color"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='fuel'
            value={car.fuel}
            label="Fuel"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='year'
            value={car.year}
            label="Year"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='price'
            value={car.price}
            label="Price"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  color="primary">
            Cancel
          </Button>
          <Button onClick={upDateCar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}