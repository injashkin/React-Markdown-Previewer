`use strict`
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: markdownText,
      windowsLeftRight: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleWindowsPosition = this.handleWindowsPosition.bind(this)
    this.handleEraseText = this.handleEraseText.bind(this)
  }

  //Обработчик для вводимого текста в окне Редактора
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  //Обработчик для кнопки "Позиция окон", которая переключает 
  //положение окон Редактора и Просмотрщика (вертикально либо 
  //горизонтально)
  handleWindowsPosition() {
    this.setState({
      windowsLeftRight: !this.state.windowsLeftRight
    });
  }

  //Обработчик для кнопки "Ластик", которая очищает окно редактора 
  //для ввода нового текста
  handleEraseText() {
    if (window.confirm("Вы действительно хотите очистить окно редактора?")) {
      this.setState({
        input: ""
      });
    }

  }

  render() {
    const classes = this.state.windowsLeftRight ?
      {
        icon: 'fas fa-arrows-alt-v',
        content: 'content leftRight'
      } :
      {
        icon: 'fas fa-arrows-alt-h',
        content: 'content topBottom'
      };
    return (
      <div className="app">
        <h1>Просмотрщик Markdown на React</h1>
        <div className={classes.content}>
          <div className="editorWrap">
            <div className="topMenu">
              <header className="header">
                Редактор
              </header>
              <div className="toolsMenu">
                <EraseText
                  input={this.state.input}
                  onClick={this.handleEraseText}
                />
                <WindowsPosition
                  icon={classes.icon}
                  onClick={this.handleWindowsPosition}
                  windowsLeftRight={this.state.windowsLeftRight}
                />
                <div>
                  <a
                    href="https://daringfireball.net/projects/markdown/syntax"
                    target="_blank"
                  ><i
                      className="far fa-question-circle"
                      title="Справка по Markdown"
                    />
                  </a>

                </div>
              </div>
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
              <div className="toolsMenu">
                <WindowsPosition
                  icon={classes.icon}
                  onClick={this.handleWindowsPosition}
                  windowsLeftRight={this.state.windowsLeftRight}
                />
              </div>
            </div>

            <Previewer
              markdown={this.state.input}
            />

          </div>
        </div >
        <Footer />

      </div >
    );
  }
}

const EraseText = (props) => {
  return (
    <div>
      <i
        className="fas fa-eraser"
        title="Очистить редактор для ввода нового текста"
        onClick={props.onClick}
      />
    </div>
  )
}

const WindowsPosition = (props) => {
  const title = props.windowsLeftRight ?
    "Расположить окна сверху и снизу" :
    "Расположить окна слева и справа";
  return (
    <div>
      <i
        className={props.icon}
        title={title}
        onClick={props.onClick}
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

const Footer = () => {
  return (
    <footer className="footer">
      <div className="sourceCode">
        <i
          className="fab fa-free-code-camp"
          title="freeCodeCamp"
        />
        <a
          href="https://github.com/injashkin/React-Markdown-Previewer"
        >
          Исходник на Github <i className="fab fa-github"></i>
        </a>

      </div>
      <div className="madeOn">
        Сделано на:
        <i className="fab fa-html5" title="HTML5"> </i>
        <i className="fab fa-css3" title="CSS3"> </i>
        <i className="fab fa-font-awesome" title="Font Awesome"> </i>
        <i className="fab fa-sass" title="SCSS"> </i>
        <i className="fab fa-js" title="Javascript"></i>
        <i className="fab fa-react" title="React"></i>
      </div>
    </footer>
  )
}

const markdownText =
  `Более полное руководство можно прочитать на сайте https://marked.js.org/demo с примерами синтаксиса, который поддерживает [Markdown]. 

[Markdown]: http://daringfireball.net/projects/markdown/

### Заголовки

Markdown поддерживает два стиля заголовков, Setext и atx.
Заголовки в стиле Setext подчеркиваются с помощью знаков равно (для заголовков первого уровня) и тире (для заголовков второго уровня). Например:

Это H1
=============
Это H2
-------------
Длина подчеркивания может быть произвольной.

Заголовки в стиле Atx используют от 1 до 6 решеток в начале строки:
# Это H1
## Это H2
###### Это H6

При необходимости вы можете закрывать заголовки решетками. Это может понадобится чисто для красоты:
# Это H1 #
## Это H2 ##
### Это H3 ######

### Исходный код

Многострочный код заключаем в тройные апострофы (клавиша Ё).

\`\`\`
// это многострочный код:

function anotherExample(firstLine, lastLine) {
  if (firstLine ==  && lastLine) {
    return multiLineCode;
  }
}
\`\`\`
Для вставки кода внутри предложений нужно заключать этот код в одинарные апострофы. Пример: \`<html class="app">\`.
  
Вы также можете сделать текст **жирным**.
Или _курсивным_.
Или... **_тем и другим_**
Можно также ~~зачеркивать текст~~.

Есть также [ссылки](https://www.freecodecamp.com), и
> Цитаты

Есть таблицы:

Заголовок / Заголовок / Заголовок
------------ | ------------- | ------------- 
Ваш контент может | быть здесь, |и здесь....
И здесь. | Окей. - Я думаю, |понятно.

- И конечно же есть списки.
  - Некоторые маркированы.
     - С различными уровнями отступа.
        - Это выглядит вот так.


1. Есть нумерованные списки.
1. Порядок нумерации не важен
1. При преобразовании все будет выглядеть как надо
- Даже если вы используете тире 
* или звездочки.

А вот изображение:

![React Logo w/ Tex](https://goo.gl/Umyytc)
`

ReactDOM.render(<App />, document.getElementById('root'));