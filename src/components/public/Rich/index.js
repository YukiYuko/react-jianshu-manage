// import React, { Component } from 'react';
// import PropTypes from "prop-types";
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './rich.less';
//
// class EditorConvertToHTML extends Component {
//   static propTypes = {
//     // 同时在将 EditorState 传入渲染使用
//     blogBodyEditor: PropTypes.instanceOf(EditorState),
//     changeBody: PropTypes.func,
//   };
//   constructor(props) {
//     super(props);
//     if (props.blogBodyEditor) {
//       this.state = {
//         editorState: props.blogBodyEditor,
//       };
//     } else {
//       this.state = {
//         editorState: undefined
//       };
//     }
//     this.onEditorStateChange = this.onEditorStateChange.bind(this);
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.blogBodyEditor) {
//       this.setState({
//         editorState: nextProps.blogBodyEditor,
//       });
//     }
//   }
//
//
//   onEditorStateChange(editorState) {
//     this.setState({
//       editorState,
//     });
//     // 关键代码：将更改的 editorState 存入state
//     this.props.changeBody(editorState, draftToHtml(convertToRaw(editorState.getCurrentContent())));
//   }
//
//   render() {
//     const { editorState } = this.state;
//
//     return (
//       <Editor
//         wrapperClassName="wrapper-class"
//         editorClassName="editor-class"
//         toolbarClassName="toolbar-class"
//         editorState={editorState}
//         onEditorStateChange={this.onEditorStateChange}
//       />
//     );
//   }
// }
//
// export default EditorConvertToHTML;
