import React from 'react';

import Modal from '../Modal';
import history from '../../history';

import {fetchStream, deleteStream} from '../../actions';
import {connect} from 'react-redux';

class StreamDelete extends React.Component{

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = () => {
    const {id} = this.props.match.params;
    return(
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
        <button onClick={() => history.push('/')} className="ui button">Cancel</button>
      </React.Fragment>
    )
  }

  renderContent = () => {
    if(!this.props.stream){
      return "Are You sure want to delete this stream?"
    }

    return(
      `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
    );
  }

  render(){
    return(
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={this.onCancelClick}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const stream = state.streams[props.match.params.id]
  return {stream: stream};
}

export default connect(
  mapStateToProps,
  {fetchStream, deleteStream}
)(StreamDelete);
