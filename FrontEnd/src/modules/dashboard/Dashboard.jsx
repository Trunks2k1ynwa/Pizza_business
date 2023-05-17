import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const account = useSelector((value) => value.account.account);
  useEffect(() => {
    if (isEmpty(account)) {
      navigate('/page404');
    }
  }, [account, navigate]);
  return <div>Dashboard</div>;
};

export default Dashboard;
