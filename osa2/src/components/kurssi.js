import React from 'react'

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi.nimi} />
            <Sisalto osat={props.kurssi.osat} />
            <Yhteensa osat={props.kurssi.osat} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
      )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.osat.reduce((acc, osa) => acc + osa.tehtavia, 0)} tehtävää</p>
    )
}

export default Kurssi