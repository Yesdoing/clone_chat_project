import React, { Component, createContext } from "react";

const Context = createContext(); 

const { Provider, Consumer: UIConsumer } = Context;

class UIProvider extends Component {
  state = {
    chatHeaderUsername: "",
    loggedInUser: 'yesdoing'
  };

  actions = {
    setChatHeaderUsername: chatHeaderUsername => {
      this.setState({ chatHeaderUsername });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

function useUI(WrappedComponent) {
  return function UseUI(props) {
    return (
      <UIConsumer>
        {({ state, actions }) => (
          <WrappedComponent
            chatHeaderUsername={state.chatHeaderUsername}
            loggedInUser={state.loggedInUser}
            setChatHeaderUsername={actions.setChatHeaderUsername}
            {...props}
          />
        )}
      </UIConsumer>
    );
  };
}

// 내보내줍니다.
export { UIProvider, UIConsumer, useUI };
