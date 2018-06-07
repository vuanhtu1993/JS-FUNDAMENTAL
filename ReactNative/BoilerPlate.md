## Cấu trúc thư mục React Native Kit Started

#### App.js
```javascript
	import React from 'react';
	import Root from './src/native/index';
	import configureStore from './src/store/index';

	const { persistor, store } = configureStore();

	export default function App() {
	  return <Root store={store} persistor={persistor} />;
	}
```
- Truyển 2 props store và persistor xuông cho Root

#### Native/index.js
```javascript
	if (Platform.OS === 'android') StatusBar.setHidden(true);
	// store and persistor is props from App
	const App = ({ store, persistor }) => (
	  // Native-base (chưa rõ)
	  <Root>
	  // React - redux
		<Provider store={store}>
	  // Redux persist
		  <PersistGate
			loading={<Loading />}
			persistor={persistor}
		  >
	  // Native base (chưa rõ)
			<StyleProvider style={getTheme(theme)}>
			// Router
			  <Router>
				<Stack key="root">
				  {Routes}
				</Stack>
			  </Router>
			  
			</StyleProvider>
		  </PersistGate>
		</Provider>
	  </Root>
	);
	// native-base (try to understand latter)
	App.propTypes = {
	  store: PropTypes.shape({}).isRequired,
	  persistor: PropTypes.shape({}).isRequired,
	};

export default App;
```
- Bọc toàn bọ dự án vào the <Root> của Native base
- Toan bộ Screen bọc trong Router