import React from 'react';
import './App.css';
import cards from './cards.json';
import { Suspense, lazy } from 'react';
import FactorCard from './components/FactorCard';
import { Grid } from '@mui/material';
import SpecieCard from './components/SpecieCard';

const BiomeCard = lazy(() => import('./components/BiomeCard'));

function App() {
  console.log(`process.env: ${JSON.stringify(process.env, null, 2)}`);


  const biomeList = cards.biomes;
  const biomeCardList = biomeList.map((biome, index) =>
  <Grid item xs={3}><BiomeCard key={index} {...biome}/></Grid>
  );

  const specieList = cards.species;
  const specieCardList = specieList.map((specie, index) =>
  <Grid item xs={3}><SpecieCard key={index} {...specie}/></Grid>
  );

  const {biotic: bioticList, aboitic: abioticList} = cards.factors;
  const bioticCardList = bioticList.map((factor, index) =>{
    const props = {...factor, type: 'biotic'};
    return (<Grid item xs={3}>
    <FactorCard key={index} {...props}/>
  </Grid>
)}
  );

  const abioticCardList = abioticList.map((factor, index) =>{
    const props = {...factor, type: 'abiotic'};
    return (<Grid item xs={3}>
    <FactorCard key={index} {...props}/>
  </Grid>
)}
  );
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <Grid container spacing={2}>
        {biomeCardList}
        {bioticCardList}
        {abioticCardList}
        {specieCardList}
        </Grid>
      </Suspense>
    </div>
  );
}

export default App;
