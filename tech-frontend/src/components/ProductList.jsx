import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

export default function () {
    const [products, setProducts] = useState([]);
    const [isProductsChanged, setIsProductsChanged] = useState(false);

    const [id, setId] = useState(null);
    const [name, setName] = useState();
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        setId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        fetch("http://localhost:8080/product/get-all")
        .then(re=>re.json())
        .then((res)=>{
            setProducts(res);
        });
        setIsProductsChanged(false);
    },[isProductsChanged]);
    
    function createUpdatedProduct(name, brand, category, description) {
        let updatedProduct = {};
    
        if (name !== null && name !== undefined) {
            updatedProduct.name = name;
        }
        if (brand !== null && brand !== undefined) {
            updatedProduct.brand = brand;
        }
        if (category !== null && category !== undefined) {
            updatedProduct.category = category;
        }
        if (description !== null && description !== undefined) {
            updatedProduct.description = description;
        }
        
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = String(`${year}-${month}-${day}`);
        setDate(formattedDate);

        updatedProduct.createdAt = formattedDate;

        return updatedProduct;
    }

    const handleEdit = ()=>{
        const updatedProduct = createUpdatedProduct(name, brand, category, description);
        console.log("updated product val: ",updatedProduct)

        const url = `http://localhost:8080/product/update-one/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setIsProductsChanged(true);
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleDelete = (id)=>{
        const url = `http://localhost:8080/product/delete-one/${id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
              }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setIsProductsChanged(true);
    }

    return (
        <div>
            <ol>
                <li className='my-7 flex font-bold text-xl'>
                    <h2 className='flex-1'>ID</h2>
                    <h2 className='flex-1'>Name</h2>
                    <h2 className='flex-1'>Brand</h2>
                    <h2 className='flex-1'>Category</h2>
                    <h2 className='flex-1'>Created At</h2>
                    <h2 className='flex-1'>Actions</h2>
                </li>
                {products.map(product=>(
                    <li className='flex my-3 font-normal text-lg' key={product.id}>
                        <h3 className='flex-1'>{product.id}</h3>
                        <h3 className='flex-1'>{product.name}</h3>
                        <h3 className='flex-1'>{product.brand}</h3>
                        <h3 className='flex-1'>{product.category}</h3>
                        <h3 className='flex-1'>{product.createdAt}</h3>
                        <div className='flex-1 space-x-4'>
                            <button onClick={()=>handleClickOpen(product.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button onClick={()=>handleDelete(product.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
                <li></li>
            </ol>

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
            <DialogTitle sx={{ textAlign: 'center' }}>Edit details of Product ID:{id}</DialogTitle>
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
            <Button onClick={handleEdit} type="submit" >Submit</Button>
            </DialogActions>
        </Dialog>

        </div>
    )
}
