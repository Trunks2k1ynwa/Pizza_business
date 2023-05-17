import { memo, useCallback, useEffect } from 'react';
import Button from '../../components/atoms/Button.jsx';
import InputSearch from '../../components/molecules/InputSearch.jsx';
import IconEye from '../../components/atoms/IconEye.jsx';
import UpdateIcon from '../../components/atoms/UpdateIcon.jsx';
import DeleteIcon from '../../components/atoms/DeleteIcon.jsx';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../../components/atoms/Tag.jsx';
import http from '../../services/http.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setAccounts } from '../../../redux/slices/accountSlice.jsx';
import BadRequest from '../../components/template/BadRequest.jsx';

const AccountManagement = () => {
  const dispatch = useDispatch();
  const accountList = useSelector((value) => value.account.accounts);
  const account = useSelector((value) => value.account.account);
  useEffect(() => {
    const getData = async () => {
      const response = await http.get('accounts');
      const accountList = response.data.data;
      dispatch(setAccounts(accountList));
    };
    if (account.role == 'admin') {
      getData();
    }
  }, [dispatch, accountList.length, account.role]);

  const handleDeleteProduct = useCallback(
    async (accountId) => {
      Swal.fire({
        title: 'Xác nhận yêu cầu xóa',
        text: 'Bạn không thể khôi phục lại dữ liệu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý xóa',
        cancelButtonText: 'Thoát',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Xóa hoàn tất!',
            'Dữ liệu tài khoản đã bị xóa khỏi hệ thống',
            'success',
          );
          if (account._id === accountId) {
            Swal.fire({
              title: 'Dữ liệu thất bại!',
              text: 'Tài khoản đang đăng nhập',
            });
          } else {
            await http.delete(`accounts/${accountId}`);
            const data = accountList.filter((item) => item.id !== accountId);
            dispatch(setAccounts(data));
          }
        }
      });
    },
    [account._id, accountList, dispatch],
  );
  if (account.role !== 'admin') return <BadRequest />;
  return (
    <div className='bg-white rounded-2xl shadow-lg py-10 w-full'>
      <div className='p-10 pt-0 center-cross justify-between'>
        <h3 className='font-bold text-primary'>List Account</h3>
        <div className='flex gap-x-10'>
          <Button to='/manage/add-account'>
            <i className='fa-solid fa-plus pr-4' />
            Thêm mới
          </Button>
          <InputSearch className='w-[10rem]' />
          <select
            className='bg-graySemi text-xl font-semibold px-4 py-3 rounded-lg border-primary border'
            name='filter'
            id='filer-product'
          >
            <option value='name'>Tên sản phẩm</option>
            <option value='price'>Giá sản phẩm</option>
            <option value='category'>Thể loại</option>
          </select>
        </div>
      </div>
      <div className='center-both'>
        <table className='text-2xl text-left overflow-hidden block overflow-x-auto border-collapse border-spacing-6 hover:border-collapse pb-8 whitespace-nowrap'>
          <thead className='bg-graySemi border'>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accountList.map((account) => (
              <tr
                className='transition-all hover:bg-semi hover:text-primary cursor-pointer border'
                key={uuidv4()}
              >
                <td>{account?._id}</td>
                <td>
                  <img
                    className='w-14 h-14 object-cover rounded-full border border-primary'
                    src={account?.photo?.url}
                    alt=''
                  />
                </td>
                <td>{account?.username}</td>
                <td>{account?.email}</td>
                <td>{account?.role}</td>
                <td>
                  <Tag type={account.status}>{account.status}</Tag>
                </td>

                <td>
                  <IconEye to={`/account/${account?._id}`} />
                  <UpdateIcon to={`/manage/update-account/${account?._id}`} />
                  <DeleteIcon
                    onClick={() => handleDeleteProduct(account?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-center mt-10'>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};

export default memo(AccountManagement);
