import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div>
        <Spinner animation="border" />
        <p>Loading...</p>
    </div>
  )
}

export default Loading;