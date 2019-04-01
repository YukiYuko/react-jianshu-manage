import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./rich.less";

export default class RichText extends React.Component{
  state = {
    showRichText:false,
    editorContent: '',
    editorState: EditorState.createEmpty(),
  };

  handleClearContent = ()=>{
    this.setState({
      editorState:''
    })
  }

  handleGetText = ()=>{
    this.setState({
      showRichText:true
    })
  }

  onEditorChange = (editorContent) => {
    if (editorContent.blocks[0].text) {
      this.props.setContent(editorContent);
    } else {
      this.props.setContent("");
    }
    this.setState({
      editorContent,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  render(){
    const { editorState } = this.state;
    return (
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        editorState={editorState}
        onContentStateChange={this.onEditorChange}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}
