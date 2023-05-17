export const passwordReset = (username, url) => {
  return `<div>
  <h1 style="color:blue;">NATURE_BEAUTY - LẤY LẠI MẬT KHẨU</h1>
  <h3>Thân gửi <b>${username}</b></h3>
  <p>
    Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn tại website comem.vn. Nếu bạn không yêu cầu, vui lòng bỏ qua
    email
    này.
    Để đặt lại mật khẩu, click ngay hoặc copy đường link này vào trình duyệt của bạn và làm theo hướng dẫn:
    ${url}
    ">Link đường dẫn</a>
    Nature Beauty luôn sẵn sàng để hỗ trợ khách hàng kịp thời, dịch vụ CSKH của chúng tôi hoạt động từ 9h đến 17h30 hằng ngày
    kể cả
    cuối tuần. Vui lòng liên hệ để được giải đáp mọi thắc mắc của bạn!
  </p>
</div>`;
};
export const createAccount = (username, email, password, url) => {
  return `<div>
  <h1>NATURE_BEAUTY - Thông tin tài khoản đăng nhập hệ thông</h1>
  <h3>Thân gửi <b>${username}</b></h3>
  <p>Thông tin đăng nhập: </p>
  <p>Email : ${email}</p>
  <p>Email : ${password}</p>
  <p>
    Để đăng nhập vào hệ thống, click ngay hoặc copy đường link này vào trình duyệt của bạn và làm theo hướng dẫn:
    ${url}
    ">Link đường dẫn</a>
    Nature Beauty luôn sẵn sàng để hỗ trợ khách hàng kịp thời, dịch vụ CSKH của chúng tôi hoạt động từ 9h đến 17h30 hằng ngày
    kể cả
    cuối tuần. Vui lòng liên hệ để được giải đáp mọi thắc mắc của bạn!
  </p>
</div>`;
};
