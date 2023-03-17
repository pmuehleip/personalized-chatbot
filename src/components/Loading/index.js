import Spinner from 'react-bootstrap/Spinner';
import './style.css';

function Loading() {
  return (
    <div className="loading-container">
        <Spinner animation="border" />
        <p>Loading...</p>
    </div>
  )
}

export default Loading;