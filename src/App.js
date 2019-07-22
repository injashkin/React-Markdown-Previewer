import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css'
import marked from 'marked/marked.min'
import '@fortawesome/fontawesome-free/css/all.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {                 
      input: markdownText,
      windowsHorizontal: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleWindowsPosition = this.handleWindowsPosition.bind(this)
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleWindowsPosition() {
    this.setState({       
      windowsHorizontal: !this.state.windowsHorizontal
    });
  }

  render() {
    const classes = this.state.windowsHorizontal ?
      {        
        icon: 'fas fa-arrows-alt',
        content: 'content row'
      } :
      {        
        icon: 'fas fa-columns',
        content: 'content column'
      };
    return (
      <div className="App">
        <h1>Просмотрщик Markdown на React</h1>
        <div className={classes.content}>

          <div className="editorWrap">

            <div className="topMenu">

              <header className="header">
                Редактор
              </header>

              <Menu
                icon={classes.icon}
                onClick={this.handleWindowsPosition}
                windowsHorizontal={this.state.windowsHorizontal}                
              />

            </div>

            <Editor
              value={this.state.input}
              onChange={this.handleChange}
            />

          </div>

          <div className="previewWrap">

            <div className="topMenu">

              <header className="header">
                Просмотрщик
            </header>

            <Menu              
              icon={classes.icon}
              onClick={this.handleWindowsPosition}
            />
          </div>

            <Previewer
              markdown={this.state.input}
            />
          </div>

        </div >
      </div >
    );
  }
}

const Menu = (props) => {
  
  const title = props.windowsHorizontal ? 
        "Расположить окна в виде строк" : 
        "Расположить окна в виде колонок";
  
  return (
    <div className="memu">
      <i
        title={title}
        onClick={props.onClick} 
        className={props.icon}
      />
    </div>
  )
}

const Editor = (props) => {
  return (
    <textarea
      className="editor"
      id="editor"
      value={props.value}
      onChange={props.onChange}
    />
  )
}

const Previewer = (props) => {
  return (
    <div
      className="preview"
      id='preview'
      dangerouslySetInnerHTML={{ __html: marked(props.markdown) }}
    />
  )
}

export default App;

const markdownText =
  `# Добро пожаловать в мой Markdown Previewer на React!

## Это подзаголовок...
### А вот некоторые другие интересные вещи:
  
Вот некоторый код, \`<div></div>\`, между 2 обратными кавычками.

\`\`\`
// это многострочный код:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
Вы можете сделать текст **жирным**.
Или _курсивным_,
Или ** _и тем, и другим_**
И не стесняйтесь ~~зачеркивать ненужное~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`