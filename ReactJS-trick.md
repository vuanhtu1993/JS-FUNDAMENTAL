### React filter item including category (through twice field)
```javascript
render() {
    let row = [];
    let category = null;
    // filter condition
    let filterText = this.props.filterText;
    let isStockOnly = this.props.isStockOnly;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (isStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== category) {
        row.push(
          <ProductCategoryRow product={product}/>
        )
      }
      row.push(
        <ProductRow product={product}/>
      );
      category = product.category;
    });
    return (
      <div>
        <table>
          <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      </div>
    );
  }
```
