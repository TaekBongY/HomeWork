import React from 'react'


const IsOnline = ({type}) => {
    if(type === 'online') {
        return (
            <>🟢</>
        )
    }
    if(type === 'offline') {
        return (
            <>🔴</>
        )
    }
    return (
        <>⚪</>
    )


}

export default IsOnline
