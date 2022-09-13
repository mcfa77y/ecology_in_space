import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createClient, PhotosWithTotalResults } from 'pexels';
import { prototype } from 'events';
import { CardHeader, Grid } from '@mui/material';

type Props = {
  type:string,
  description:string,
  effect:string,
}




const FactorCard = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  let color = "white";
  if (props.type.toLowerCase() === "abiotic"){
    color = "gray"
  }
  if (props.type.toLowerCase() === "biotic"){
    color = "burlywood"
  }
  useEffect(() => {
    const getImage = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: props.description, color: color})
    };
    const imageUrl = await fetch('http://localhost:8080/images', requestOptions)
        .then(response => response.json());

      setImageUrl(imageUrl.result);
    }
    getImage();

  }, [props.description])


  return (
    <Card sx={{ maxWidth: 345 }} style={{backgroundColor: color, margin: 50}}>
      <CardHeader
        title={(
          <Grid container style={{background:"white"}}>
          <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            {props.type.toUpperCase()}
          </Typography>
          </Grid>

          </Grid>
          )}
      />
      <CardMedia
        component="img"
        height="345"
        image={imageUrl}
        alt={props.type}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.description.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({props.description})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({props.effect})
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FactorCard;