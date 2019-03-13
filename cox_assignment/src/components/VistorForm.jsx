import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { addArticle } from "../redux/actions/actionIndex";

function mapDispatchToProps(dispatch) {
    return {
        addArticle: article => dispatch(addArticle({showForm: article}))
    };
}


class VistorFormConnected extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'time': '',
            'name': '',
            'phone': ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3030/specificSlotInfo/'+this.props.appointmentTime)
            .then(res => this.setState({
                time: res.data.time,
                name: res.data.name,
                phone: res.data.phone
            }));
    }

    handleInputChange(element) {
        this.setState({[element.target.name]: element.target.value})
    }

    handleSubmit() {
        let submitObj = {
            time: this.state.time,
            name: this.state.name,
            phone: this.state.phone
        }

        axios.post('http://localhost:3030/timeSubmit/', submitObj)
            .then(res => { if(res.data === 'Time slot saved!') this.props.addArticle(false); })
            .catch(function(error){if(!error.error);})
    }

    render() {
        return(
            <div className="modalBackDrop">
                <div className="modalForeDrop">
                    <div className="timeForm ">
                        <div className="input-group inputGroup">
                            <span className="input-group-addon formLabel">Time: </span>
                            <span className="input-group-addon formLabel">{this.state.time}</span>
                        </div>

                        <div className="input-group inputGroup">
                            <span className="input-group-addon formLabel">Name: </span>
                            <input className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={e => this.handleInputChange(e)} />
                        </div>

                        <div className="input-group inputGroup">
                            <span className="input-group-addon formLabel">Number: </span>
                            <input className="form-control" placeholder="Number" name="phone" value={this.state.phone} onChange={e => this.handleInputChange(e)} />  
                        </div>


                        <button type="button" className="btn btn-info btn-lg btn-block" onClick={e=> this.handleSubmit(e)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

const VistorForm = connect(null, mapDispatchToProps)(VistorFormConnected);
export default VistorForm;