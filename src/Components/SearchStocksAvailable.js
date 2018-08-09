import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setStocks, countStocks} from '../Actions/stocksAvailable';
 
var stocksData = [];

class SearchStocksAvailable extends Component {
  constructor() {
    super();
    this.state = {
      data: stocksData,
      list: undefined,
      listItems: undefined,
    }
    this.exists=this.exists.bind(this);
    this.listCreator=this.listCreator.bind(this);
    this.searchData=this.searchData.bind(this);
  }
  componentDidMount(){
    if(stocksData.length === 0){
      var url = 'https://api.iextrading.com/1.0/ref-data/symbols';
      fetch(url)
      .then(results => results.json())
      .then(data => 
        {
          stocksData = data;
          this.setState({data:data});
        }
      ).catch(error => console.log('Error:' + error))
    }
  }
  searchData(value) {
    var queryData = [];
    if(value !== '') {
      this.state.data.forEach(stock => {
          if(stock.symbol.toLowerCase().indexOf(value)!==-1 || stock.name.toLowerCase().indexOf(value)!==-1) {
            if(queryData.length < 10) {
              queryData.push(stock);
            }
          }
      });
    }
    var final=[];
    queryData.forEach(value => {
      if(!this.exists(value.symbol)){
        final.push(value);
      }
    })
    this.setState({list: final});
  }
  exists(data){
    var exists = false
    this.props.stocksAvailable.forEach(stock => {
      if(data === stock)
      exists = true;
    })
    return exists;
  }
  listCreator(){
    if(this.state.list){
      var list = this.state.list.slice();
    return list.map((value, index) => 
          <div className="addCompany" key={value.symbol} onClick={() =>{
          this.props.countStocks(1);
          this.props.setStocks(value.symbol);
          var newArray = this.state.list.slice();
          newArray.splice(index, 1);
          this.setState({
            list: newArray
          })
        }
        }>
            <i className="fa fa-plus" aria-hidden="true"></i> {value.symbol}, {value.name}
        </div>)
  }
  }
  render() {
    return(
      <div className="settingProperty">
      <input onChange={(e) => this.searchData(e.target.value)} ref={e => this.searchBox = e} placeholder="Search Stocks" />
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