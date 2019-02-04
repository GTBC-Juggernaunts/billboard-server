import React from 'react';
import TextInput from "./TextInput";
import { Input } from 'react-materialize';
import './form.css';

const PromotionForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="row top-panel">
        <div className="col s12 z-depth-1 form-card">
          <h5>Create a New Promotion</h5>
          <div className="col s12">
            <TextInput
              name="PromotionText"
              label="Promotional Text"
              value={props.PromotionText}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="col s12">
            <TextInput
              name="PreferenceGroup"
              label="Preference Group"
              value={props.PreferenceGroup}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="col s12">
            <div className="col s12">
              <Input
                name="BeaconTag"
                label="Beacon Tag"
                type="select"
                s={12}
                value={props.BeaconTag}
                onChange={props.handleInputChange}
              >
                <option value="mint">Mint</option>
                <option value="ice">Ice</option>
                <option value="coconut">Coconut</option>
                <option value="blueberry">Blueberry</option>
              </Input>
            </div>
          </div>
          <div className="col s12">
            <div className="col s12">
              <Input
                s={12}
                name="ExpirationDate"
                label="Expiration Date"
                value={props.ExpirationDate}
                type="date"
                onChange={props.handleInputChange}
              />
            </div>
          </div>
            <div className="col s12 submit-btn-container">
              <button
                className="btn grey darken-3 waves-effect waves-light"
                type="submit"
                name="action">
                Submit
              </button>
            </div>
        </div>
      </div>
    </form>
  )
};

export default PromotionForm