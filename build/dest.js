
var DrawDate = React.createClass({displayName: "DrawDate",
	
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
		var layer = this.state.layer ? React.createElement(Overlay, {id: "overlay", onClick: this.inv}) : null;
		return( 
			React.createElement("div", {className: "index"}, layer, 
			React.createElement("h3", null, "Datepicker"), 
			React.createElement("input", {type: "text", ref: "InputChoice", placeholder: "select date", value: this.state.inputValue, onClick: this.inv}), 
			React.createElement("div", {ref: "popup", id: "popup", className: this.state.layer ? '' : 'hidden', onClick: this.stopEvent}, 
			React.createElement("div", {className: "select"}, 
				React.createElement("u", {onClick: this.setPrevYear}, (this.state.Now.year()-1)), " ", React.createElement("b", null, this.state.Now.year()), " ", React.createElement("u", {onClick: this.setNextYear}, (this.state.Now.year()+1)), React.createElement("br", null), 
				React.createElement("u", {onClick: this.setPrevMonth}, this.state.Now.clone().subtract(1, 'months').format("MMMM")), " ", React.createElement("b", null, this.state.Now.format("MMMM")), " ", React.createElement("u", {onClick: this.setNextMonth}, this.state.Now.clone().add(1, 'months').format("MMMM"))
			), 
			React.createElement("table", {onClick: this.stopEvent}, 
			  React.createElement("thead", null, 
			    React.createElement("tr", null, 
			      titles.map(function(title) {
				return React.createElement("th", {key: title}, title);
			      })
			    )
			  ), 
			  React.createElement("tbody", null, 
        		    this.rows().map(function(row, i) {
				return (
					React.createElement("tr", {key: i}, 
					Array.prototype.map.call(row, function(col, j) { return React.createElement("td", {onClick: this.handleClick}, col); }.bind(this))
					
					)
					);
			    }.bind(this))
			  )
			)
			)
			)
		);
	}
});
//moment = new moment();
console.log(moment());
titles = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
moment.locale('en-gb');
var MainApp = React.createClass({displayName: "MainApp",
	render: function() 
	{ 

		return (React.createElement("div", null, 
			React.createElement(DrawDate, null)
			)
    			);
	}
});
var Overlay = React.createClass({displayName: "Overlay",
	componentWillMount: function() {
		this.popup = document.createElement("div");
	},
	componentDidMount: function() {
		document.body.appendChild(this.popup);
		this._renderLayer();
		console.log('create');
	},
	componentDidUpdate: function() {
		this._renderLayer();
	},
	componentWillUnmount: function() {
		document.body.removeChild(this.popup);
		React.unmountComponentAtNode(this.popup);
	},
	_renderLayer: function() {
		React.render(React.DOM.div(this.props, this.props.children), this.popup);
	},
	render: function() {
		return React.DOM.div(this.props);
	}
});

React.render(React.createElement(MainApp, null), document.getElementById('example'));