import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createClient, PhotosWithTotalResults } from 'pexels';
import { prototype } from 'events';

type Props = {
  name:string,
  abbreviation:string,
  description:string,
  bonus:string,
  color:string,
}




const BiomeCard = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getImage = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: props.name + " biome", color: props.color})
    };
    const imageUrl = await fetch('http://localhost:8080/images', requestOptions)
        .then(response => response.json());

      setImageUrl(imageUrl.result);
    }
    getImage();

  }, [props])


  return (
    <Card sx={{ maxWidth: 345 }} style={{backgroundColor: props.color, margin: 50}}>
      <CardMedia
        component="img"
        height="420"
        image={imageUrl}
        alt={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name.toUpperCase()} BIOME
        </Typography>

        <Typography variant="body2" color="text.secondary">
        {props.abbreviation.toUpperCase()}: ({props.description})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.bonus}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BiomeCard;