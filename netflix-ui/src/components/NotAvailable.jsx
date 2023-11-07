import React from 'react'

export default function NotAvailable({type}) {
  return (
    <h1 className='not-available'>No {type} available for selected genres</h1>
  );
}
