
var DrawDate = React.createClass({
	
	getInitialState: function() {
		return {
			inputValue: '', 
			Now: moment(),
			layer: false
			};
	},
	setNextMonth: function(event) {
		this.setState({Now: this.state.Now.add(1, 'months')});
	},
	setPrevMonth: function(event) {
		this.setState({Month: this.state.Now.subtract(1, 'months')});
	},
	setNextYear: function(event) {
		this.setState({Year: this.state.Now.add(1, 'years')});
	},
	setPrevYear: function(event) {
		this.setState({Year: this.state.Now.subtract(1, 'years')});
	},
	stopEvent: function(e)
	{
		e.stopPropagation();
	},
	handleClick: function(i) {
		if( i.target.innerHTML > 0 )
			this.setState({inputValue: this.state.Now.date(i.target.innerHTML).format("DD-MM-YYYY")});
	},
	rows: function()
	{
		var rows = [];
		mom = this.state.Now.date(1).clone();
		var to = mom.day() == 0 ? 6 : mom.weekday()-1;
		var counter = 0;
		rows[counter] = []
		for (var i = 0; i <= to; i++)
		{

			rows[counter].push([]);
		}
		mnt = mom.format('M');
		while (mnt == mom.format('M'))
		{

			rows[counter].push(mom.date());
			if ((mom.isoWeekday() == 0 ? 6 : mom.weekday()) % 7 == 6) 
			{     
				
				rows[++counter] = [];
			}
			mom.add(1, 'days');
		}
		if (mom.weekday() != 1)
		{

			for (var i = mom.weekday(); i < 7; i++)
			{
				rows[counter][i] = "";
			}

		}
		return rows;
	},
    	inv: function() {
        	this.setState({layer: !this.state.layer});
		//console.log('test_click!');
    	},
	render: function()
	{
		var layer = this.state.layer ? <Overlay id="overlay" onClick={this.inv}/> : null;
		return( 
			<div className="index">{layer}
			<h3>Datepicker</h3>
			<input type="text" ref="InputChoice" placeholder="select date" value={this.state.inputValue} onClick={this.inv} />
			<div ref="popup" id="popup" className={this.state.layer ? '' : 'hidden'} onClick={this.stopEvent}>
			<div className="select">
				<u onClick={this.setPrevYear}>{(this.state.Now.year()-1)}</u> <b>{this.state.Now.year()}</b> <u onClick={this.setNextYear}>{(this.state.Now.year()+1)}</u><br/>
				<u onClick={this.setPrevMonth}>{this.state.Now.clone().subtract(1, 'months').format("MMMM")}</u> <b>{this.state.Now.format("MMMM")}</b> <u onClick={this.setNextMonth}>{this.state.Now.clone().add(1, 'months').format("MMMM")}</u>
			</div>
			<table onClick={this.stopEvent}>
			  <thead>
			    <tr>
			      {titles.map(function(title) {
				return <th key={title}>{title}</th>;
			      })}
			    </tr>
			  </thead>
			  <tbody>
        		    {this.rows().map(function(row, i) {
				return (
					<tr key={i}>
					{Array.prototype.map.call(row, function(col, j) { return <td onClick={this.handleClick}>{col}</td>; }.bind(this))}
					
					</tr>
					);
			    }.bind(this))}
			  </tbody>
			</table>
			</div>
			</div>
		);
	}
});