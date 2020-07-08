import React from 'react'


class FoundForm extends React.Component {

    state = {
        species: '',
        photo: ''
    }
    
    handleChange = (evt) => {
        this.setState ({
            [evt.target.name]: evt.target.value
        })
    }
    
    handleSubmit = (evt) => {
        evt.preventDefault()
        
    }
    
    render () {
        return (
            <>
            <h3>Add A Found Pet</h3>
            <form>
                <label onSubmit= {this.handleSubmit}>
                    Species Of Found Animal:
                    <input type="text" name="species" onChange = {this.handleChange} />
                </label>
                <label>
                    Add A Photo of Found Animal:
                    <input type="text" name="photo" onChange = {this.handleChange} />
                </label>
                <input type="submit" value="Add Found Pet" />
            </form>
            </>
        )
    }
}