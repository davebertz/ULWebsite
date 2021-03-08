import React, { Component} from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import { SliderRail, Handle, Track } from './ContinuousLikerUtils' 

const sliderStyle = {
  position: 'relative',
  width: '100%',
  touchAction: 'none',
}

const domain = [1, 7]
const defaultValues = [4]

class ContinuousLikert extends Component {
  state = {
    values: defaultValues.slice(),
  }

  onChange = values => {
    this.props.onChange(this.props.id, values[0])
  }

  render() {
    const {
      state: { values },
    } = this

    return (
      <div style={{ height: 120, width: '100%' }}>
          <div>
              <p><b>{this.props.title}</b></p>  
              <p>{this.props.question}</p><br/>   
          </div>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
        <div style={{ display:'flex',flex:1, flexDirection:'row'}}>
            <div style={{ display:'flex',flex:1, justifyContent:'start', textAlign:"start"}}>
                <p><b>Très improbable</b></p>
            </div>
            <div style={{ display:'flex',flex:1, justifyContent:'flex-end', textAlign:"flex-end"}}>
                <p><b>Très probable</b></p>
            </div>
            <br/>   
        <br/>         <br/>   
        <br/> 
        </div>         
     
      </div>
    )
  }
}


export default ContinuousLikert