import GridLoader from 'react-bootstrap/Spinner'

const LoadingScreen = () => (
    <div className="container-sm" style={{ textAlign: 'center'}}>
        <GridLoader role="status" animation="border"/>
    </div>
)

export default LoadingScreen