
import React from 'react'

const Rating = (props) => {
  const style = {
    color: props.color
  }
    
  return (
    <div className='rating'> 
    <span>
<i style={style} className={props.value >=1 ? 'fas fa-star' : props.value>= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}> </i> 
<span>
<i style={style}  className={props.value >=2 ? 'fas fa-star' : props.value>= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}> </i> 
    </span>
    <span>
<i style={style} className={props.value >=3 ? 'fas fa-star' : props.value>= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}> </i> 
    </span>
    <span>
<i style={style}  className={props.value >=4 ? 'fas fa-star' : props.value>= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}> </i> 
    </span>
    <span>
<i style={style}  className={props.value >=5 ? 'fas fa-star' : props.value>= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}> </i> 
    </span>
    </span>
    <span> {props.text && props.text}</span>
    </div>
  )
}

Rating.defaultProps = {
    color: '#f8e825'
}

export default Rating;