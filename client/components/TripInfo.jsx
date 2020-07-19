import React from 'react'

class TripInfo extends React.Component {
    timeDisplay = (seconds) => {
        let h = Math.floor(seconds / 3600)
        let m = Math.floor((seconds / 60) - (Math.floor(seconds / 3600) * 60))
        let s = seconds - (Math.floor(seconds / 60) * 60)
        return (`${h}` + `:${m}` + `:${s}`)
      }

    render() {
        return (
            <div id="trip-info-div">
                <h2>Trip Info</h2>
                <h3>From: Masterton</h3>
                <h3>To: Auckland</h3>
                {/* replace big number with duration from redux state when hooked up */}
                <h3>Duration: {this.timeDisplay(12542)}</h3>

            </div>

        )
    }
}

export default TripInfo