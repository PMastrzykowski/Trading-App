import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setQuote, updateQuote } from '../Actions/quotes';
import PositionTable from './PositionTable';
import AssetTable from './AssetTable';
import BookTrade from './BookTrade';
import { setTimeout } from 'timers';

class PositionsPage extends Component {
  constructor(props){
    super(props);
    this.state ={
      quotesOpen: false,
      positionsOpen: false
    }
    this.tickData=this.tickData.bind(this);
    this.dataFilling=this.dataFilling.bind(this);
    this.opener=this.opener.bind(this);
  }
  tickData(){
    const url = String('https://api.iextrading.com/1.0/stock/market/batch?symbols='+this.props.stocksAvailable.join(',')+'&types=quote,logo&range=1m&last=1');
    fetch(url)
    .then(results => results.json())
    .then(data => 
      {
        this.props.stocksAvailable.map(company => this.dataFilling(company, data))
      }
    ).catch(error => console.log('Error:' + error))
    setTimeout(()=>this.tickData(), 60*1000);
  }
  dataFilling(symbol, data){
    const latest = data[symbol].quote.latestPrice;
    const spread = 0.002;
    var currentCompany = this.props.quotes.filter((e)=> e.symbol === symbol);
    if(currentCompany.length===0){
      this.props.setQuote({
        symbol: data[symbol].quote.symbol,
        companyName: data[symbol].quote.companyName,
        bid: parseFloat((latest-spread).toFixed(4)),
        ask: parseFloat((latest+spread).toFixed(4)),
        pic: data[symbol].logo.url
      });
    }
    else {
      this.props.updateQuote(
        data[symbol].quote.symbol,
        {
        bid: parseFloat((latest-spread).toFixed(4)),
        ask: parseFloat((latest+spread).toFixed(4)),
        pic: data[symbol].logo.url
      });
    }
  }
  componentWillMount(){
    this.tickData();
  }
  opener(a, b){
    this.setState({
      quotesOpen: a,
      positionsOpen: b
    })
  }
  render(){
    if(this.props.quotes.length!==this.props.stocksCounter.counter){
      return(
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )
    }
    else{
    return(
      <div className="main">
      <AssetTable quotesOpen={this.state.quotesOpen}/>
        <div 
          className="chart" 
          style={this.state.quotesOpen?{right: '-100%', left: '100%'}:
          this.state.positionsOpen?{right: '100%', left: '-100%'}:
          {right: '0px', left: '0px'}}>
        <BookTrade />
        </div>
        <PositionTable positionsOpen={this.state.positionsOpen} />
        <div className="footer">
          <div 
          className="footerItem" 
          onClick={() => this.opener(true, false)}>
          <i 
          className="fa fa-list" 
          style={this.state.quotesOpen?{color: 'rgba(75,192,192,1)'}:null} 
          aria-hidden="true">
          </i>
          </div>
          <div 
          className="footerItem" 
          onClick={() => this.opener(false, false)}>
          <i 
          className="fa fa-area-chart" 
          style={this.state.quotesOpen || this.state.positionsOpen?null:{color: 'rgba(75,192,192,1)'}} 
          aria-hidden="true">
          </i>
          </div>
          <div 
          className="footerItem" 
          onClick={() => this.opener(false, true)}>
          <i 
          className="fa fa-money" 
          style={this.state.positionsOpen?{color: 'rgba(75,192,192,1)'}:null} 
          aria-hidden="true">
          </i>
          </div>
        </div>
      </div>
    )}
  }
}
function mapStateToProps(state){
  return{
    quotes: state.quotes, 
    stocksAvailable: state.stocksAvailable, 
    clickQuote: state.clickQuote, 
    stocksCounter: state.stocksCounter
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setQuote: setQuote, 
    updateQuote: updateQuote
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionsPage);