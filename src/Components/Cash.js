import React, {Component} from 'react';
import {connect} from 'react-redux';

class Cash extends Component {
    constructor(props){
        super(props);
        this.round=this.round.bind(this);
    }
    round(value){
        return Math.round(value*10000)/10000;
    }
    render(){
        return(
            <div>
                <h2>Cash balance</h2>
                <h3>{this.round(this.props.cash.cash)} USD</h3>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{ cash: state.cash}
};
export default connect(mapStateToProps)(Cash);