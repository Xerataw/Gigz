import { useEffect } from 'react';
import './animation.css';

interface IFadeProps {
  children?: any;
  isVisible: boolean;
  afterHide: () => void;
}

const Fade: React.FC<IFadeProps> = ({ children, isVisible, afterHide }) => {
  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        afterHide();
      }, 200);
    }
  }, [isVisible]);

  return (
    <div className={'fade ' + (isVisible ? 'gigz-hidden ' : 'gigz-visible ')}>
      {children}
    </div>
  );
};

export default Fade;
