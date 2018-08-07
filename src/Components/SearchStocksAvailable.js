import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setStocks, countStocks} from '../Actions/stocksAvailable';
 

class SearchStocksAvailable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      list: undefined,
      listItems: undefined,
    }
    this.exists=this.exists.bind(this);
    this.listCreator=this.listCreator.bind(this);
    this.searchData=this.searchData.bind(this);
  }
  componentDidMount(){
    var url = 'https://api.iextrading.com/1.0/ref-data/symbols';
    fetch(url).
    then(results => results.json()).
    then(data => 
      {
        this.setState({data:data});
      }
    ).catch(error => console.log('Error:' + error))
  }
  searchData(e) {
    var queryData = [];
    if(e.target.value != '') {
      this.state.data.forEach(stock => {
          if(stock.symbol.toLowerCase().indexOf(e.target.value)!=-1 || stock.name.toLowerCase().indexOf(e.target.value)!=-1) {
            if(queryData.length < 10) {
              queryData.push(stock);
            }
          }
      });
    }
    this.setState({list: queryData});
  }
  exists(data){
    var exists = false;
    this.props.stocksAvailable.map(stock => {
      if(data === stock)
      exists = true;
    })
    return exists;
  }
  listCreator(){
    if(this.state.list){
    return this.state.list.map(value => {
      if(!this.exists(value.symbol)){
        return(
          <div className="addCompany" key={value.symbol} onClick={() =>{
          this.props.countStocks(1);
          this.props.setStocks(value.symbol)}}>
            <i className="fa fa-plus" aria-hidden="true"></i> {value.symbol}, {value.name}
        </div>);
      }else{
        return null
      }
    })
  }
  }
  render() {
    return(
      <div className="settingProperty">
      <input onChange={this.searchData} placeholder="Search Stocks" />
      <div className="results">
        {this.state.data.length===0?
        <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      :this.listCreator()}
        </div>
      </div>
    )
  }
}



function mapStateToProps(state){
  return{quotes: state.quotes, stocksAvailable: state.stocksAvailable, clickQuote: state.clickQuote}
}
  function mapDispatchToProps(dispatch){
    return bindActionCreators({setStocks: setStocks, countStocks: countStocks}, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SearchStocksAvailable);