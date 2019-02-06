import React from "react";
import PromotionForm from "../components/form/PromotionForm";
import './page.css';
import API from "../utils/API"
import Table from "../components/table/Table";
import KPI from "../components/KPI/KPI";
import moment from "moment";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts';

class PromotionsControlPage extends React.Component {
  state = {
    promotionData:[],
    redemptionsData:[],
    categoryData:[],
    topPromo: "",
    topPromoCount: 0,
    topUser: "",
    PromotionText: "",
    BeaconTag: "mint",
    PreferenceGroup: "",
    ExpirationDate: "",
  };

  findMostRedeemedPromo = () => {
    const promotionArray = this.state.promotionData;
    API.getRedemptionCountByPromo()
      .then(res => {
        if ( res.data[0]) {
          const topPromoId = res.data[0]._id;
          console.log("topPromoId", topPromoId);
          let topPromo = "";
          const topPromoCount = res.data[0].count;
          promotionArray.forEach(promotion => {
            if (promotion._id === topPromoId) {
              console.log("match found", promotion);
              topPromo = promotion.PromotionText;
            }
          });
          console.log("top promotion", topPromo, topPromoCount);
          this.setState({
            topPromo,
            topPromoCount
          })
        }
        else {
          console.log("no redemptions in system")
        }
      });
  };

  getPromotionCountByPreference = () => {
    API.getPromotionCountByPreferenceGroup()
      .then(res => {
        let categoryData = [];
        res.data.forEach(category => {
          categoryData.push({
            PreferenceGroup: category._id,
            count: category.count
          })
        });
        console.log("category frequency", categoryData);
        this.setState({
          categoryData
        })
      })
  };

  getRedemptions = () => {
    API.getRedemptions()
      .then(res => {
        let redemptionsData = [];
        res.data.forEach(redemption => {
          redemptionsData.push({
            id: redemption._id,
            PromotionId: redemption.PromotionId,
            UserId: redemption.UserId
          })
        });
        console.log("redemptions", redemptionsData);
        this.setState({
          redemptionsData
        })
      })
  };

  getPromotions = (callback) => {
    API.getPromotions()
      .then(res => {
        let promotionData = [];
        res.data.forEach(promo => {
          promotionData.push({
            _id: promo._id,
            PromotionText: promo.PromotionText,
            BeaconTag: promo.BeaconTag,
            PreferenceGroup: promo.PreferenceGroup,
            ExpirationDate: moment(promo.ExpirationDate).format("dddd, MMMM Do YYYY")
          })
        });
        this.setState({
          promotionData
        });
        console.log("promotionData", this.state.promotionData);
        callback()
      })
  };

  reloadData = () => {
    this.getPromotions(this.findMostRedeemedPromo);
    this.getRedemptions();
    this.getPromotionCountByPreference();
  };

  componentDidMount() {
    this.reloadData();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submitting state');
    console.log(this.state);
    const newPromo = {
      PromotionText: this.state.PromotionText,
      BeaconTag: this.state.BeaconTag,
      PreferenceGroup: this.state.PreferenceGroup,
      ExpirationDate: this.state.ExpirationDate,
    };
    API.savePromotion(newPromo)
      .then(res => {
        console.log("axiosresponse",res);
        if(res.status === 200) {
          console.log("New Promotion Successfully Added");
        }
        else {
          alert("An error has occurred. Please check the console.")
        }
      })
      .then(
        this.setState({
          PromotionText: "",
          BeaconTag: "mint",
          PreferenceGroup: "",
          ExpirationDate: "",
        }))
      .then(this.reloadData());
  };

  columns = [
    { Header: 'Promotion Text', accessor: 'PromotionText' },
    { Header: 'Beacon Tag', accessor: 'BeaconTag' },
    { Header: 'Preference Group', accessor: 'PreferenceGroup' },
    { Header: 'Expiration Date', accessor: 'ExpirationDate' }
  ];

  render() {
    return(
      <div className="mainContainer">

        <div className="row">
            <div className="wide-container">
              <div className="col s6 l3">
                <PromotionForm
                  handleInputChange={this.handleInputChange}
                  handleSubmit={this.handleSubmit}
                  PromotionText={this.state.PromotionText}
                  BeaconTag={this.state.BeaconTag}
                  PreferenceGroup={this.state.PreferenceGroup}
                  ExpirationDate={this.state.ExpirationDate}
                />
              </div>
              <div className="col s6 l9">
                <div className="row">
                  <KPI
                    cardBackgroundColor="white"
                    cardTextcolor="blue-grey-text text-darken-4"
                    title="Total Promotions"
                    kpi={this.state.promotionData.length}
                    kpiColor="deep-orange-text text-darken-2"
                  />
                  <KPI
                    cardBackgroundColor="white"
                    cardTextcolor="blue-grey-text text-darken-4"
                    title="Most Redeemed Promotion"
                    kpi={this.state.topPromoCount}
                    subtitle={this.state.topPromo}
                    kpiColor="cyan-text"
                  />
                  <KPI
                    cardBackgroundColor="white"
                    cardTextcolor="blue-grey-text text-darken-4"
                    title="Top Category by Promo Ct."
                    kpi={this.state.categoryData[0] ? this.state.categoryData[0].count : 0}
                    subtitle={this.state.categoryData[0] ? this.state.categoryData[0].PreferenceGroup : "No promotions"}
                    kpiColor="indigo-text"
                  />
                </div>
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <h5>Count of Promotions by Preference Grouping</h5>
                      <ResponsiveContainer height={286} width="95%">
                        <BarChart
                          data={this.state.categoryData}
                          onClick={function(event) {console.log(event)}}
                        >
                          <XAxis dataKey="PreferenceGroup" />
                          <YAxis dataKey="count" />
                          <Bar type="monotone" dataKey="count" barSize={30} fill="#607d8b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="row">
          <div className="wide-container">
            <div className="col s12">
              <Table
                data={this.state.promotionData}
                columns={this.columns}
                defaultPageSize={8}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PromotionsControlPage