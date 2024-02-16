import React from 'react'

export default function Board(seq, title, writer, content) {
    return (
        <div>
            <h2>{seq}</h2>
            <h2>{title}</h2>
            <h5>{writer}</h5>
            <hr />
            <p>{content}</p>
        </div>
    )
}
