import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      document.querySelector('body').scrollTo(0, 0);

      return () => {
        unlisten();
      };
    });
  }, []);

  return null;
};

export default ScrollToTop;
