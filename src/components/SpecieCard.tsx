import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createClient, PhotosWithTotalResults } from 'pexels';
import { prototype } from 'events';
import cards from '../cards.json';
import { Avatar, CardHeader, Grid } from '@mui/material';

const biomeToColor = (biome: string) => {
  console.log(`[biomeToColor] biome: ${biome}`);
  try {
    return cards.biomes.filter(({abbreviation})=> abbreviation === biome.toUpperCase())[0].color
  }
  catch(err) {
    return "white";
  }
}

type Props = {
  name:string,
  class:string,
  points:number,
  biomes:string[],
  eats:string[],
  eatenBy:string[],
}




const SpeicieCard = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const color1 = biomeToColor(props.biomes[0])
  const color2 = biomeToColor(props.biomes[1])


  useEffect(() => {
    const getImage = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: props.name, color: color1})
    };
    const imageUrl = await fetch('http://localhost:8080/images', requestOptions)
        .then(response => response.json());

      setImageUrl(imageUrl.result);
    }
    getImage();

  }, [props.name])


  return (
    <Card sx={{ maxWidth: 345 }} style={{background: `linear-gradient(60deg,  ${color1} 50%,${color2} 50%)`, margin: 50}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "burlywood" }} aria-label="class">
            {props.class}
          </Avatar>
        }
        title={(
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{background:"white"}}>
          <Grid item xs={9}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name.toUpperCase()}
          </Typography>
          </Grid>
          <Grid item xs={3}>
          <Typography gutterBottom variant="h5" component="div">
            {props.points}
          </Typography>
          </Grid >
          </Grid>
          )}
      />
      <CardMedia
        component="img"
        height="365"
        image={imageUrl}
        alt={props.name}
      />
      <CardContent>
      <Typography variant="h6" color="text.secondary">
          {props.biomes.join(', ').toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Eats:</b> {props.eats.join(', ')}
        </Typography>
        <hr/>
        <Typography variant="body2" color="text.secondary">
          <b>Eaten by:</b> {props.eatenBy.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SpeicieCard;