### 1.- Using a <Route> Component
It promotes a declarative style. Prior to v4, <Route /> components were placed at the top of your component hierarchy, having to think of your routes structure beforehand. However, now you can have <Route> components anywhere in your tree, allowing you to have a finer control for conditionally rendering depending on the URL. Route injects match, location and history as props into your component. The navigation methods (such as push, replace, goBack...) are available as properties of the history object.
There are 3 ways to render something with a Route, by using either component, render or children props, but don't use more than one in the same Route. The choice depends on the use case, but basically the first two options will only render your component if the path matches the url location, whereas with children the component will be rendered whether the path matches the location or not (useful for adjusting the UI based on URL matching).

If you want to customise your component rendering output, you need to wrap your component in a function and use the render option, in order to pass to your component any other props you desire, apart from match, location and history. An example to illustrate:
```javascript
import { BrowserRouter as Router } from 'react-router-dom'

const ButtonToNavigate = ({ title, history }) => (
  <button
    type="button"
    onClick={() => history.push('/my-new-location')}
  >
    {title}
  </button>
);

const SomeComponent = () => (
  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Navigate elsewhere" />} />
)    

const App = () => (
  <Router>
    <SomeComponent /> // Notice how in v4 we can have any other component interleaved
    <AnotherComponent />
  </Router>
);
```
### 2.- Using withRouter HoC
This higher order component will inject the same props as Route. However, it carries along the limitation that you can have only 1 HoC per file.
```javascript
import { withRouter } from 'react-router-dom'

const ButtonToNavigate = ({ history }) => (
  <button
    type="button"
    onClick={() => history.push('/my-new-location')}
  >
    Navigate
  </button>
);


ButtonToNavigate.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};
```
export default withRouter(ButtonToNavigate);

### 3.- Using a Redirect component
Rendering a <Redirect> will navigate to a new location. But keep in mind that, by default, the current location is replaced by the new one, like server-side redirects (HTTP 3xx). The new location is provided by to prop, that can be a string (URL to redirect to) or a location object. If you want to push a new entry onto the history instead, pass a push prop as well and set it to true
```javascript
<Redirect to="/your-new-location" push />
```
### 4.- Accessing router manually through context
A bit discouraged because context is still an experimental API and it is likely to break/change in future releases of React
```javascript
const ButtonToNavigate = (props, context) => (
  <button
    type="button"
    onClick={() => context.router.history.push('/my-new-location')}
  >
    Navigate to a new location
  </button>
);

ButtonToNavigate.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
};
```
Needless to say there are also other Router components that are meant to be for non browser ecosystems, such as <NativeRouter> that replicates a navigation stack in memory and targets React Native platform, available through react-router-native package.

For any further reference, don't hesitate to take a look at the official docs. There is also a video made by one of the co-authors of the library that provides a pretty cool introduction to react-router v4, highlighting some of the major changes
