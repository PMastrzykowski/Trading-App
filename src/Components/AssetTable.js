import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clickQuote} from '../Actions/quotes';

class AssetTable extends Component {
    constructor(props){
        super(props);
        this.createAssetTable=this.createAssetTable.bind(this);
    }
    createAssetTable(){
        return this.props.quotes.map(quote => {
                return(
                    <div 
                    className="quote" 
                    key={quote.symbol} 
                    onClick={() => this.props.clickQuote(quote)}
                    >
                    <div className="symbol">{quote.symbol}</div>
                    <div className="price">{quote.bid} / {quote.ask}</div>
                    </div>
                )
        })
    }
    render(){
        return(
            <div className="leftBar" style={this.props.quotesOpen?{right: '0px'}:null}>
            {this.createAssetTable()}
            </div>
         )
    }
    
}
function mapStateToProps(state){
    return{ quotes: state.quotes}
};
function mapDispatchToProps(dispatch){
    return bindActionCreators({clickQuote: clickQuote}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);