import React from 'react';

import ShockGauge from './CharacterSheet/ShockGauge'

export default class CharacterSheet extends React.Component {
  constructor() {
    super();
  }

  render() {
    const c = this.props.character
    const madness = c.bio.madness.map((m) => {
      return <li>{m.type + ' from ' + m.origin}</li>
    })
    const gauges = Object.keys(c.gauges).map((g) => {
      return <ShockGauge gauge={g} notches={c.gauges[g]}></ShockGauge>
    });
    console.log(c);
    const abilities = Object.keys(c.abilities).map((a) => {
      return <p>{a}: {c.abilities[a]}</p>
    });
    return (
      <div>
        <h1>{c.bio.firstName + ' ' + (c.bio.middleName ? c.bio.middleName + ' ' : null) + c.bio.lastName}</h1>
        <p>Cabal: {c.bio.cabal}</p>
        <p>Objective: {c.bio.objective}</p>
        <p>Characteristics: {c.bio.characteristics}</p>
        <p>Obsession: {c.bio.obsession}</p>
        <p>Fear Passion: {c.bio.passions.fear}</p>
        <p>Rage Passion: {c.bio.passions.rage}</p>
        <p>Noble Passion: {c.bio.passions.noble}</p>
        <ul>{madness}</ul>
        {gauges}
        {abilities}
      </div>
    );
  }
}
