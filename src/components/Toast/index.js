import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


function MyToast({message, showToast, setShowToast}) {

  return (
    <ToastContainer containerPosition="fixed" className="p-3" position='top-end'>
        <Toast bg="primary" onClose={() => setShowToast(false)} show={showToast} autohide>
            {/* <Toast.Header/> */}
            <Toast.Body className='text-white'>
                <div>
                    <big>{message}</big>
                </div>
            </Toast.Body>
        </Toast>
    </ToastContainer>
  );
}

export default MyToast;