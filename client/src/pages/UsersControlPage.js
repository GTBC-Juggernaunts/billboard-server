import React from "react";
import API from "../utils/API";
import UserForm from "../components/form/UserForm";
import './page.css';
import Table from "../components/table/Table";
import KPI from "../components/KPI/KPI";
import {AreaChart, XAxis, YAxis, Area, ResponsiveContainer} from "recharts";
import Header from "../components/Header/Header";


class UsersControlPage extends React.Component {
  state = {
    userData:[],
    topUser:"",
    topUserCount: 0,
    userDateData:[],
    categoryData: [],
    redemptionCount: 0,
    Username: "",
    Name: "",
    Email: "",
    Phone: "",
    PreferenceGroup: ""
  };

  getUsers = (callback) => {
    API.getUsers()
      .then(res => {
        console.log(res);
        let userData = [];
        res.data.forEach(user => {
          userData.push({
            id: user._id,
            Username: user.Username,
            Name: user.Name,
            Email: user.Email,
            Phone: user.Phone,
            PreferenceGroup: user.PreferenceGroup
          })
        });
        this.setState({
          userData
        });
        callback()
      })
  };

  getUsersCountByPreference = () => {
    API.getUserCountByPreferenceGroup()
      .then(res => {
        let categoryData = [];
        res.data.forEach(category => {
          categoryData.push({
            PreferenceGroup: category._id,
            count: category.count
          })
        });
        this.setState({
          categoryData
        });
        console.log("category state", this.state)
      })
  };

  getRedemptionsCount = () => {
    API.getRedemptions()
      .then(res => {
        const redemptionCount = res.data.length
        this.setState({
          redemptionCount
        })
      })
  };

  findMostRedeemedUser = () => {
    const userArray = this.state.userData;
    API.getRedemptionCountByUser()
      .then(res => {
        if ( res.data[0] ) {
          const topUserId = res.data[0]._id;
          let topUser = "";
          const topUserCount = res.data[0].count;
          userArray.forEach(user => {
            console.log(user);
            if (user.id === topUserId) {
              console.log("match found", user);
              topUser = user.Name
            }
          });
          this.setState({
            topUser,
            topUserCount
          });
          console.log(this.state)
        }
        else {
          console.log("no redemptions in system")
        }
      })
  };

  getUserByCreationDate = ()=> {
    API.getUsersByCreateDate()
      .then(res => {
        if ( res.data[0]) {
          let userDateData = [];
          let i = 0;
          res.data.forEach(day => {
            i += day.count;
            userDateData.push({
              day: day._id,
              users: i
            })
          });
          this.setState({
            userDateData
          });
          console.log("userdatedatamachahumbo", this.state.userDateData)
        }
        else {
          console.log("no users in system")
        }
      })
  };

  reloadData = () => {
    this.getRedemptionsCount();
    this.getUsers(this.findMostRedeemedUser);
    this.getUsersCountByPreference();
    this.getUserByCreationDate();
  };

  componentDidMount() {
    this.reloadData();
  };

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
    const newUser = {
      Username: this.state.Username,
      Name: this.state.Name,
      Email: this.state.Email,
      Phone: this.state.Phone,
      PreferenceGroup: this.state.PreferenceGroup
    };
    API.saveUser(newUser)
      .then(res => {
        console.log("axiosresponse",res);
        if(res.status === 200) {
          alert("New User Successfully Added")
        }
        else {
          alert("An error has occurred. Please check the console.")
        }
      })
      .then(
        this.setState({
          Username: "",
          Name: "",
          Email: "",
          Phone: 9999999999,
          PreferenceGroup: ""
        }))
      .then(this.reloadData());
  };

  columns = [
    { Header: 'Username', accessor: 'Username'},
    { Header: 'Name', accessor: 'Name'},
    { Header: 'Email', accessor: 'Email'},
    { Header: 'PhoneNumber', accessor: 'Phone'},
    { Header: 'Preference Group', accessor: 'PreferenceGroup'}
  ];

  render() {
    return(
      <div className="mainContainer">
        <Header
          username="GTBC Storefront"
          title="Users Control Panel"
        />
        <div className="row">
          <div className="wide-container">
            <div className="col s6 l3">
              <UserForm
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                Username={this.state.Username}
                Name={this.state.Name}
                Email={this.state.Email}
                Phone={this.state.Phone}
                PreferenceGroup={this.state.PreferenceGroup}
              />
            </div>
            <div className="col s6 l9">
              <div className="row">
                <KPI
                  cardBackgroundColor="white"
                  cardTextcolor="blue-grey-text text-darken-4"
                  title="Avg Redemptions Per User"
                  kpi={this.state.userData.length ? this.state.redemptionCount / this.state.userData.length : 0 }
                  kpiColor="deep-orange-text text-darken-2"
                  isText={false}
                />
                <KPI
                  cardBackgroundColor="white"
                  cardTextcolor="blue-grey-text text-darken-4"
                  title="Highest User"
                  kpi={this.state.topUser}
                  kpiColor="cyan-text"
                  isText={true}
                />
                <KPI
                  cardBackgroundColor="white"
                  cardTextcolor="blue-grey-text text-darken-4"
                  title="Total Users"
                  kpi={this.state.userData.length}
                  kpiColor="indigo-text"
                  isText={false}
                />
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="card">
                    <h5>Count of Users Over Time</h5>
                    <ResponsiveContainer height={370} width="95%">
                      <AreaChart
                        data={this.state.userDateData}
                      >
                        <XAxis dataKey="day"/>
                        <YAxis />
                        <Area type="monotone" dataKey="users" stroke="#7AA095" fill="#717C89" />
                      </AreaChart>
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
                data={this.state.userData}
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

export default UsersControlPage