import React from 'react';
var arr=[];
class DropDown extends React.Component {
    constructor() {
        super();
        this.state = {
            options: []
        }
        
    }

    componentDidMount() {
        this.fetchOptions()
    }

    fetchOptions() {
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then((res) => {
                return res.json();
            }).then((json) => {
                this.setState({
                    options: json
                })
                console.log('dataaa', this.state.options);
            });
    }

    // fetchSingleUser() {
    //     fetch('https://jsonplaceholder.typicode.com/users/' + custId)
    //         .then((res) => {
    //             return res.json();
    //         }).then((json) => {
    //             this.setState({
    //                 options: json
    //             })
    //             console.log('dataaa', this.state.options);
    //         });
    // }


    handleChange = (event) => {
        this.setState({ value: event.target.value });
        console.log('single dataaa', event.target.value);
        fetch('https://jsonplaceholder.typicode.com/users/' + event.target.value)
            .then((res) => {
                return res.json();
            }).then((json) => {
                // this.setState({
                //     options: json
                // })
                console.log('single dataaa', json);
                arr.push(json);
                console.log('pushed data',arr)
            });
    }

    handleClick(e){
        console.log('btn clik')
    }

    //update
    updateItem(data, id, packed) {

        console.log('update in',id);
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id:1,name:'abc', email:'abc@' })
        })
            .then(() => {
                               console.log('updates success')
                // let updateduser = [...this.state.options].map(i => i.id === id ? { ...i, packed } : i);
                // this.setState({
                //     options: updateduser
                // });
            });
    }

    render() {
        const { options, value, email } = this.state;

        return <div className="drop-down">
            <p>I would like to render a dropdown here from the values object</p>
            <select onChange={this.handleChange}>{
                options.map((obj) => {
                    return <option value={obj.id}>{obj.name}</option>
                })
            }</select>
            {/* <h1>selected Name: {value}</h1> */}
            <br/>
            <h1>Name is...</h1> 
            <input type="text"
                   className="form-control"
                //    onChange={self.handleEmailListChange.bind(this, index)} 
                   value={value}/>
                      <input type="email"
                   className="form-control"
                //    onChange={self.handleEmailListChange.bind(this, index)} 
                   value={email}/>
<br/>
<button onClick={this.updateItem}>click me</button>

        </div>;
    }
}

export default DropDown;