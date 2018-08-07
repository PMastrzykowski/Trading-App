
import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';


class QuoteChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            labels: [],
            prices: [],
            company: undefined,
            chartPeriod: '1m'
        }
        this.chartData=this.chartData.bind(this);
        this.chartPeriodChange=this.chartPeriodChange.bind(this);
        this.dataFilling=this.dataFilling.bind(this);
        this.reloadChart=this.reloadChart.bind(this);
    }
    chartData(period){
        const url = String('https://api.iextrading.com/1.0/stock/'+this.props.clickQuote.quote.symbol+'/chart/'+period);
        fetch(url).
        then(results => results.json()).
        then(data => 
          {
            var labels = [];
            var prices = [];
            for(var i=0; i<data.length; i++){
                if(data[i].close){
                    prices.push(data[i].close);
                    labels.push(data[i].label);
                }
                else{
                    if(data[i].average>0){
                        prices.push(data[i].average);
                        labels.push(data[i].label);
                    }
                }
            }
            this.setState({
                prices: prices,
                labels: labels
            })
          }
        ).catch(error => console.log('Error:' + error))
      }
    chartPeriodChange(period){
        this.setState({
            chartPeriod: period
        });
        this.chartData(period);
    }
    dataFilling(){
        return(
            {
                labels: this.state.labels,
                datasets: [
                  {
                    label: 'Price',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75,192,192,1)',
                    pointBorderWidth: 0,
                    pointHoverRadius: 0,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.prices,
                  }
                ],
                
              }
        );
    }
    componentDidUpdate(){
        this.reloadChart()
    }
    componentWillMount(){
        this.reloadChart()
    }
    reloadChart(){
        if(this.state.company===undefined){
            this.setState({company: this.props.clickQuote.quote.symbol})
        }
        if(this.state.company!==this.props.clickQuote.quote.symbol){
            this.setState({company: this.props.clickQuote.quote.symbol})
            this.chartData(this.state.chartPeriod); 
        }
    }
    render() {
    return (
      <div className="chartCanvas">
        <p>CHART PERIOD: 
        <select onChange={(e) => {
            this.chartPeriodChange(e.target.value)
        }}>
        <option>1m</option>
        <option>3m</option>
        <option>6m</option>
        <option>1y</option>
        <option>2y</option>
        <option>5y</option>
        <option>ytd</option>
      </select></p>
            <Line 
        data={this.dataFilling()} 
        onChange={this.changeHandler}
        options={{
            legend:{
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#818181",
                        fontSize: 12,
                        fontFamily: "Work Sans"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#818181",
                        fontSize: 12,
                        fontFamily: "Work Sans"
                    }
                }]
            },
            animation: false
        }} 
        redraw
        />
      </div>
    );
  }
};
function mapStateToProps(state){
    return{ clickQuote: state.clickQuote}
};
export default connect(mapStateToProps)(QuoteChart);

