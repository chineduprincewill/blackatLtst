import React from 'react'

export const generateProfileIcon = (username: string ) => {
    const words = username.split(' ');
        
    // Map over the array to get the first letter of each word
    const firstLetters = words.map(word => word.charAt(0).toUpperCase());
    
    // Join the first letters into a string and return it
    return firstLetters.join('').toUpperCase();
}

function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (which is FFFFFF in hex)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Ensure the result is always 6 digits (with leading zeros if necessary)
    return '#' + randomColor.padStart(6, '0');
}

const ProfileIcon = ({
    usrname,
    css
}:{
    usrname : string
    css : string
}) => {
  return (
    <div className={`flex max-w-max justify-center items-center border border-gray-400 rounded-full ${css}`} style={{ backgroundColor : getRandomHexColor() }}>
        {generateProfileIcon((usrname))}
    </div>
  )
}

export default ProfileIcon