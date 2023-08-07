
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Card from "./App";

function CardsList({colors, count}) {
    const [scope, setScope] = useState(0);
    const [stateColor, setOpenColor] = useState('');

    function addScope() {
        setScope(currScope => scope + 1);
    }

    let className = "cardsList";

    return (
        <>
            <p>{scope}</p>
            <div className={className}>
                {colors.map((value, index) =>
                    <Card key={index} color={value} scope={scope} stateColor={stateColor} />
                )}
            </div>
        </>
    )
}

CardsList.propType = {colors: PropTypes.array, count: PropTypes.number}

export default CardsList;
