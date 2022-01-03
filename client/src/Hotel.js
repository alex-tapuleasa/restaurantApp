import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




function Hotel (props) {

    const {title, location, description, id, price} = props;

    return(
        <div>
             <Card  variant='outlined' sx={{ maxWidth: 400, mt: 3}}>
            <li key={id}>
                <CardMedia
                    component="img"
                    alt="generic hotel"
                    height="140"
                    image="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                />
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h4">{title}</Typography>
                        <Typography variant="h7" color="primary">{location}</Typography>
                    </div>
                    <hr></hr>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardContent>
                <CardActions>
        <Button href={`/hotels/${id}`} size="small">Details</Button>
      </CardActions>
            </li></Card>
        </div>
    )
}

export default Hotel;