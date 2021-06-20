import React from 'react'
import './form-input.styles.scss'


const FormInput = ({handleChange,label,...otherProps}) =>(
    <div class='group'>
        <input onChange={handleChange} className='form-input'
                {...otherProps}/>
        {
            label ?  
            (<label className={`${otherProps.value.length ? 'shrink': ''} form-input-label`}>
                    {label}
            </label>)
            : null
        }
    </div>
)

export default FormInput;