import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

function MyToast({message, showToast, setShowToast}) {

  return (
    <Toast onClose={() => setShowToast(false)} show={showToast} autohide style={{ position: 'fixed', top: '20px', right: '20px' }}>
        <Toast.Header/>
        <Toast.Body>
            <div>
            <big>{message}</big>
            </div>
        </Toast.Body>
    </Toast>
  );
}

export default MyToast;