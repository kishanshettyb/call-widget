"use strict";

const e = React.createElement;

class CallWidget extends React.Component {
  constructor(props) {
    super(props);
    // here "show" is the boolean, we use to show / hide the widget
    this.state = {
      show: true,
      response: null,
      BASE_URL: "https://codifyinditest.com/script_test",
    };
  }

  componentDidMount = () => {
    const API_CALL_URL = `${this.state.BASE_URL}` + "/api-test";
    fetch(API_CALL_URL)
      .then((response) => response.json())
      .then((response) => {
        const data = response["script test"];
        this.setState({ response: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.show) {
      return;
    }

    let imageUrl = null;
    let captionText = null;
    let phoneNumber = null;

    const { BASE_URL } = this.state;

    if (this.state.response) {
      const { feature_img, labels, phone_number } = this.state.response;
      if (feature_img) {
        const IMAGE_URL = `${BASE_URL}` + feature_img;
        imageUrl = `url(${IMAGE_URL})`;
      }
      if (labels) {
        captionText = labels;
      }
      if (phone_number) {
        phoneNumber = phone_number;
      }
    }

    return e(
      "div",
      {
        style: {
          position: "absolute",
          top: window.innerHeight - 100,
          left: window.innerWidth - 220,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            flex: 2,
            backgroundColor: "black",
            opacity: 0.9,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              color: "white",
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 10,
            },
          },
          captionText ? captionText : "Loading..."
        ),
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              color: "#2fc41b",
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            },
          },
          "\u260E\xA0\xA0",
          React.createElement(
            "button",
            {
              style: {
                cursor: "pointer",
                backgroundColor: "black",
                color: "#2fc41b",
              },
              onClick: function onClick() {
                navigator.clipboard.writeText(captionText);
                window.alert("Phone number copied to clipboard");
              },
            },
            phoneNumber ? phoneNumber : "Loading ..."
          )
        )
      )
    );
  }
}

const domContainer = document.querySelector("#call-widget-container");
ReactDOM.render(e(CallWidget), domContainer);
