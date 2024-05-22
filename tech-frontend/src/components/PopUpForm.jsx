import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BoltRounded, Category, Description } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

export default function PopUpForm() {
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = ()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = String(`${year}-${month}-${day}`);
    setDate(formattedDate);
    
    const product = {"name": name, "brand": brand, "category": category, "description": description, "createdAt": date};
    fetch("http://localhost:8080/product/create-one", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(product)
    }).then(response => {
        if (response.ok) {
          console.log("Product created successfully!");
        } else {
          console.error("Failed to create product");
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
  }
  
  return (
    <React.Fragment>
      <Button variant="outlined" sx={{ marginTop: 5,  fontSize: 18, fontWeight : 700}} onClick={handleClickOpen}>
        ADD A PRODUCT
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Enter new product details</DialogTitle>
        <DialogContent sx={{ marginBottom: 2, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth value={name} onChange={(e)=>setName(e.target.value)} label="Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={brand} onChange={(e)=>setBrand(e.target.value)} label="Brand" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={category} onChange={(e)=>setCategory(e.target.value)} label="Category" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={description} onChange={(e)=>setDescription(e.target.value)} label="Description" variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit" >Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
