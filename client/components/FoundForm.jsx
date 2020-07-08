import React from 'react'
import {saveFoundApi} from '../apis/lostpets'


class FoundForm extends React.Component {

    state = {
       found: {
        species: '',
        photo: '',
        user_id: 'TBC'
       } 
    }
    

   handleChange = (evt) => {
        this.setState({
            found: {
                ...this.state.found,
                [evt.target.name]: evt.target.value
            }
        })
    }  

    handleSubmit = (evt) => {
        evt.preventDefault()
        saveFoundApi(this.state.found)
        .then (id => {
            console.log(id)
        })
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