import React from "react";
import KPI from "../components/KPI/KPI"
import './page.css'
import API from "../utils/API";
import {Treemap, ResponsiveContainer} from 'recharts';

class DashboardPage extends React.Component {
  state={
    promotionsData:[],
    usersData:[],
    redemptionsData:[]
  };

  getPromotions = () => {
    API.getPromotions()
      .then(res => {
        let promotionsData = [];
        res.data.forEach(promo => {
          promotionsData.push({
            PromotionText: promo.PromotionText,
            BeaconTag: promo.BeaconTag,
            PreferenceGroup: promo.PreferenceGroup,
            ExpirationDate: promo.ExpirationDate
          })
        });
        console.log("promotionsData", promotionsData);
        this.setState({
          promotionsData
        })
      })
  };

  getUsers = () => {
    API.getUsers()
      .then(res => {
        let usersData = [];
        res.data.forEach(user => {
          usersData.push({
            Username: user.Username
          })
        });
        console.log("usersData", usersData);
        this.setState({
          usersData
        })
      })
  };

  getRedemptions = () => {
    API.getRedemptions()
      .then(res => {
        let redemptionsData = [];
        res.data.forEach(redemption => {
          redemptionsData.push({
            id: redemption._id
          })
        });
        console.log("redemptions", redemptionsData);
        this.setState({
          redemptionsData
        })
      })
  };



  componentDidMount() {
    this.getPromotions();
    this.getUsers();
    this.getRedemptions();
  }


  render() {
    return(
      <div className="mainContainer">
        <div className="wide-container">

          <div className="row">
            <div className="dashboard-kpiContainer">
              <KPI
                cardBackgroundColor={"white"}
                cardTextcolor={"blue-grey-text text-darken-4"}
                title={"Total Promotions"}
                kpi={this.state.promotionsData.length}
                kpiColor={"deep-orange-text text-darken-2"}
                isText={false}
              />
              <KPI
                cardBackgroundColor={"white"}
                cardTextcolor={"blue-grey-text text-darken-4"}
                title={"Total Users"}
                kpi={this.state.usersData.length}
                kpiColor={"cyan-text"}
                isText={false}
              />
              <KPI
                cardBackgroundColor={"white"}
                cardTextColor={"blue-grey-text text-darken-4"}
                title={"Promotions Redeemed"}
                kpi={this.state.redemptionsData.length}
                kpiColor={"indigo-text"}
                isText={false}
              />
            </div>
          </div>
          <div className="row welcome">
            <h1>Welcome</h1>
            <h1>to</h1>
            <h1>Digital Billboards</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardPage