import React from 'react'
import { useNavigate } from 'react-router-dom';

import './category-item.styles.scss'


 const CategoryItem = ({category}) => {
    
    const {title,id,imageUrl} = category;
    const navigate  = useNavigate()

    return (
      <div
        key={id}
        className="category-container"
        onClick={() => navigate("shop/" + title)}
      >
        <div
          className="background-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="category-body-container">
          <h1>{title}</h1>
          <p>Show Now</p>
        </div>
      </div>
    );
};
export default CategoryItem