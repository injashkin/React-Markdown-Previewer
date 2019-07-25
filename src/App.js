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
      <div className="App">
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
          Исходник на Github <i class="fab fa-github"></i>
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

export default App;

const markdownText =
  `Краткая справка по Markdown
===============================
Эта справка представляет собой мой вольный перевод краткого руководства, которое представлено на сайте https://marked.js.org/demo с примерами синтаксиса, который поддерживает [Markdown]. 

[Markdown]: http://daringfireball.net/projects/markdown/

Простое Форматирование Текста
=============================

Вы можете использовать *звездочки* или _подчеркивания_ для выделения курсивом.  **Двойные звездочки** и __двойное подчеркивание__ для жирного текста.  ***Три звездочки*** или ___три подчеркивания___ для жирного курсива.

Пункты тоже непросто.  Просто есть пустая строка между кусками текста.

> Этот кусок текста находится в блочной кавычке.  Его несколько строк будут
> отступ немного от остальной части текста.
>
> > Несколько уровней блочных котировок также работают.

Иногда вы хотите включить некоторый код, например, когда вы объясняете, как работают HTML-теги \`<h1>\`, или, возможно, вы программист, и вы обсуждаете " someMethod ()".

Если вы хотите включить какой-то код и
новые строки сохраняются, отступ строки с вкладкой
или, по крайней мере, четыре места.
    Дополнительные места работают и здесь.
Это также называется предварительно отформатированный текст, и это полезно для показа примеров.
Текст останется как текст, поэтому любой * markdown* или < u>HTML< / u>, который вы добавляете, будет
не отформатирован.  Таким образом, вы можете показать примеры уценки в a
уценка документа.

> Вы также можете использовать предварительно отформатированный текст с вашей цитаты
> пока вы добавляете не менее пяти пробелов.

  # Добро пожаловать в мой Markdown Previewer на React!

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

Ссылки
=====

Давайте перейдем по ссылке на несколько сайтов.
Во-первых, давайте использовать базовый URL, например 
<http://www.github.com>. отлично подходит для текста, 
но некрасиво для HTML.
Далее идет встроенная ссылка на [Google](http://www.google.com). немного приятнее.
Это ссылка эталонный стиль на [Wikipedia] [1].
Наконец, вот привлекательная ссылка на [Yahoo].  
Эталонный стиль и привлекательная ссылка  автоматически 
используют ссылки, определенные ниже, но они могут быть 
определены *в любом месте* в markdown и удалены из HTML.  
Имена  
также нечувствительны   
к регистру,<br> поэтому вы можете  
использовать [YaHoO] и правильно связать его.

[1]: http://www.wikipedia.org/
[Yahoo]: http://www.yahoo.com/

Атрибуты заголовка могут быть добавлены к ссылкам путем 
добавления текста после ссылки.
Это [онлайн ссылка](http://www.bing.com "Bing") с названием 
"Bing".
Вы также можете перейти к [W3C][2] и, возможно, посетить [друг]а.

[2]: http://w3c.org (W3C выпускает спецификации для веб-вещей)
[Друг]: http://facebook.com/ "Facebook!"

#### Как открывать ссылки в новом окне

Все ссылки в стандартном редакторе Markdown открываются в 
этом же окне. Только HTML-разметка позволяет изменить это. 
Никакие другие способы не будут работать стабильно и всегда, 
и в этом есть некоторое неудобство. 
Пример <a href="https://google.ru" target="_blank" title="Гугл">c HTML-разметкой</a>, а также
<a href="http://jinv.ru" target="_blank">без разметки</a>

Адреса электронной почты в обычном тексте не связаны: test@example.com.
Адреса электронной почты, заключенные в угловые скобки, связаны: <test@example.com>.
Они также запутаны, так что электронная почта сбора спама роботов, надеюсь, не получит их.

> Это цитата!
И она будет продолжатся, пока не нажмете два раза "Enter"

И если вы хотите действительно сойти с ума, даже таблицы:

Заголовок | Заголовок | Еще Заголовок?
------------| --------------| --------------
Ваш контент может | быть здесь, и он | может быть здесь....
И здесь. | Окей. | - Я думаю, мы поняли.

- И конечно же есть списки.
  - Некоторые маркированы.
     - С различными уровнями отступа.
        - Это выглядит вот так.


1. И есть нумерованные списки тоже.
1. Используйте только 1s, если вы хотите! 
1. Но список можно продолжать...
- Даже если вы используете тире или звездочки.
* И последнее, но не менее важное: давайте не будем забывать встроенные изображения:
1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`