import React, {Component, componentWillMount} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QuoteChart from './Chart';
import { openPosition } from '../Actions/positions';
import { clickQuoteClose} from '../Actions/quotes';

class BookTrade extends Component {
    constructor(props){
        super(props);
        this.state = {
            volume: '100',
            valid: true
        }
        this.round=this.round.bind(this);
        this.handleVolume=this.handleVolume.bind(this);
        this.getPrices=this.getPrices.bind(this);
        this.buyCheck=this.buyCheck.bind(this);
        this.sellCheck=this.sellCheck.bind(this);
    }
    round(value){
        return parseFloat((value).toFixed(4));
    }
    handleVolume(e){
        if(e>0){
            this.setState({
                valid: true,
                volume: e
            })
        }else{
            this.setState({
                valid: false
            })
        }
    }
    getPrices(symbol){
       return this.props.quotes.filter(e => e.symbol === symbol)
    }
    buyCheck(){
        return this.getPrices(this.props.clickQuote.quote.symbol)[0].ask*this.state.volume<=this.props.cash.cash;
    }
    sellCheck(){
        return this.getPrices(this.props.clickQuote.quote.symbol)[0].bid*this.state.volume<=this.props.cash.cash;
    }
    render(){
            if(this.props.clickQuote.isVisible){
                return(
                    <div>
                    <div className="chartUpper">
                        <span className="prices">{this.getPrices(this.props.clickQuote.quote.symbol)[0].bid} / {this.getPrices(this.props.clickQuote.quote.symbol)[0].ask} </span> 
                        <span className="companyName">{this.props.clickQuote.quote.companyName}</span>
                            <div className="quantity">QUANTITY: <input
                            id={(!this.buyCheck() && !this.sellCheck())||!this.state.valid?'danger':null}
                            type="number"
                            min="1"
                            defaultValue="100" 
                            onChange={(e) => this.handleVolume(e.target.value)}
                            />
                            </div>
                        <div className="transaction">
                            <div className="piece" id="pieceRight">
                            <button id={!this.buyCheck()||!this.state.valid?'disabled':null} 
                            onClick={() => {this.buyCheck()&&this.state.valid? this.props.openPosition({ 
                                symbol : this.props.clickQuote.quote.symbol,
                                indicator : 'long',
                                volume : this.state.volume,
                                openPrice : this.getPrices(this.props.clickQuote.quote.symbol)[0].ask,
                                openTime : Date.now(),
                                deposit: this.round(this.getPrices(this.props.clickQuote.quote.symbol)[0].ask*this.state.volume)
                            }):null}}
                            >BUY</button>
                            </div>
                            <div className="piece" id="pieceLeft">
                            <button 
                            id={!this.sellCheck()||!this.state.valid?'disabled':null} 
                            onClick={() => {this.sellCheck()&&this.state.valid?this.props.openPosition({ 
                                symbol : this.props.clickQuote.quote.symbol,
                                indicator : 'short',
                                volume : this.state.volume,
                                openPrice : this.getPrices(this.props.clickQuote.quote.symbol)[0].bid,
                                openTime : Date.now(),
                                deposit: this.round(this.getPrices(this.props.clickQuote.quote.symbol)[0].bid*this.state.volume)
                            }):null}
                        }>SELL</button>
                            </div>
                        </div>
                    </div>
                        <QuoteChart />
                </div>
                )
            }else{
                return(
                    <div className="alert">
                    Your chart area is empty.
                    </div>
                )
            }
    }
    
}
function mapStateToProps(state){
    return{ 
        quotes: state.quotes,
        clickQuote: state.clickQuote,
        cash: state.cash
    }
};
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        clickQuoteClose: clickQuoteClose,
        openPosition: openPosition
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookTrade);