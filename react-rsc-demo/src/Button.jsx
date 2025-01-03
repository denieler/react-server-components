'use client'

const Button = () => {
    const handleClick = () => {
        console.log('click')
    }

    return (
        <button onClick={handleClick}>Button</button>
    )
}

export default Button
