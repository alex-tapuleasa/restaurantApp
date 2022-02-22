import React from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { withStyles } from "@mui/styles";

const styles = {
main: {
    margin: '7% auto',
    padding: '2px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(6, 122, 184)',
    borderRadius: 3,
    backgroundColor: 'white',
    boxShadow: '5px 5px 20px -4px #EACDF2'
  },
sloganText: {
    padding: '30px',
    color: '3C4257',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '30px'

  }}

const validationSchema = yup.object({
    title: yup
      .string('Enter Hotel Name')
      .required('Name is required'),
    location: yup
      .string('Enter location')
      .required('Location is required'),
    description: yup
    .string('Enter description')
    .min(20, 'Description shold be of minimum 20 characters length')
    .required('Description is required'),
    price: yup
    .number('Enter price')
    .min(0, 'Price should be greater than 0')
    .required('Price is required')


  });


function EditHotelForm(props) {
    // const [value, handleChange]= useInputState(props);
    let navigate = useNavigate();

const {title, location, description, price, id, classes} = props;

    const editHotel = (values) => {
        const {id} = values;
        axios.put(`http://localhost:5000/hotels/${id}/edit`, { title: values.title, location: values.location, description: values.description, price: values.price})
        .then(()=> {
            alert('It worked')})
        .catch(()=> {
            alert('Error!!!')})
            navigate('/hotels')
    };

    const formik = useFormik({
        initialValues: {title: title, location: location, description: description, price: price, id: id},
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit: editHotel
    });
    
    return(
            <Box component='form'
            noValidate
            onSubmit={formik.handleSubmit}
            className={classes.main}>
                <Typography className={classes.sloganText}>Update Your Property!</Typography>
                <TextField sx={{mt: 3, width: '95%'}}
                    label='Change Hotel Name' 
                    name='title'              
                    value={formik.values.title} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField sx={{mt:3, width: '95%'}}
                    label='Change Location' 
                    name='location' 
                    value={formik.values.location} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                />
                <TextField sx={{mt:3, width:'95%'}}
                    label='Edit Description'  
                    multiline 
                    name='description' 
                    fullWidth
                    value={formik.values.description} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField sx={{mt:3}}
                    label='Change Price'  
                    name='price' 
                    value={formik.values.price} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            <Button sx={{mt:5, mb: 5, width:'90%'}} variant='contained' type='submit'>Update!</Button>
            </Box>
            
    )
}

export default withStyles(styles)(EditHotelForm);

