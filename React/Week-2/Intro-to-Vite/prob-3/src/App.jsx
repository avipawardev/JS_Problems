import React from 'react'
import ProfileCard from './components/ProfileCard';

const App = () => {
  return (
    <div style={{display:'flex',gap:"10px",flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
      <ProfileCard name={"Awin Pawar"} age={24} bio={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque mollitia magni maxime dolores ad ratione veritatis inventore asperiores suscipit tenetur!'}/>
      <ProfileCard name={"Punam Prajapati"} age={24} bio={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque mollitia magni maxime dolores ad ratione veritatis inventore asperiores suscipit tenetur!'}/>
      <ProfileCard name={"Pravansh Patel"} age={24} bio={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque mollitia magni maxime dolores ad ratione veritatis inventore asperiores suscipit tenetur!'}/>
      <ProfileCard name={"Akash Pawar"} age={24} bio={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque mollitia magni maxime dolores ad ratione veritatis inventore asperiores suscipit tenetur!'}/>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      
    </div>
  )
}

export default App;