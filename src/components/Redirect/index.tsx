import { useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

type IProps = {
  to: string;
};
const Redirect: React.FC<IProps> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);
  return null;
};

export default Redirect;
