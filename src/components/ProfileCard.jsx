import React from 'react'
import styled from 'styled-components'
import IsOnline from './isOnline'
import { Link } from 'react-router-dom'

const Card = styled.div`
    background: linear-gradient(135deg, #e0bbff, #ffc1cc);
    border-radius: 16px;
    padding: 24px;
    margin: 16px;
`
const CardTitle = styled.h2`
    color: #4b0082;
    margin-bottom: 8px;
`

const CardAge = styled.p`
    color: #6a1b9a;
    font-size: 16px;
    font-weight : bold;
    `


const ProfileCard = ({id,name,age,isOnline}) => {
  return (
    <Link to={`/user/${id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardTitle>{name}</CardTitle>
        <CardAge>나이 : {age}</CardAge>
        <IsOnline type={isOnline} />
      </Card>
    </Link>
  );
};

export default ProfileCard
