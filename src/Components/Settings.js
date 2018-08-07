import React, {Component, componentWillMount} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StocksAvailable from './StocksAvailable';
import { reset } from '../Actions/positions';
import { setInitialBudget } from '../Actions/cash';
import SearchStocksAvailable from './SearchStocksAvailable';

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: '',
            saved: '',
            dialog: false
        }
    }
    dialog(){
        this.setState({
            dialog: !this.state.dialog
        })
    }
    save(e){
        if(e>0 && e.toString()[0]!=='0'){
            this.props.setInitialBudget(e);
            this.setState({error: ''})
        }else{
            this.setState({error: 'Initial budget must be positive.'})
        }
    }
    componentWillMount(){
        this.setState({
            error: '',
            saved: ''
        })
    }
    render(){
      return(

        <div className="main">
        <div className="leftBar">
        </div>
        <div className="chart">
        <div id="popup1" className={this.state.dialog?'overlay overlayChanged':'overlay'}>
        <div className="popup">
            Are you sure you want to reset game?
            <br />
            <button onClick={() => {
                this.props.reset();
                this.setState({saved: 'Game state reseted successfully.'})
                this.dialog();
            }}>YES</button>
            <button onClick={() => this.dialog()}>NO</button>
        </div>
    </div>
        &nbsp;
        <div className={this.state.error!==''?'info danger':''}>
                {this.state.error?<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>:''} {this.state.error}
        </div>
        <div className={this.state.saved!==''?'info calm':''}>
            {this.state.saved?<i className="fa fa-check" aria-hidden="true"></i>:''} {this.state.saved}
        </div>
        <div className="setting">
            <div className="settingProperty lessMargin">INITIAL BUDGET</div>
            <div className="settingProperty lessMargin">
            <input 
                type="number"
                min="1"
                defaultValue={this.props.cash.initial}
                onChange={(e) =>this.save(e.target.value)}
                id={this.state.error?'danger':this.props.positions.length===0?'':'disabled'}
                disabled={this.props.positions.length===0?false:true}
            />
            </div>    
        </div>
        <div className="setting">
            <SearchStocksAvailable />
            <StocksAvailable />  
        </div>
        <div className="setting">
                <div className="settingProperty">RESET GAME</div>
                <div className="settingProperty">
                <button onClick={() => this.dialog()}>RESET GAME</button>
                </div>    
            </div>
            </div>
            <div className="position">
            </div>
    </div>
    )
    }
    
}
function mapStateToProps(state){
    return{ positions: state.positions, cash: state.cash}
};
function mapDispatchToProps(dispatch){
    return bindActionCreators({reset: reset, setInitialBudget: setInitialBudget}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

