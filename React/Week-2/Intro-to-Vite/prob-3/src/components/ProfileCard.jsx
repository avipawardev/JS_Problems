import React from 'react'

const ProfileCard = ({
  name = 'Default Name',
  age = 'Default Age',
  bio = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque mollitia magni maxime dolores ad ratione veritatis inventore asperiores suscipit tenetur!'
}) => {
    // const truncatedBio = ;
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'}}>
        <h4>Name: {name}</h4>
        <p>Age: {age}</p>
        <p>Bio: {bio.length > 100 ? bio.slice(0, 100) + '... Read More' : bio}</p>
    </div>
  )
}

export default ProfileCard