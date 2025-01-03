'use client'

const Button = ({ handleClick }) => {
    return (
        <button onClick={e => handleClick({ postNumber: 4 })}>Button</button>
    )
}

export default Button
