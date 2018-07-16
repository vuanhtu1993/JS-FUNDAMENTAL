## Conditionals in JSX

Instead of
```javascript
const sampleComponent = () => {
  return isTrue ? <p>True!</p> : null
};
```
Use short-circuit evaluation
```javascript
const sampleComponent = () => {
  return isTrue && <p>True!</p>
};
```
