import React, { Component } from 'react';
import { connect } from "react-redux";
import VistroForm from '../components/VistorForm';
import '../TimeSlot.css';
import uuidv4 from "uuid/v4";
import axios from 'axios';
import { addArticle } from "../redux/actions/actionIndex";


function mapDispatchToProps(dispatch) {
    return {
      addArticle: article => dispatch(addArticle({showForm: article}))
    };
}

const mapStateToProps = state => {
    return state;
};

class TimeSlot extends Component {
    constructor(props) {
        super();

        this.state = {
            slotList: [],
            selectedTime: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3030/allTimeSlots')
            .then(res => this.setState({ slotList: res.data.slots }));
    }

    componentDidUpdate(prevProps) {
        if(prevProps.showForm && !this.props.showForm) {
            axios.get('http://localhost:3030/allTimeSlots')
            .then(res => this.setState({ 
                    slotList: res.data.slots, 
                    selectedTime: ''
                })
            );
        }
    }


    handleTimeChange(e) {
        this.setState({ selectedTime: e.target.value, });
        this.props.addArticle(true);
    }

    render() {
        let slots = this.state.slotList.map((e) =>
            <option key={uuidv4()} value={e.time}
                className={(e.name.length === 0) ? "SlotEmpty" : "SlotFilled"}>{e.time}</option>);

        let showVistorForm = (this.props.showForm) ?
            <VistroForm appointmentTime={this.state.selectedTime}  /> : null;

        return (
            <div >
                <h3>Set up an appointment between 9:00 am - 5:00 pm</h3>
                <select value={this.state.selectedTime} onChange={e => this.handleTimeChange(e)} >
                    <option value="" disabled hidden>Choose here</option>
                    {slots}
                </select>
                {showVistorForm}
            </div>
        )
    }
}

const TimeSwap = connect(mapStateToProps, mapDispatchToProps)(TimeSlot);
export default TimeSwap;