
import './successMessage.css';
import Lottie from 'lottie-react';
import animationData  from '../../image/Animation.json'

const SuccessMessage = ({ message }) => {
  return (
    <div className="SuccessMessage">
      < span><Lottie animationData={animationData}/></span>
      <span>{message}</span>
      
    </div>
  );
};

export default SuccessMessage;
