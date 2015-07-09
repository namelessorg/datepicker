//moment = new moment();
console.log(moment());
titles = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
moment.locale('en-gb');
var MainApp = React.createClass({
	render: function() 
	{ 

		return (<div>
			<DrawDate/>
			</div>
    			);
	}
});
var Overlay = React.createClass({
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

React.render(<MainApp />, document.getElementById('example'));