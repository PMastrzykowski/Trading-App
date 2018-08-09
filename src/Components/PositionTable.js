import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { closePosition } from '../Actions/positions';
import Cash from './Cash';

class PositionTable extends Component {
    constructor(props){
        super(props);
        this.state ={
            wrap: ''
        }
        this.createPositionTable=this.createPositionTable.bind(this);
        this.getQuoteData=this.getQuoteData.bind(this);
        this.round=this.round.bind(this);
        this.wrapper=this.wrapper.bind(this);
    }
    getQuoteData(symbol){
        return this.props.quotes.find(function (quote) {
            return quote.symbol === symbol
        });
    }
    round(value){
        return parseFloat((value).toFixed(4));
    }
    wrapper(id){
        if(this.state.wrap!==id){
        this.setState({
            wrap: id
        })
        }
        else{
            this.setState({
                wrap: ''
            })  
        }
    }
    createPositionTable(){
        return this.props.positions.map(position => {
            const quote = this.getQuoteData(position.symbol);
            if(quote !== undefined){
                if(position.status==='open'){
                return(
                    <div key={position.id}>
                    <div className="positionItem" onClick={() => this.wrapper(position.id)}>
                    <div className="angle"><i className={this.state.wrap===position.id?"fa fa-angle-right fa-rotate-90":"fa fa-angle-right"} aria-hidden="true"></i></div>
                    <div className="company">{position.symbol}</div>
                    <div className={this.round((position.indicator==='long'? quote.bid-position.openPrice:position.openPrice-quote.ask)*position.volume)>0?'profit positive':'profit negative'}>{this.round((position.indicator==='long'? quote.bid-position.openPrice:position.openPrice-quote.ask)*position.volume)}</div>
                    <div className="close">
                        <button onClick={(e)=>{
                            e.stopPropagation();
                            this.setState({
                                wrap: ''
                            })  
                            this.props.closePosition({
                            id : position.id, 
                            status : 'close', 
                            closePrice : this.round(position.indicator==='long'? quote.ask:quote.bid), 
                            closeTime : Date.now(),
                            deposit: position.deposit,
                            commission: this.round((quote.ask-quote.bid)*position.volume),
                            profit : this.round((position.indicator==='long'? quote.bid-position.openPrice:position.openPrice-quote.ask)*position.volume)
                        })
                    }}>Close</button>
                    </div>
                    </div>
                    <div 
                        className={this.state.wrap===position.id?"positionDetails":"hidden"}
                        // style={{animation: this.state.wrap===position.id? "slide 1s ease":"slideBack 1s ease"}}
                        >
                        <div className="detail">
                            <div className="detailDescription">Volume</div>
                            <div className="detailValue">{position.volume}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Open Price</div>
                            <div className="detailValue">{position.openPrice}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Open Time</div>
                            <div className="detailValue">{(new Date(position.openTime)).toLocaleString()}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Long/Short</div>
                            <div className="detailValue">{position.indicator}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Deposit</div>
                            <div className="detailValue">{position.deposit}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Commission</div>
                            <div className="detailValue">{this.round((quote.ask-quote.bid)*position.volume)}</div>
                        </div>
                    </div>
                    </div>
                )
                }
            }
            return null;
        })
        
    }
    createBalanceTable(){
        return this.props.positions.map(position => {
                if(position.status==='close'){
                return(
                    <div key={position.id}>
                    <div className="positionItem" onClick={() => this.wrapper(position.id)}>
                    <div className="angle"><i className={this.state.wrap===position.id?"fa fa-angle-right fa-rotate-90":"fa fa-angle-right"} aria-hidden="true"></i></div>
                    <div className="company">{position.symbol}</div>
                    <div className={position.profit>0?'positive':'negative'}>{position.profit}</div>
                    <div className="close">
                    </div>
                    </div>
                    <div 
                        className={this.state.wrap===position.id?"positionDetails":"hidden"}
                        >
                        <div className="detail">
                            <div className="detailDescription">Volume</div>
                            <div className="detailValue">{position.volume}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Open Price</div>
                            <div className="detailValue">{position.openPrice}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Open Time</div>
                            <div className="detailValue">{(new Date(position.openTime)).toLocaleString()}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Close Price</div>
                            <div className="detailValue">{position.closePrice}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Close Time</div>
                            <div className="detailValue">{(new Date(position.closeTime)).toLocaleString()}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Long/Short</div>
                            <div className="detailValue">{position.indicator}</div>
                        </div>
                        <div className="detail">
                            <div className="detailDescription">Commission</div>
                            <div className="detailValue">{position.commission}</div>
                        </div>
                    </div>
                    </div>
                )   
            } else {
            return null;
            }
        })
        
    }
    render(){
        return(
            <div className="position" style={this.props.positionsOpen?{left: '0px'}:null}>
            <Cash />
            <h2>Open positions</h2>
            {this.createPositionTable()}
            <h2>Closed positions</h2>
            {this.createBalanceTable()}
            </div>
         )
    }
    
}

function mapStateToProps(state){
    return{ positions: state.positions, quotes: state.quotes}
};
function mapDispatchToProps(dispatch){
    return bindActionCreators({closePosition: closePosition}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionTable);