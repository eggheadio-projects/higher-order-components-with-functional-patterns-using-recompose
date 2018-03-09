/*
TITLE:
Add Local State to a Functional Stateless Component using Recompose

DESCRIPTION:
Learn how to use the 'withState' and 'withHandlers' higher order
components to easily add local state to your functional stateless
components. No need for classes!
*/
const { Component } = React;
const { compose, withState, withHandlers } = Recompose;

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current)
  })
)

const StatusList = () =>
  <div className="StatusList">
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>;

const Status = withToggle(({ status, toggledOn, toggle }) =>
  <span onClick={ toggle }>
    { status }
    { toggledOn && <StatusList /> }
  </span>
);

const Tooltip = withToggle(({ text, children, toggledOn, show, hide }) =>
  <span>
    { toggledOn && <div className="Tooltip">{ text }</div> }
    <span onMouseEnter={ show } onMouseLeave={ hide }>{ children }</span>
  </span>
);

const User = ({ name, status }) =>
  <div className="User">
    <Tooltip text="Cool Dude!">{ name }</Tooltip>—
    <Status status={ status } />
  </div>;

const App = () =>
  <div>
    <User name="Tim" status="active" />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
