import Button from './Button.jsx'
import { createNoteAction } from './func.js'

const Component = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const post = await data.json()

    console.log('post:', post)

    return (
        <>
            <div>Component</div>
            <Button handleClick={createNoteAction}>Button</Button>
        </>
    )
}

export default Component
