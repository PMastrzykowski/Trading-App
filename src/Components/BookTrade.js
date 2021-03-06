import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QuoteChart from './Chart';
import { openPosition } from '../Actions/positions';
import { clickQuoteClose} from '../Actions/quotes';
import { mouseIn, mouseMove, mouseOut} from '../Actions/tooltips';

class BookTrade extends Component {
    constructor(props){
        super(props);
        this.state = {
            volume: '100',
            valid: true,
            hover: false
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
                            onMouseOver={(e) => !this.buyCheck()||!this.state.valid?this.props.mouseIn(e, 'transaction'):null}
                            onMouseMove={(e) => !this.buyCheck()||!this.state.valid?this.props.mouseMove(e):null}
                            onMouseOut={this.props.mouseOut}
                            onClick={() => {if(this.buyCheck()&&this.state.valid) this.props.openPosition({ 
                                symbol : this.props.clickQuote.quote.symbol,
                                indicator : 'long',
                                volume : this.state.volume,
                                openPrice : this.getPrices(this.props.clickQuote.quote.symbol)[0].ask,
                                openTime : Date.now(),
                                deposit: this.round(this.getPrices(this.props.clickQuote.quote.symbol)[0].ask*this.state.volume)
                            })}}
                            >BUY</button>
                            </div>
                            <div className="piece" id="pieceLeft">
                            <button 
                            id={!this.sellCheck()||!this.state.valid?'disabled':null} 
                            onMouseOver={(e) => !this.buyCheck()||!this.state.valid?this.props.mouseIn(e, 'transaction'):null}
                            onMouseMove={(e) => !this.buyCheck()||!this.state.valid?this.props.mouseMove(e, 'transaction'):null}
                            onMouseOut={this.props.mouseOut}
                            onClick={() => {if(this.sellCheck()&&this.state.valid) this.props.openPosition({ 
                                symbol : this.props.clickQuote.quote.symbol,
                                indicator : 'short',
                                volume : this.state.volume,
                                openPrice : this.getPrices(this.props.clickQuote.quote.symbol)[0].bid,
                                openTime : Date.now(),
                                deposit: this.round(this.getPrices(this.props.clickQuote.quote.symbol)[0].bid*this.state.volume)
                            })}
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
                    Your chart area is empty. Select a stock from the left panel, <br/>or customize your available stocks in settings.
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
        openPosition: openPosition,
        mouseIn: mouseIn,
        mouseMove: mouseMove,
        mouseOut: mouseOut
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookTrade);