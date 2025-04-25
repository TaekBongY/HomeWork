import React from 'react'
import styled from 'styled-components'

const IsOnline = ({type}) => {
    if(type === 'online') {
        return (
            <div style={{color: '#66bb6a',fontWeight: 'bold'}}>🟢 온라인 상태입니다.</div>
        )
    }
    if(type === 'offline') {
        return (
            <div style={{color: '#ef5350',fontWeight: 'bold'}}>🔴 오프라인 상태입니다.</div>
        )
    }
    return (
        <div style={{color: '#9e9e9e',fontWeight: 'bold'}}>⚪ 상태를 알 수 없습니다.</div>
    )


}

export default IsOnline
