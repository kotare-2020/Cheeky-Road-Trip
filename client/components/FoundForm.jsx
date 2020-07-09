import React from 'react'
import {saveFoundApi} from '../apis/foundPets'


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
        console.log('submitting!')
        saveFoundApi(this.state.found)
        .then (id => {
            console.log(id)
        })
    }
    
    render () {
        return (
            <>
            <h3>Add A Found Pet</h3>
            <form onSubmit= {this.handleSubmit} >
                <label >
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

export default FoundForm