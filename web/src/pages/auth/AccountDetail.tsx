import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import {
  getCurrentUser,
  getCustomerInfo,
  updateUserProfile,
  updateCustomerProfile,
} from "../../services/authService";

interface UserForm {
  username: string;
  email: string;
  balance: number;
}

interface CustomerForm {
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  cic: string;
}

const AccountDetail: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [userForm, setUserForm] = useState<UserForm>({
    username: "",
    email: "",
    balance: 0,
  });

  const [customerForm, setCustomerForm] = useState<CustomerForm>({
    firstname: "",
    lastname: "",
    gender: "",
    birthday: "",
    city: "",
    country: "",
    address: "",
    phone: "",
    cic: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerData, setCustomerData] = useState<any | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      loadUserData();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadUserData = async () => {
    if (!user?.Id) return;

    try {
      setLoading(true);
      // Load user details
      const userData = await getCurrentUser(user.Id);
      setUserForm({
        username: userData.Username || "",
        email: userData.Email || "",
        balance: userData.Balance || 0,
      });

      // Try to load customer info
      try {
        setCustomerLoading(true);
        const customerData = await getCustomerInfo();
        setCustomerData(customerData);
        setCustomerForm({
          firstname: customerData.Firstname || "",
          lastname: customerData.Lastname || "",
          gender: customerData.Gender || "",
          birthday: customerData.Birthday
            ? new Date(customerData.Birthday).toISOString().split("T")[0]
            : "",
          city: customerData.City || "",
          country: customerData.Country || "",
          address: customerData.Address || "",
          phone: customerData.Phone || "",
          cic: customerData.CIC || "",
        });
      } catch (_err) {
        // If customer info fails, just continue with empty customer form
        console.log("No customer info found");
      } finally {
        setCustomerLoading(false);
      }
    } catch (err: any) {
      setError("Failed to load account details");
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: name === "balance" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCustomerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      await updateUserProfile(user.Id, {
        username: userForm.username,
        email: userForm.email,
      });
      setSuccess("Account updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      let msg = "Failed to update account";
      if (err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed?.message) msg = parsed.message;
          else if (typeof parsed === "string") msg = parsed;
        } catch (_e) {
          msg = err.message;
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!customerData?.CustomerId) {
      setError("Customer information not found");
      return;
    }

    try {
      setCustomerLoading(true);
      await updateCustomerProfile(customerData.CustomerId, {
        firstname: customerForm.firstname,
        lastname: customerForm.lastname,
        gender: customerForm.gender,
        birthday: customerForm.birthday,
        city: customerForm.city,
        country: customerForm.country,
        address: customerForm.address,
        phone: customerForm.phone,
        cic: customerForm.cic,
      });
      setSuccess("Personal information updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      let msg = "Failed to update personal information";
      if (err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed?.message) msg = parsed.message;
          else if (typeof parsed === "string") msg = parsed;
        } catch (_e) {
          msg = err.message;
        }
      }
      setError(msg);
    } finally {
      setCustomerLoading(false);
    }
  };

  if (isLoading || loading) {
    return (
      <main className="account-detail">
        <div className="loading">Loading...</div>
      </main>
    );
  }

  return (
    <main className="account-detail">
      <div className="account-detail__header">
        <h1>Thông tin tài khoản</h1>
        <p>Quản lý thông tin cá nhân và tài khoản của bạn</p>
      </div>

      {error && (
        <div className="account-detail__alert alert-error">{error}</div>
      )}
      {success && (
        <div className="account-detail__alert alert-success">{success}</div>
      )}

      <div className="account-detail__container">
        {/* Account Section */}
        <section className="account-detail__section">
          <h2>Thông tin tài khoản</h2>
          <form onSubmit={handleUserSubmit}>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                name="username"
                value={userForm.username}
                onChange={handleUserChange}
                disabled
                className="form-control"
              />
              <small>Tên đăng nhập không thể thay đổi</small>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userForm.email}
                onChange={handleUserChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Số dư tài khoản</label>
              <input
                type="number"
                name="balance"
                value={userForm.balance}
                disabled
                className="form-control"
                step="0.01"
              />
              <small>Số dư được quản lý tự động</small>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={customerLoading}
            >
              Cập nhật tài khoản
            </button>
          </form>
        </section>

        {/* Personal Information Section */}
        <section className="account-detail__section">
          <h2>Thông tin cá nhân</h2>
          {customerLoading ? (
            <p>Loading customer information...</p>
          ) : (
            <form onSubmit={handleCustomerSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ</label>
                  <input
                    type="text"
                    name="lastname"
                    value={customerForm.lastname}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="firstname"
                    value={customerForm.firstname}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giới tính</label>
                  <select
                    name="gender"
                    value={customerForm.gender}
                    onChange={handleCustomerChange}
                    className="form-control"
                  >
                    <option value="">Chọn</option>
                    <option value="M">Nam</option>
                    <option value="F">Nữ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    name="birthday"
                    value={customerForm.birthday}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Thành phố</label>
                  <input
                    type="text"
                    name="city"
                    value={customerForm.city}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Quốc gia</label>
                  <input
                    type="text"
                    name="country"
                    value={customerForm.country}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={customerForm.address}
                  onChange={handleCustomerChange}
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerForm.phone}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>CMND/CCCD</label>
                  <input
                    type="text"
                    name="cic"
                    value={customerForm.cic}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Cập nhật thông tin cá nhân
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default AccountDetail;
