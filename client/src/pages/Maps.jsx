import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        initialCenter={
          {
            lat: 30.61237,
            lng: -96.34126
          }
        }
      >
        <Marker
          name={'Pom and Honey POS'}
        />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBhzyJKcYl34UngZEuQQxLYdITg_C7MsJ8'
})(MapContainer);