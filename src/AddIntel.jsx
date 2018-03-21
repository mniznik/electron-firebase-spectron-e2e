import React from 'react';

class AddIntel extends React.Component {

  constructor(props) {
    super(props);

    this.db = this.props.db.database().ref('intels');
    this.addIntel = this.addIntel.bind(this);
  }

  addIntel() {
    const headline = this.headlineInput.value || 'INTELO!';

    const newIntelRef = this.db.push();
    newIntelRef.set({
      headline: headline,
      content: headline + ' bamboo'
    }).then(() => {
      this.headlineInput.value = '';
    })
  }

  render() {
    return (<div>
      <input data-tid="input-nameUser"
        type="text"
        ref={input => {
          this.headlineInput = input;
        }}
      />
      <button onClick={this.addIntel} data-tid="btn-addUser">ADD</button>
    </div>);
  }
}

export default AddIntel;
