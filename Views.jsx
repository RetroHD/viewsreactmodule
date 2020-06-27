import React from "react";
/**
 * Warning: This API is hosted on glitch.com and uses quick.db atm.
 * Highly advised to not use this api once the site is fully complete.
 * 
 * Displays ammount of views a code snippet has.
 * @param {string} id - Code snippet id.
 */
 class Views extends React.Component {

  constructor(props) {
    super(props);
 
    this.state = {
      views: null,
    };
  }

  async componentDidMount() {
    var data = this.state;
    console.log("mounted")

    var request = await fetch(`https://snippetapi.glitch.me/snippet/${this.props.id}`);
    var response = await request.json();
    console.log(`response: ${response.views}`);
    this.setState({views: response.views})

    //If we turn out to have no data for this snippet for some reason, we make data in the database for it.
    if(response.views === "null") {
      console.log("Data does not exist!")

      //Warning: The code below til the bracket on line 57 is stupidly overcomplex.
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("id", this.props.id);
      urlencoded.append("views", "1");
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };
      var stringified = JSON.stringify(requestOptions);
      var parsedObj = JSON.parse(stringified);
      console.log("creating request?");
      var api = await fetch("https://snippetapi.glitch.me/uploadSnippetData", parsedObj);
      console.log("post request made?")
      var apiRes = await api.json();
      console.log(apiRes);
      if(apiRes == 200) {
        console.log("data made!")
        var request = await fetch(`https://snippetapi.glitch.me/snippet/${this.props.id}`);
        var response = await request.json();
        this.setState({views: response.views})
      }
    }
     };

    render() {
      var data = this.state;
      return <h3>Views: {data.views}</h3>;
    }
  }

  export default Views;