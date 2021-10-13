import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../service/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const cname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};

const cnumber = value => {
    if (value.length != 16) {
        return (
            <div className="alert alert-danger" role="alert">
                The card number must be 16 digits.
            </div>
        );
    }
};

const cmonth = value => {
    if (value < 1 || value > 12) {
        return (
            <div className="alert alert-danger" role="alert">
                The value for month should be between 1 to 12.
            </div>
        );
    }
};

const cyear = value => {
    if (value < 21 || value >= 99) {
        return (
            <div className="alert alert-danger" role="alert">
                The value entered for year is invalid.
            </div>
        );
    }
};

const ccvc = value => {
    if (value.length != 3) {
        return (
            <div className="alert alert-danger" role="alert">
                The cvc number should be 3 digits.
            </div>
        );
    }
};

export default class PaymentPopup extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeCVC = this.onChangeCVC.bind(this);

        this.state = {
            name:"",
            number:"",
            month:"",
            year:"",
            cvc:"",
            userType:""
        };

        if(AuthService.getCurrentUser() != null){
            for(var i = 0; i < AuthService.getCurrentUser().roles.length; i++){
                if(AuthService.getCurrentUser().roles[i] == "ROLE_RP"){
                    this.state.userType = "ROLE_RP";
                    break;
                }
            }
        } else {
            this.state.userType = "NONE";
        }
    }

    onChangeName(e){
        this.setState({
           name: e.target.name
        });
    }

    onChangeNumber(e){
        this.setState({
            number: e.target.number
        });
    }

    onChangeMonth(e){
        this.setState({
            month: e.target.month
        });
    }

    onChangeYear(e){
        this.setState({
            year: e.target.year
        });
    }

    onChangeCVC(e){
        this.setState({
            cvc: e.target.cvc
        });
    }

    handlePayment(e){
        e.preventDefault();
    }

    render() {
        const {
            userType
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handlePayment}>
                    <div className="form-group">
                        <Input
                            type="text"
                            placeholder="Name on Card"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            validations={[required, cname]}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            type="text"
                            placeholder="Card Number"
                            className="form-control"
                            name="number"
                            pattern="\d*"
                            maxLength="16"
                            value={this.state.number}
                            onChange={this.onChangeNumber}
                            validations={[required, cnumber]}
                        />
                    </div>
                    <div>
                        <div className="form-group">
                            <Input
                                type="text"
                                placeholder="Month of Expiry - MM"
                                className="form-control"
                                name="month"
                                pattern="\d*"
                                maxLength="2"
                                value={this.state.month}
                                onChange={this.onChangeMonth}
                                validations={[required, cmonth]}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                type="text"
                                placeholder="Year of Expiry - YY"
                                className="form-control"
                                name="year"
                                pattern="\d*"
                                maxLength="2"
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                validations={[required, cyear]}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Input
                            type="text"
                            placeholder="CVC"
                            className="form-control"
                            name="cvc"
                            pattern="\d*"
                            maxLength="3"
                            value={this.state.cvc}
                            onChange={this.onChangeCVC}
                            validations={[required, ccvc]}
                        />
                    </div>
                </form>
            </div>
        );
    }
}