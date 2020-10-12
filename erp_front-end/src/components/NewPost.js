import React from 'react'
import {connect} from 'react-redux'
import {setPost} from '../actions/postAction'
import ReactQuill from 'react-quill'
import "../../node_modules/react-quill/dist/quill.snow.css";

class NewPost extends React.Component{
    constructor(){
        super()
        this.state = {
            title : '',
            body : '',
            errors : {
                title : '',
                body : ''
            }, 
            submitForm : true
        }
    }

    handleTitle = (e) => {
        let errors = this.state.errors;
        errors.title = e.target.value.length === 0 ? "Warning: Title Field cannot be empty" : "";

        /*below "document.getElemenById("title").className" means giving className to title's input tag for change of color when its empty
        while submitting.
        */
      
        if(errors.title.length > 0) {
          document.getElementById("title").className = 'error'
        } else {
          document.getElementById("title").className = ''
        }
      
        this.setState({ errors: errors, title: e.target.value, submitForm: false });
      }
      
      // in reactQuill component (text editor), by defualt instead of empty string, it will be "<p><br></p>"

      handleQuill = (data) => {
        let errors = this.state.errors;
        errors.body =  data === "<p><br></p>" ? "Warning: Body Field cannot be empty" : "";

        /*here "document.getElemenById("body").className" means giving className to body's reactQuill component for change of color 
         when its empty while submitting.
        */
      
        if(errors.body.length > 0) {
          document.getElementById("body").className = 'error'
        } else {
          document.getElementById("body").className = ''
        }
      
        this.setState({ errors: errors, body: data, submitForm: false });
      }

      /*
      below function is to verify whether the values of "this.state.error" object is empty or not. if its empty, validateForm function 
      returns true or else return false
      */

       validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid
    }
      
      handleSubmit = (e) => {
        e.preventDefault();

        // validate function is called with errors obj as its props, if its true, then below codes are executed 

        if (this.validateForm(this.state.errors)) {
         
          if(this.state.title === '' && (this.state.body === '' || this.state.body === "<p><br></p>")) {

            let errors = this.state.errors;
            errors.title = "Warning: Title Field cannot be empty"
            errors.body =  "Warning: Body Field cannot be empty"
            document.getElementById("body").className = 'error'
            document.getElementById("title").className = 'error'
            this.setState({errors: errors, submitForm: false });

          } else if(this.state.title !== "" &&  (this.state.body === '' || this.state.body === "<p><br></p>")) {
            let errors = this.state.errors;
            errors.body =  "Warning: Body Field cannot be empty"
            document.getElementById("body").className = 'error'
            this.setState({errors: errors, submitForm: false });

          } else if(this.state.title === '' && (this.state.body !== '' || this.state.body !== "<p><br></p>")) {
            let errors = this.state.errors;
            errors.title = "Warning: Title Field cannot be empty"
            document.getElementById("title").className = 'error'
            this.setState({errors: errors, submitForm: false });

          // validateForm function checks whether this.state.error is either true or false. if its false, then below codes are executed
          } else {
            const post = {
                title : this.state.title,
                body : this.state.body
            }

            this.props.dispatch(setPost(post))
            
            alert('New Post is created and can be found in Published section')
            this.setState({ submitForm: true, title : '', body : '', errors : { title : "Warning: Title Field cannot be empty", body : "Warning: Body Field cannot be empty" }})

          }
        } else {
          //InValid form
          this.setState({ submitForm: false });
        }
      }

      
    render(){
      console.log(this.state, "STATE")
        return(
            <div className="new-post-wrapper">
                <h3 className="new-post-header">Create New Post</h3>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-title">
                        <input type="text" 
                        id="title" 
                        value={this.state.title}  
                        onChange={this.handleTitle} 
                        placeholder="Title" />
                        {
                            !this.state.submitForm && this.state.errors.title.length > 0 && (
                                <div className="error-text">{this.state.errors.title}</div>
                            )
                        }
                    </div>

                    <div className="body">
                        <ReactQuill
                            id="body"
                            modules={NewPost.modules}
                            formats={NewPost.formats}
                            placeholder="Type something"
                            onChange={this.handleQuill}
                            value={this.state.body}
                        />
                        {!this.state.submitForm && this.state.errors.body.length > 0 && (
                        <div className="error-text">{this.state.errors.body}</div>
                        )}
                    </div>

                    <input className="button-submit" type="submit" submit="Publish" />
                </form>
            </div>
        )
    }
}

/*below codes got from reactQuill documentation. copied and pased as per instruction. In the line 165, we get to choose what kinds of text 
editors we want.
*/

NewPost.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "clean"]
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  
  NewPost.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

export default connect()(NewPost)