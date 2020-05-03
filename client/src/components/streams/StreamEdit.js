import _ from 'loadsh';
import React from 'react';
import StreamForm from './StreamForm';

import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';

class StreamEdit extends React.Component{

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    const id = this.props.match.params.id;
    this.props.editStream(id, formValues);
  }

  render(){
    if(!this.props.stream) return <div>Loading....</div>

    return(
      <div>
        <h2>Edit a stream</h2>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit} />
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const stream = state.streams[ownProps.match.params.id];
  return {stream};
}

export default connect(mapStateToProps, {
  fetchStream,
  editStream
})(StreamEdit);
