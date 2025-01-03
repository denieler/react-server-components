"use server"

export async function createNoteAction({ postNumber }) {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
    const post = await data.json()
    
    console.log('post:', post)
}