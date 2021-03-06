import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setStocks, removeStocks, countStocks} from '../Actions/stocksAvailable';
import { mouseIn, mouseMove, mouseOut} from '../Actions/tooltips';

class StocksAvailable extends Component {
  constructor(props){
    super(props);
    this.fetchStocks=this.fetchStocks.bind(this);
    this.addRandomStocks=this.addRandomStocks.bind(this);
  }
  fetchStocks(){
    this.props.countStocks(5);
    var url = 'https://api.iextrading.com/1.0/ref-data/symbols';
    fetch(url)
    .then(results => results.json())
    .then(data => 
      {
        this.addRandomStocks(data);
      }
    ).catch(error => console.log('Error:' + error))
  }
  addRandomStocks(data){
    do {
      var rand = Math.floor(Math.random()*data.length);
      var match = true;
      this.props.stocksAvailable.forEach(stock => {
        if(stock!==data[rand].symbol){
          match = false;
        }
      })
      if(!match)
      this.props.setStocks(data[rand].symbol);
    } while (this.props.stocksAvailable.length!==this.props.stocksCounter.counter)
  }
  mapStocksAvailable(){
    return this.props.stocksAvailable.map(stock => {
      var isOpen = false
      this.props.positions.forEach(position => {
        if(position.symbol===stock && position.status==='open')
        isOpen = true;
      })
      if(isOpen){
        return(
          <div key={stock} className="removeCompanyOpen"
          onMouseOver={(e) => this.props.mouseIn(e, 'removeStock')}
          onMouseMove={(e) => this.props.mouseMove(e)}
          onMouseOut={this.props.mouseOut}>
          <i className="fa fa-thumb-tack" aria-hidden="true"></i> {stock} 
          </div>
        );
      }else{
        return(
          <div key={stock} className="removeCompany" onClick={() => {
            this.props.removeStocks({stock})
        }}>
          <i className="fa fa-times" aria-hidden="true"></i> {stock}
          </div>
        );
      } 
    })
  }
  render(){
    return(
      <div className="settingProperty">
        <button onClick={() => this.fetchStocks()}>Add random companies</button>
        <div className="results">{this.props.stocksAvailable.length!==this.props.stocksCounter.counter?
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>:
          this.mapStocksAvailable()}</div>
      </div>
    )}
  
}
function mapStateToProps(state){
  return{ 
    stocksAvailable: state.stocksAvailable, 
    stocksCounter: state.stocksCounter,
    positions: state.positions
  }
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setStocks: setStocks, 
    removeStocks: removeStocks, 
    countStocks: countStocks,
    mouseIn: mouseIn,
    mouseMove: mouseMove,
    mouseOut: mouseOut
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StocksAvailable);