import React from 'react';

// temp placeholder of form while cleaning up header dropdown component
const VipLogin = ({ style }) => {
  return (
    <div className="dropdown-menu" style={style}>
      <div>VIP CLUB</div>
      <p>
        Join the VIP Shoppers Club for free access to exclusive VIP offers
        online.
      </p>
      <div>
        <a
          href="https://www.premiumoutlets.com/vip/register"
          className="btn btn-primary"
        >
          JOIN THE VIP SHOPPER CLUB
        </a>
      </div>
      <div>ALREADY A MEMBER?</div>
      <div className="dropdown-item">
        <form className="form-with-header js-floating-labels">
          <div className="form-group">
            <label htmlFor="email" className="floating">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="EMAIL ADDRESS"
              id="email"
              name="email"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="floating">
              PASSWORD
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="PASSWORD"
              id="password"
              name="password"
              maxLength="15"
              autoComplete="off"
            />
          </div>
          <div className="form-group clearfix">
            <div className="checkbox pull-xs-left">
              <label htmlFor="stay-logged-in">
                <input
                  type="checkbox"
                  id="stay-logged-in"
                  name="stayloggedin"
                  value="false"
                  data-parsley-multiple="stayloggedin"
                />
                <span className="c-indicator" />
                Stay Logged In
              </label>
            </div>
            <a
              className="pull-xs-right forgot-password"
              href="https://www.premiumoutlets.com/vip/forgot-password"
            >
              <small>Forgot Password?</small>
            </a>
          </div>
          <input
            type="submit"
            id="submit"
            name="submit"
            value="LOGIN"
            className="btn btn-primary"
          />
        </form>
      </div>
    </div>
  );
};

export default VipLogin;
