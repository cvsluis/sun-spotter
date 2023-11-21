import React from 'react';

export default function SunsetTimeCard({ hour, minute }) {
  //console.log('the sunset time is ', hour, minute)
  return (
    <div className="sunset-time-card">
      (sunset logo) {hour}:{minute}
    </div>
  )
}