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
            backgroundColor: "#007bff",
            opacity: 0.9,
            borderRadius: "10px",
            padding: "10px 30px",
            boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
            cursor: "pointer",
          },
          onClick: function onClick() {
            navigator.clipboard.writeText(captionText);
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
              fontSize: "18px",
              paddingBottom: "5px",
            },
          },
          captionText ? captionText : "Loading..."
        ),
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              color: "#fff",
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1380fd",
              padding: "3px",
              borderRadius: "10px",
              boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
            },
          },
          "\u260E\xA0\xA0",
          React.createElement(
            "a",

            {
              href: "tel:" + phoneNumber,
              style: {
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#fff",
                border: "0",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none",
              },
            },
            phoneNumber ? phoneNumber : "Loading ..."
          )
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            {
              style: {
                borderRadius: 50,
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
                width: "35px",
                height: "35px",
                marginTop: "5px",
                border: "0",
                boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
              },
              onClick: function onClick() {
                window.alert("close clicked");
                this.setState({ show: false }, () => {});
              },
            },
            "X"
          )
        )
      )
    );
  }
}

const domContainer = document.querySelector("#call-widget-container");
ReactDOM.render(e(CallWidget), domContainer);
