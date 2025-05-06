import React from 'react';
import styled from 'styled-components';
import IsOnline from './isOnline';
import { Link } from 'react-router-dom';
import { MdDriveFileRenameOutline } from "react-icons/md";

const Card = styled.div`
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  border-radius: 16px;
  padding: 24px;
  width: 250px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const CardTitle = styled.h2`
  color: #4b0082;
  margin-bottom: 8px;
  text-align: left;
`;

const Cardtitle2 = styled.div`
  color: #6a1b9a;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const Detail = styled.div`
  text-align:left;
  color: #6a1b9a;
`

const ProfileCard = ({ DataId, name, image, title, detail,isOnline }) => {
  return (
    <Link to={`/user/${DataId}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardTitle><IsOnline type={isOnline} />{name}</CardTitle>
        {image && <ProfileImage src={image} alt="" />}
        <Cardtitle2><MdDriveFileRenameOutline />{title}</Cardtitle2>
        <Detail>{detail}</Detail>
      </Card>
    </Link>
  );
};

export default ProfileCard;
