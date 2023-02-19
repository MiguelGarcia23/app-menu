import React from 'react';

import '../../styles/menuCard.css';



const MenuCard = ({ title, price, description }) => {
    return (
        <>
            <div>
                <h4>{title}</h4>
                <p>{price}</p>
            </div>
            <div>
                <p>{description}</p>
            </div>
        </>
    )
}

export default MenuCard;